#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import React, { useMemo, useState } from 'react';
import { Box, Text, render, useInput } from 'ink';
import {
  expectedTagForVersion,
  validateReleaseTagAgainstRef
} from './release-tag-shared.mjs';

const MAIN_BRANCH = process.env.MAIN_BRANCH || 'main';
const RELEASE_BRANCH = process.env.RELEASE_BRANCH || 'release';
const WORKFLOW_FILE = process.env.WORKFLOW_FILE || 'release-promote.yml';

function loadDotEnvFromRepo() {
  const envPath = path.join(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  const raw = readFileSync(envPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const m = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2] ?? '';
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  // Allow either variable name in local env files.
  if (!process.env.GITHUB_TOKEN && process.env.GH_TOKEN) {
    process.env.GITHUB_TOKEN = process.env.GH_TOKEN;
  }
}

function die(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function info(message) {
  console.log(`[release] ${message}`);
}

function parseArgs(argv) {
  let dryRun = process.env.DRY_RUN !== 'false';
  let allowDirty = process.env.ALLOW_DIRTY === 'true';

  for (const arg of argv) {
    if (arg === '--dry-run' || arg === '-n') {
      dryRun = true;
    } else if (arg === '--execute') {
      dryRun = false;
    } else if (arg === '--allow-dirty') {
      allowDirty = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scripts/run-release-workflow.mjs [--execute | --dry-run] [--allow-dirty]

Options:
  --execute       Dispatch GitHub workflow after checks (non-dry-run).
  --dry-run, -n   Run checks/build/prompts only; skip GitHub workflow dispatch (default).
  --allow-dirty   Override clean-working-tree guard (still fails if build introduces additional changes).`);
      process.exit(0);
    } else {
      if (arg === '--dirty-tree') {
        die("Unknown argument: --dirty-tree. Use --allow-dirty.");
      }
      die(`Unknown argument: ${arg}`);
    }
  }

  return { dryRun, allowDirty };
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
    cwd: options.cwd || process.cwd(),
    env: options.env || process.env
  });

  if (options.allowFailure) return result;

  if (result.error) {
    die(`Failed to run '${command}': ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    const stdout = (result.stdout || '').trim();
    die(`Command failed: ${command} ${args.join(' ')}${stderr ? `\n${stderr}` : stdout ? `\n${stdout}` : ''}`);
  }

  return result;
}

function commandExists(name) {
  const r = run('bash', ['-lc', `command -v ${JSON.stringify(name)} >/dev/null 2>&1`], { allowFailure: true });
  return r.status === 0;
}

function extractOwnerRepo(remoteUrl) {
  const ssh = remoteUrl.match(/^git@github\.com:([^/]+\/[^/]+)(\.git)?$/);
  if (ssh?.[1]) return ssh[1].replace(/\.git$/, '');
  const https = remoteUrl.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)(\.git)?$/);
  if (https?.[1]) return https[1].replace(/\.git$/, '');
  return null;
}

function parseSemver(version) {
  const m = version.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

function npmVersionConventionCommand() {
  return 'npm version <patch|minor|major> --workspaces --include-workspace-root';
}

function npmVersionCommandForBump(bumpKind) {
  return `npm version ${bumpKind} --workspaces --include-workspace-root`;
}

function compareSemver(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

function collectReleaseBumpHistories() {
  const tagResult = run('git', ['tag', '--merged', MAIN_BRANCH, '--list', 'v*'], { allowFailure: true });
  const releaseTags = (tagResult.stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((tag) => {
      const parsed = parseSemver(tag.replace(/^v/, ''));
      if (!parsed) return null;
      return {
        tag,
        ...parsed
      };
    })
    .filter(Boolean);

  const latest = (predicate) => {
    let current = null;
    for (const t of releaseTags) {
      if (!predicate(t)) continue;
      if (!current || compareSemver(t, current) > 0) current = t;
    }
    return current;
  };

  const majorTag = latest((t) => t.minor === 0 && t.patch === 0);
  const minorTag = latest((t) => t.minor > 0 && t.patch === 0);
  const maintenanceTag = latest((t) => t.patch > 0);
  const latestTag = latest(() => true);

  const parseCommitLines = (stdout) =>
    (stdout || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [shortHash, timestamp, ...rest] = line.split('\t');
        return {
          shortHash: shortHash || '',
          timestamp: timestamp || '',
          subject: rest.join('\t') || ''
        };
      })
      .filter((c) => c.shortHash);

  const buildSection = (kind, label, anchorTag, includeAllFromMain = false) => {
    if (!anchorTag && !includeAllFromMain) return { kind, label, anchor: null, commits: [] };
    const rangeSpec = anchorTag ? `${anchorTag.tag}..${MAIN_BRANCH}` : MAIN_BRANCH;
    const rangeResult = run(
      'git',
      ['log', '--pretty=format:%h%x09%cI%x09%s', rangeSpec],
      { allowFailure: true }
    );
    const commits = parseCommitLines(rangeResult.stdout);
    return {
      kind,
      label,
      anchor: anchorTag ? anchorTag.tag : '(all commits on main)',
      commits
    };
  };

  return [
    buildSection('major', `Major bump history (${MAIN_BRANCH})`, majorTag),
    buildSection('minor', `Minor bump history (${MAIN_BRANCH})`, minorTag),
    buildSection('maintenance', `Maintenance bump history (${MAIN_BRANCH})`, maintenanceTag),
    buildSection('everything', `Everything since latest tag (${MAIN_BRANCH})`, latestTag, true)
  ];
}

function fetchLatestTags() {
  const result = run('git', ['fetch', 'origin', '--tags'], { allowFailure: true, stdio: 'pipe' });
  if (result.status !== 0) {
    // Continue with local tags if network/auth isn't available in this environment.
    return false;
  }
  return true;
}

function collectHeadReleaseTag() {
  const result = run('git', ['tag', '--points-at', 'HEAD', '--list', 'v*'], { allowFailure: true });
  const tags = (result.stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((tag) => {
      const parsed = parseSemver(tag.replace(/^v/, ''));
      if (!parsed) return null;
      return { tag, ...parsed };
    })
    .filter(Boolean);

  let best = null;
  for (const t of tags) {
    if (!best || compareSemver(t, best) > 0) best = t;
  }
  return best?.tag || '';
}

function isWorkingTreeDirtyNow() {
  const status = run('git', ['status', '--porcelain'], { allowFailure: true });
  return Boolean((status.stdout || '').trim());
}

function collectRepoContext() {
  const inside = run('git', ['rev-parse', '--is-inside-work-tree'], { allowFailure: true });
  if (inside.status !== 0 || inside.stdout.trim() !== 'true') die('Not inside a git repository.');

  const originUrl = run('git', ['remote', 'get-url', 'origin']).stdout.trim();
  if (!originUrl) die("Missing git remote 'origin'.");
  const ownerRepo = extractOwnerRepo(originUrl);
  if (!ownerRepo) die(`Could not parse GitHub owner/repo from origin URL: ${originUrl}`);

  const rootVersion = run('node', ['-e', "process.stdout.write(require('./package.json').version)"]).stdout.trim();
  if (!rootVersion) die('Could not read version from package.json.');
  const workingTreeStatus = run('git', ['status', '--porcelain']).stdout.trim();
  fetchLatestTags();
  const headReleaseTag = collectHeadReleaseTag();
  const bumpHistories = collectReleaseBumpHistories();

  return {
    ownerRepo,
    rootVersion,
    workingTreeDirty: Boolean(workingTreeStatus),
    headReleaseTag,
    bumpHistories,
    apiUrl: `https://api.github.com/repos/${ownerRepo}/actions/workflows/${WORKFLOW_FILE}/dispatches`
  };
}

function Wizard({ context, onDone, onCancel }) {
  const bumpHistories = Array.isArray(context.bumpHistories) ? context.bumpHistories : [];
  const [step, setStep] = useState('releaseType');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHistoryKind, setSelectedHistoryKind] = useState(null);
  const [result, setResult] = useState({
    createTag: false,
    releaseTag: '',
    allowDirty: context.allowDirty === true,
    action: 'dispatch',
    npmVersionBump: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const releaseTypeItems = useMemo(
    () => [
      {
        key: 'tagged',
        label: context.headReleaseTag
          ? `tagged release (use HEAD tag ${context.headReleaseTag})`
          : 'tagged release (requires HEAD tag from npm version)'
      },
      { key: 'none', label: 'non-tagged release' },
      { key: 'history', label: 'review commit history by bump type' }
    ],
    [context.headReleaseTag]
  );

  const confirmItems = useMemo(() => ['Proceed', 'Cancel'], []);
  const dirtyOverrideItems = useMemo(() => ['Allow dirty and continue', 'Cancel release'], []);
  const bumpMenuItems = useMemo(
    () => [
      { key: 'patch', label: `patch (${npmVersionCommandForBump('patch')})` },
      { key: 'minor', label: `minor (${npmVersionCommandForBump('minor')})` },
      { key: 'major', label: `major (${npmVersionCommandForBump('major')})` }
    ],
    []
  );
  const historyMenuItems = useMemo(
    () => bumpHistories.map((section) => ({ key: section.kind, label: section.label })),
    [bumpHistories]
  );

  useInput((input, key) => {
    if (key.escape) {
      if (step === 'bumpMenu') {
        setStep('releaseType');
        setSelectedIndex(0);
        setErrorMessage('');
        return;
      }
      if (step === 'historyMenu') {
        setStep('releaseType');
        setSelectedIndex(0);
        setErrorMessage('');
        return;
      }
      if (step === 'historyDetail') {
        setStep('historyMenu');
        setSelectedIndex(0);
        setErrorMessage('');
        return;
      }
      onCancel('user_cancelled');
      return;
    }

    if (step === 'releaseType') {
      if (key.upArrow) {
        setSelectedIndex((i) => (i - 1 + releaseTypeItems.length) % releaseTypeItems.length);
        return;
      }
      if (key.downArrow) {
        setSelectedIndex((i) => (i + 1) % releaseTypeItems.length);
        return;
      }
      if (key.return) {
        const selected = releaseTypeItems[selectedIndex];
        if (selected.key === 'tagged') {
          if (!context.headReleaseTag) {
            setStep('bumpMenu');
            setSelectedIndex(0);
            setErrorMessage('');
            return;
          }
          setResult({
            createTag: true,
            releaseTag: context.headReleaseTag,
            allowDirty: result.allowDirty,
            action: 'dispatch',
            npmVersionBump: ''
          });
          setStep('confirm');
          setSelectedIndex(0);
          setErrorMessage('');
          return;
        }
        if (selected.key === 'none') {
          setResult({
            createTag: false,
            releaseTag: '',
            allowDirty: result.allowDirty,
            action: 'dispatch',
            npmVersionBump: ''
          });
          setStep('confirm');
          setSelectedIndex(0);
          setErrorMessage('');
          return;
        }
        if (selected.key === 'history') {
          setStep('historyMenu');
          setSelectedIndex(0);
          setErrorMessage('');
          return;
        }
      }
      return;
    }

    if (step === 'bumpMenu') {
      if (key.upArrow) {
        setSelectedIndex((i) => (i - 1 + bumpMenuItems.length) % bumpMenuItems.length);
        return;
      }
      if (key.downArrow) {
        setSelectedIndex((i) => (i + 1) % bumpMenuItems.length);
        return;
      }
      if (key.return) {
        const selected = bumpMenuItems[selectedIndex];
        if (selected) {
          setResult({
            createTag: false,
            releaseTag: '',
            allowDirty: result.allowDirty,
            action: 'prepare_tagged_release',
            npmVersionBump: selected.key
          });
          setStep('confirm');
          setSelectedIndex(0);
          setErrorMessage('');
        }
      }
      if (input.toLowerCase() === 'b') {
        setStep('releaseType');
        setSelectedIndex(0);
        setErrorMessage('');
      }
      return;
    }

    if (step === 'historyMenu') {
      if (historyMenuItems.length === 0) {
        if (key.return || input.toLowerCase() === 'b') {
          setStep('releaseType');
          setSelectedIndex(0);
        }
        return;
      }
      if (key.upArrow) {
        setSelectedIndex((i) => (i - 1 + historyMenuItems.length) % historyMenuItems.length);
        return;
      }
      if (key.downArrow) {
        setSelectedIndex((i) => (i + 1) % historyMenuItems.length);
        return;
      }
      if (key.return) {
        const selected = historyMenuItems[selectedIndex];
        if (selected) {
          setSelectedHistoryKind(selected.key);
          setStep('historyDetail');
          setSelectedIndex(0);
          setErrorMessage('');
        }
      }
      if (input.toLowerCase() === 'b') {
        setStep('releaseType');
        setSelectedIndex(0);
        setErrorMessage('');
      }
      return;
    }

    if (step === 'historyDetail') {
      if (key.return || input.toLowerCase() === 'b') {
        setStep('historyMenu');
        setSelectedIndex(0);
        setErrorMessage('');
      }
      return;
    }

    if (step === 'confirm') {
      if (key.upArrow || key.leftArrow) {
        setSelectedIndex((i) => (i - 1 + confirmItems.length) % confirmItems.length);
        return;
      }
      if (key.downArrow || key.rightArrow) {
        setSelectedIndex((i) => (i + 1) % confirmItems.length);
        return;
      }
      if (key.return) {
        if (confirmItems[selectedIndex] === 'Proceed') {
          if (result.action === 'prepare_tagged_release' && isWorkingTreeDirtyNow()) {
            setErrorMessage('npm version requires a clean working tree. Clean/stash changes, then press Enter to retry.');
            return;
          }
          if (context.workingTreeDirty && !result.allowDirty) {
            setStep('dirtyOverride');
            setSelectedIndex(0);
            setErrorMessage('');
            return;
          }
          onDone(result);
        } else {
          onCancel('user_cancelled');
        }
      }
    }

    if (step === 'dirtyOverride') {
      if (key.upArrow || key.leftArrow) {
        setSelectedIndex((i) => (i - 1 + dirtyOverrideItems.length) % dirtyOverrideItems.length);
        return;
      }
      if (key.downArrow || key.rightArrow) {
        setSelectedIndex((i) => (i + 1) % dirtyOverrideItems.length);
        return;
      }
      if (key.return) {
        if (dirtyOverrideItems[selectedIndex] === 'Allow dirty and continue') {
          const nextResult = { ...result, allowDirty: true };
          setResult(nextResult);
          onDone(nextResult);
        } else {
          onCancel('dirty_override_required');
        }
      }
    }
  });

  const planRows = [
    `repo: ${context.ownerRepo}`,
    `workflow: ${context.workflowFile}`,
    `ref: ${context.mainBranch}`,
    `release_branch: ${context.releaseBranch}`,
    `working_tree_dirty: ${String(context.workingTreeDirty)}`,
    `mode: ${context.dryRun ? 'DRY RUN (no GitHub updates)' : 'EXECUTE (will dispatch workflow)'}`,
    `allow_dirty: ${String(result.allowDirty)}`,
    `action: ${result.action === 'prepare_tagged_release' ? 'prepare tagged release (npm version)' : 'dispatch release workflow'}`,
    result.action === 'prepare_tagged_release'
      ? `npm_version_command: ${npmVersionCommandForBump(result.npmVersionBump || 'patch')}`
      : null,
    `create_tag: ${String(result.createTag)}`,
    result.createTag ? `release_tag: ${result.releaseTag || '(none yet)'}` : null,
    `npm_version_convention: ${npmVersionConventionCommand()}`,
    result.createTag ? 'tagged_release_rule: source commit must be a version-bump commit' : null
  ].filter(Boolean);
  const selectedHistory = bumpHistories.find((section) => section.kind === selectedHistoryKind) || null;

  return React.createElement(
    Box,
    { flexDirection: 'column' },
    React.createElement(Text, { bold: true }, 'Release Workflow Wizard'),
    React.createElement(Text, null, `Current package version: ${context.rootVersion} (v${context.rootVersion})`),
    React.createElement(Text, null, 'Use arrow keys + Enter. Esc cancels.'),
    React.createElement(Text, null, ''),
    step === 'releaseType'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(Text, { bold: true }, 'Select release type'),
          ...releaseTypeItems.map((item, idx) =>
            React.createElement(
              Text,
              { key: item.key, color: idx === selectedIndex ? 'cyan' : undefined },
              `${idx === selectedIndex ? '›' : ' '} ${item.label}`
            )
          )
        )
      : null,
    step === 'historyMenu'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(Text, { bold: true }, 'Commit history menu'),
          ...historyMenuItems.map((item, idx) =>
            React.createElement(
              Text,
              { key: item.key, color: idx === selectedIndex ? 'cyan' : undefined },
              `${idx === selectedIndex ? '›' : ' '} ${item.label}`
            )
          ),
          React.createElement(Text, null, ''),
          React.createElement(Text, { color: 'cyan' }, 'Press Enter to open, or b/Esc to go back.')
        )
      : null,
    step === 'bumpMenu'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(Text, { bold: true }, 'Prepare tagged release: select npm version bump'),
          React.createElement(Text, null, 'No v* tag found on HEAD; choose a bump to create commit + tag.'),
          React.createElement(Text, null, ''),
          ...bumpMenuItems.map((item, idx) =>
            React.createElement(
              Text,
              { key: item.key, color: idx === selectedIndex ? 'cyan' : undefined },
              `${idx === selectedIndex ? '›' : ' '} ${item.label}`
            )
          ),
          React.createElement(Text, null, ''),
          React.createElement(Text, { color: 'cyan' }, 'Press Enter to select, or b/Esc to go back.')
        )
      : null,
    step === 'historyDetail'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(
            Text,
            {
              bold: true,
              color:
                selectedHistory?.kind === 'major'
                  ? 'red'
                  : selectedHistory?.kind === 'minor'
                    ? 'yellow'
                    : selectedHistory?.kind === 'maintenance'
                      ? 'green'
                      : 'cyan'
            },
            `${selectedHistory?.label || 'History'}: ${selectedHistory?.anchor || '(no matching tag found on main)'}`
          ),
          ...(selectedHistory && selectedHistory.commits.length > 0
            ? selectedHistory.commits.map((commit, idx) =>
                React.createElement(
                  Text,
                  { key: `${selectedHistory.kind}-commit-${idx}` },
                  `  - ${commit.timestamp}  ${commit.shortHash}  ${commit.subject}`
                )
              )
            : [React.createElement(Text, { key: 'history-detail-empty' }, '  - No commits in this range.')]),
          React.createElement(Text, null, ''),
          React.createElement(Text, { color: 'cyan' }, 'Press Enter to go back (or b/Esc).')
        )
      : null,
    step === 'confirm'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(Text, { bold: true }, 'Confirm plan'),
          ...planRows.map((row) => React.createElement(Text, { key: row }, `  ${row}`)),
          React.createElement(Text, null, ''),
          ...confirmItems.map((item, idx) =>
            React.createElement(
              Text,
              { key: item, color: idx === selectedIndex ? (item === 'Proceed' ? 'green' : 'red') : undefined },
              `${idx === selectedIndex ? '›' : ' '} ${item}`
            )
          )
        )
      : null,
    step === 'dirtyOverride'
      ? React.createElement(
          Box,
          { flexDirection: 'column' },
          React.createElement(Text, { bold: true, color: 'yellow' }, 'Working tree is not clean'),
          React.createElement(
            Text,
            null,
            'Proceeding requires an explicit dirty-tree override for this run.'
          ),
          React.createElement(Text, null, ''),
          ...dirtyOverrideItems.map((item, idx) =>
            React.createElement(
              Text,
              { key: item, color: idx === selectedIndex ? (idx === 0 ? 'yellow' : 'red') : undefined },
              `${idx === selectedIndex ? '›' : ' '} ${item}`
            )
          )
        )
      : null,
    errorMessage ? React.createElement(Text, { color: 'red' }, errorMessage) : null
  );
}

