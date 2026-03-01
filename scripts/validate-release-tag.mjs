#!/usr/bin/env node
import process from 'node:process';
import { validateReleaseTagAgainstRef } from './release-tag-shared.mjs';

function parseArgs(argv) {
  let releaseTag = '';
  let sourceRef = 'HEAD';
  let requireBumpCommit = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--release-tag') {
      releaseTag = argv[i + 1] || '';
      i += 1;
    } else if (arg === '--source-ref') {
      sourceRef = argv[i + 1] || 'HEAD';
      i += 1;
    } else if (arg === '--require-bump-commit') {
      requireBumpCommit = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scripts/validate-release-tag.mjs --release-tag <tag> [--source-ref <ref>] [--require-bump-commit]

Validates that:
- tag format is vX.Y.Z (optional pre-release/build suffix)
- tag equals v<package.json version> at the given git ref
- optionally, source ref itself is a version-bump commit
- workspace package versions are synced with root version at the given ref`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!releaseTag) {
    throw new Error('--release-tag is required');
  }

  return { releaseTag, sourceRef, requireBumpCommit };
}

try {
  const { releaseTag, sourceRef, requireBumpCommit } = parseArgs(process.argv.slice(2));
  const result = validateReleaseTagAgainstRef({
    releaseTag,
    ref: sourceRef,
    cwd: process.cwd(),
    requireBumpCommit
  });
  console.log(
    `[release] validated tag '${releaseTag}' against package.json version '${result.version}' at '${sourceRef}'`
  );
  if (requireBumpCommit) {
    console.log(`[release] version bump commit check passed (${result.changedVersionManifests.length} manifest changes)`);
  }
  console.log(`[release] workspace version sync check passed`);
} catch (err) {
  console.error(`ERROR: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
