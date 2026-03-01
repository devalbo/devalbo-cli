#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import process from 'node:process';

export const RELEASE_TAG_PATTERN = /^v[0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.-]+)?$/;

function runGit(args, options = {}) {
  const result = spawnSync('git', args, {
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
    cwd: options.cwd || process.cwd()
  });

  if (options.allowFailure) return result;

  if (result.error) {
    throw new Error(`Failed to run git ${args.join(' ')}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    const stdout = (result.stdout || '').trim();
    throw new Error(`git ${args.join(' ')} failed${stderr ? `: ${stderr}` : stdout ? `: ${stdout}` : ''}`);
  }
  return result;
}

export function isValidReleaseTag(tag) {
  return RELEASE_TAG_PATTERN.test(tag);
}

export function expectedTagForVersion(version) {
  return `v${String(version || '').trim()}`;
}

export function versionFromReleaseTag(releaseTag) {
  return String(releaseTag || '').replace(/^v/, '');
}

export function npmVersionCommandForTag(releaseTag) {
  return `npm version ${versionFromReleaseTag(releaseTag)} --workspaces --include-workspace-root`;
}

export function readPackageVersionAtRef(ref = 'HEAD', options = {}) {
  const result = runGit(['show', `${ref}:package.json`], options);
  const raw = (result.stdout || '').trim();
  if (!raw) {
    throw new Error(`package.json not found at git ref '${ref}'`);
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid package.json at '${ref}': ${err instanceof Error ? err.message : String(err)}`);
  }
  if (!parsed.version) {
    throw new Error(`package.json at '${ref}' is missing a version`);
  }
  return String(parsed.version);
}

function listVersionManifestFiles(options = {}) {
  const result = runGit(['ls-files', 'package.json', 'packages/*/package.json'], options);
  return (result.stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function readVersionAtPathRef(path, ref, options = {}) {
  const result = runGit(['show', `${ref}:${path}`], { ...options, allowFailure: true });
  if (result.status !== 0) return null;
  const raw = (result.stdout || '').trim();
  if (!raw) return null;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  return parsed.version ? String(parsed.version) : null;
}

export function getChangedVersionManifestsAtRef(ref = 'HEAD', options = {}) {
  const cwd = options.cwd || process.cwd();
  const hasParent = runGit(['rev-parse', '--verify', `${ref}^`], { cwd, allowFailure: true }).status === 0;
  if (!hasParent) return [];

  const files = listVersionManifestFiles({ cwd });
  const changed = [];
  for (const file of files) {
    const currentVersion = readVersionAtPathRef(file, ref, { cwd });
    const previousVersion = readVersionAtPathRef(file, `${ref}^`, { cwd });
    if (currentVersion && previousVersion && currentVersion !== previousVersion) {
      changed.push({ file, previousVersion, currentVersion });
    }
  }
  return changed;
}

export function getWorkspaceVersionMismatchesAtRef(ref = 'HEAD', options = {}) {
  const cwd = options.cwd || process.cwd();
  const files = listVersionManifestFiles({ cwd });
  const rootVersion = readVersionAtPathRef('package.json', ref, { cwd });
  if (!rootVersion) {
    throw new Error(`package.json version not found at '${ref}'`);
  }

  const mismatches = [];
  for (const file of files) {
    const version = readVersionAtPathRef(file, ref, { cwd });
    if (!version) continue;
    if (version !== rootVersion) {
      mismatches.push({ file, version, expectedVersion: rootVersion });
    }
  }

  return { rootVersion, mismatches };
}

export function validateReleaseTagAgainstRef({
  releaseTag,
  ref = 'HEAD',
  cwd = process.cwd(),
  requireBumpCommit = false,
  requireWorkspaceSync = true
}) {
  if (!releaseTag) {
    throw new Error('release_tag is required');
  }
  if (!isValidReleaseTag(releaseTag)) {
    throw new Error(`release_tag must match vX.Y.Z (optionally with pre-release/build suffix): ${releaseTag}`);
  }
  const version = readPackageVersionAtRef(ref, { cwd });
  const expectedTag = expectedTagForVersion(version);
  if (releaseTag !== expectedTag) {
    const cmd = npmVersionCommandForTag(expectedTag);
    throw new Error(
      `release_tag must match package.json version at '${ref}': expected '${expectedTag}', got '${releaseTag}'. ` +
        `Use npm version convention: ${cmd}`
    );
  }

  const changedVersionManifests = getChangedVersionManifestsAtRef(ref, { cwd });
  if (requireBumpCommit && changedVersionManifests.length === 0) {
    const cmd = npmVersionCommandForTag(releaseTag);
    throw new Error(
      `release tag '${releaseTag}' requires source ref '${ref}' to be a version-bump commit (no package version changes vs ${ref}^). ` +
        `Use npm version convention: ${cmd}`
    );
  }

  const { rootVersion, mismatches } = getWorkspaceVersionMismatchesAtRef(ref, { cwd });
  if (requireWorkspaceSync && mismatches.length > 0) {
    const details = mismatches.map((m) => `${m.file}=${m.version}`).join(', ');
    throw new Error(
      `workspace package versions are out of sync at '${ref}'. root= ${rootVersion}; mismatches: ${details}. ` +
        `Run npm version convention: npm version ${rootVersion} --workspaces --include-workspace-root`
    );
  }

  return { version, expectedTag, changedVersionManifests, workspaceVersionMismatches: mismatches };
}
