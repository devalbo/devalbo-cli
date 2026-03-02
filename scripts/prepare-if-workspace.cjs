/**
 * Run build:dist only when the repo has packages/ (workspace layout).
 * When installed from npm tarball or release branch there is no packages/,
 * so we skip build and rely on pre-built dist/.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const packagesDir = path.join(repoRoot, 'packages');

if (fs.existsSync(packagesDir)) {
  execSync('npm run build:dist', { cwd: repoRoot, stdio: 'inherit' });
}