async function runInterview(context) {
  return new Promise((resolve) => {
    let settled = false;
    const app = render(
      React.createElement(Wizard, {
        context,
        onDone: (payload) => {
          if (settled) return;
          settled = true;
          app.unmount();
          resolve({ cancelled: false, ...payload });
        },
        onCancel: (reason = 'user_cancelled') => {
          if (settled) return;
          settled = true;
          app.unmount();
          resolve({ cancelled: true, reason });
        }
      })
    );
  });
}

function assertTooling(dryRun) {
  for (const cmd of ['git', 'npm', 'node']) {
    if (!commandExists(cmd)) die(`Missing required command: ${cmd}`);
  }
  if (!dryRun) {
    if (!commandExists('curl')) die('Missing required command: curl');
    if (!process.env.GITHUB_TOKEN) die('GITHUB_TOKEN is required in execute mode (PAT with repo scope).');
  }
}


function verifyRepoState(createTag, releaseTag, options = {}) {
  const allowDirty = options.allowDirty === true;
  info(`Fetching origin/${MAIN_BRANCH}...`);
  run('git', ['fetch', 'origin', MAIN_BRANCH], { stdio: 'inherit' });

  const currentBranch = run('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], { allowFailure: true }).stdout?.trim() || '';
  if (currentBranch !== MAIN_BRANCH) {
    die(`Current branch must be '${MAIN_BRANCH}' (found '${currentBranch || 'detached'}').`);
  }

  const statusPorcelain = run('git', ['status', '--porcelain']).stdout.trim();
  if (statusPorcelain && !allowDirty) {
    die('Working tree is not clean. Commit/stash changes first (or pass --allow-dirty).');
  }
  if (statusPorcelain && allowDirty) {
    info('ALLOW_DIRTY enabled: continuing with pre-existing local changes.');
  }

  const headSha = run('git', ['rev-parse', 'HEAD']).stdout.trim();
  const originMainSha = run('git', ['rev-parse', `origin/${MAIN_BRANCH}`]).stdout.trim();
  if (headSha !== originMainSha) {
    die(`Local ${MAIN_BRANCH} is not up to date with origin/${MAIN_BRANCH}. Pull/push so they match exactly.`);
  }

  if (createTag) {
    const tagExists = run('git', ['ls-remote', '--tags', 'origin', `refs/tags/${releaseTag}`]).stdout.trim();
    if (tagExists) die(`Tag already exists on origin: ${releaseTag}`);
  }

  return { headSha, baselineStatusPorcelain: statusPorcelain };
}

function verifyBuildIsClean(options = {}) {
  const allowDirty = options.allowDirty === true;
  const baselineStatusPorcelain = (options.baselineStatusPorcelain || '').trim();
  info('Running build verification: npm run build:dist');
  run('npm', ['run', 'build:dist'], { stdio: 'inherit' });
  const statusAfterBuild = run('git', ['status', '--porcelain']).stdout.trim();

  if (!allowDirty) {
    if (statusAfterBuild) {
      die("Build is not clean. 'npm run build:dist' produced changes; commit or fix before release.");
    }
    return;
  }

  if (statusAfterBuild !== baselineStatusPorcelain) {
    die(
      "Build changed working tree state beyond pre-existing dirty changes. Commit/fix build output or rerun without local edits."
    );
  }
}

function createPayload(headSha, createTag, releaseTag) {
  const body = {
    ref: MAIN_BRANCH,
    inputs: {
      source_sha: headSha,
      release_branch: RELEASE_BRANCH,
      create_tag: String(createTag)
    }
  };
  if (createTag) body.inputs.release_tag = releaseTag;
  return JSON.stringify(body);
}

function dispatchWorkflow(apiUrl, payload) {
  const response = run(
    'curl',
    [
      '-sS',
      '-X',
      'POST',
      '-H',
      `Authorization: Bearer ${process.env.GITHUB_TOKEN}`,
      '-H',
      'Accept: application/vnd.github.v3+json',
      '-d',
      payload,
      '-w',
      '\n%{http_code}',
      apiUrl
    ],
    { allowFailure: true }
  );

  if (response.error) die(`Failed to dispatch workflow: ${response.error.message}`);

  const raw = (response.stdout || '').trimEnd();
  const lines = raw.split('\n');
  const httpCode = lines.pop() || '';
  const body = lines.join('\n').trim();

  if (response.status !== 0 || httpCode !== '204') {
    console.error(`Dispatch failed with HTTP ${httpCode || 'unknown'}`);
    if (body) console.error(`Response:\n${body}`);
    process.exit(1);
  }
}

async function main() {
  loadDotEnvFromRepo();
  const { dryRun, allowDirty } = parseArgs(process.argv.slice(2));
  assertTooling(dryRun);

  const repo = collectRepoContext();
  const interview = await runInterview({
    ownerRepo: repo.ownerRepo,
    workflowFile: WORKFLOW_FILE,
    mainBranch: MAIN_BRANCH,
    releaseBranch: RELEASE_BRANCH,
    rootVersion: repo.rootVersion,
    workingTreeDirty: repo.workingTreeDirty,
    headReleaseTag: repo.headReleaseTag,
    bumpHistories: repo.bumpHistories,
    dryRun,
    allowDirty
  });

  if (interview.cancelled) {
    if (interview.reason === 'dirty_override_required') {
      die('Aborted: working tree is dirty. Re-run with --allow-dirty or choose "Allow dirty and continue".');
    }
    die('Aborted.');
  }

  if (interview.action === 'prepare_tagged_release') {
    const bump = interview.npmVersionBump || 'patch';
    const cmd = npmVersionCommandForBump(bump);
    if (dryRun) {
      info('DRY RUN enabled. Skipping npm version command execution.');
      console.log(`Would run: ${cmd}`);
      console.log('Then push tags/commits with: git push origin main --follow-tags');
      console.log('Then rerun this wizard and choose tagged release.');
      return;
    }

    info(`Running npm version command: ${cmd}`);
    run('npm', ['version', bump, '--workspaces', '--include-workspace-root'], { stdio: 'inherit' });
    info('npm version completed.');
    console.log('Next step: push commit + tags, then rerun this wizard and choose tagged release.');
    console.log('git push origin main --follow-tags');
    return;
  }

  const { createTag, releaseTag } = interview;
  const effectiveAllowDirty = allowDirty || interview.allowDirty === true;
  const { headSha, baselineStatusPorcelain } = verifyRepoState(createTag, releaseTag, {
    allowDirty: effectiveAllowDirty
  });
  if (!dryRun && createTag) {
    try {
      validateReleaseTagAgainstRef({
        releaseTag,
        ref: headSha,
        cwd: process.cwd(),
        requireBumpCommit: true
      });
    } catch (err) {
      die(err instanceof Error ? err.message : String(err));
    }
  }
  verifyBuildIsClean({ allowDirty: effectiveAllowDirty, baselineStatusPorcelain });

  const payload = createPayload(headSha, createTag, releaseTag);

  console.log('');
  console.log('Dispatch details:');
  console.log(`  repo:           ${repo.ownerRepo}`);
  console.log(`  workflow:       ${WORKFLOW_FILE}`);
  console.log(`  ref:            ${MAIN_BRANCH}`);
  console.log(`  source_sha:     ${headSha}`);
  console.log(`  release_branch: ${RELEASE_BRANCH}`);
  console.log(`  create_tag:     ${String(createTag)}`);
  if (createTag) console.log(`  release_tag:    ${releaseTag}`);
  if (createTag) console.log(`  expected_tag:   ${expectedTagForVersion(repo.rootVersion)}`);
  console.log(`  npm_version:    ${npmVersionConventionCommand()}`);
  console.log(`  allow_dirty:    ${String(effectiveAllowDirty)}`);
  console.log('');
  console.log('Commit history by bump type:');
  for (const section of repo.bumpHistories) {
    console.log(`  ${section.label}: ${section.anchor || '(no matching tag found on main)'}`);
    if (section.commits.length === 0) {
      console.log('    - No commits in this range.');
      continue;
    }
    for (const commit of section.commits) {
      console.log(`    - ${commit.timestamp}  ${commit.shortHash}  ${commit.subject}`);
    }
  }

  if (dryRun) {
    info('DRY RUN enabled. Skipping workflow dispatch.');
    console.log(`Would POST to: ${repo.apiUrl}`);
    console.log('Payload:');
    console.log(JSON.stringify(JSON.parse(payload), null, 2));
    return;
  }

  dispatchWorkflow(repo.apiUrl, payload);
  info('Release workflow dispatched successfully.');
  console.log('Monitor recent runs:');
  console.log('curl -H "Authorization: Bearer $GITHUB_TOKEN" \\');
  console.log('  -H "Accept: application/vnd.github.v3+json" \\');
  console.log(`  "https://api.github.com/repos/${repo.ownerRepo}/actions/runs?branch=${MAIN_BRANCH}&per_page=5"`);
}

main().catch((err) => {
  die(err instanceof Error ? err.message : String(err));
});
