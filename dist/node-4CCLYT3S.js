import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  unsafeAsFilePath
} from "./chunk-IQRLQ6B6.js";
import "./chunk-WPQ5MXLX.js";

// packages/filesystem/src/drivers/native.ts
import { promises as fs } from "fs";
import path from "path";
function toEntry(fullPath, stats) {
  return {
    name: path.basename(fullPath),
    path: unsafeAsFilePath(fullPath),
    isDirectory: stats.isDirectory(),
    size: Number(stats.size),
    mtime: stats.mtime
  };
}
var NativeFSDriver = class {
  async readFile(filePath) {
    const buffer = await fs.readFile(filePath);
    return new Uint8Array(buffer);
  }
  async writeFile(filePath, data) {
    await fs.writeFile(filePath, data);
  }
  async readdir(dirPath) {
    const names = await fs.readdir(dirPath);
    return Promise.all(
      names.map(async (name) => {
        const fullPath = path.join(dirPath, name);
        const stats = await fs.stat(fullPath);
        return toEntry(fullPath, stats);
      })
    );
  }
  async stat(filePath) {
    const stats = await fs.stat(filePath);
    return toEntry(filePath, stats);
  }
  async mkdir(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
  }
  async rm(filePath) {
    await fs.rm(filePath, { recursive: true, force: true });
  }
  async exists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
};

// packages/filesystem/src/watcher/node-watcher.ts
import { watch } from "fs";
import path2 from "path";
var NodeWatcherService = class {
  watch(target, callback) {
    const watcher = watch(target, (_eventType, filename) => {
      if (!filename) return;
      callback({
        type: "modified" /* Modified */,
        path: unsafeAsFilePath(path2.join(target, filename.toString())),
        timestamp: /* @__PURE__ */ new Date()
      });
    });
    return () => watcher.close();
  }
  watchFile(target, callback) {
    const watcher = watch(target, () => {
      callback({
        type: "modified" /* Modified */,
        path: target,
        timestamp: /* @__PURE__ */ new Date()
      });
    });
    return () => watcher.close();
  }
};

// packages/filesystem/src/watcher/polling-watcher.ts
import { promises as fs2 } from "fs";
var PollingWatcherService = class {
  watch(path3, callback) {
    const interval = setInterval(async () => {
      try {
        await fs2.readdir(path3);
        callback({ type: "modified" /* Modified */, path: unsafeAsFilePath(path3), timestamp: /* @__PURE__ */ new Date() });
      } catch {
        callback({ type: "deleted" /* Deleted */, path: unsafeAsFilePath(path3), timestamp: /* @__PURE__ */ new Date() });
      }
    }, 1500);
    return () => clearInterval(interval);
  }
  watchFile(path3, callback) {
    const interval = setInterval(async () => {
      try {
        await fs2.stat(path3);
        callback({ type: "modified" /* Modified */, path: path3, timestamp: /* @__PURE__ */ new Date() });
      } catch {
        callback({ type: "deleted" /* Deleted */, path: path3, timestamp: /* @__PURE__ */ new Date() });
      }
    }, 1500);
    return () => clearInterval(interval);
  }
};
export {
  NativeFSDriver,
  NodeWatcherService,
  PollingWatcherService
};
