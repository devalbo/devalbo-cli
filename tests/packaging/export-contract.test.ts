import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
  exports?: Record<string, unknown>;
};

const expectedTopLevelKeys = ['.', './vite', './node'];
const exportsMap = pkg.exports ?? {};

for (const key of expectedTopLevelKeys) {
  if (!(key in exportsMap)) {
    throw new Error(`Missing exports key: ${key}`);
  }
}

const main = exportsMap['.'] as Record<string, string>;
if (!main || typeof main !== 'object') {
  throw new Error("Invalid exports['.'] structure");
}
for (const key of ['types', 'import']) {
  if (!(key in main)) {
    throw new Error(`Missing exports['.'] field: ${key}`);
  }
}

const nodeSubpath = exportsMap['./node'] as Record<string, string>;
if (!nodeSubpath || typeof nodeSubpath !== 'object') {
  throw new Error("Invalid exports['./node'] structure");
}
for (const key of ['types', 'browser', 'import']) {
  if (!(key in nodeSubpath)) {
    throw new Error(`Missing exports['./node'] field: ${key}`);
  }
}

console.log('Export contract check passed.');
