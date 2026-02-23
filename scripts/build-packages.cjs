/**
 * Build packages in dependency order so the root can be built with npm only.
 * Run from repo root: node scripts/build-packages.cjs
 */
const { execSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const packageDirs = [
  'packages/branded-types',
  'packages/shared',
  'packages/commands',
  'packages/state',
  'packages/ui',
  'packages/filesystem',
  'packages/solid-client',
  'packages/worker-bridge',
  'packages/cli-shell',
];

for (const dir of packageDirs) {
  const abs = path.join(repoRoot, dir);
  console.log(`Building ${dir}...`);
  execSync('npm run build', { cwd: abs, stdio: 'inherit' });
}

console.log('All packages built.');
