import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  subscribeBrowserFsEvents
} from "./chunk-DGATKBY6.js";
import {
  detectPlatform,
  unsafeAsFilePath
} from "./chunk-LFJ2WG2S.js";

// packages/filesystem/src/drivers/memory.ts
import path from "path";
var InMemoryDriver = class {
  nodes = /* @__PURE__ */ new Map();
  constructor(seed = {}) {
    this.nodes.set("/", { data: new Uint8Array(), isDirectory: true, mtime: /* @__PURE__ */ new Date() });
    for (const [filePath, content] of Object.entries(seed)) {
      this.nodes.set(filePath, { data: new TextEncoder().encode(content), isDirectory: false, mtime: /* @__PURE__ */ new Date() });
    }
  }
  async readFile(filePath) {
    const node = this.nodes.get(filePath);
    if (!node || node.isDirectory) {
      throw new Error(`File not found: ${filePath}`);
    }
    return node.data;
  }
  async writeFile(filePath, data) {
    this.nodes.set(filePath, { data, isDirectory: false, mtime: /* @__PURE__ */ new Date() });
  }
  async readdir(dirPath) {
    const prefix = dirPath.endsWith("/") ? dirPath : `${dirPath}/`;
    const entries = [];
    for (const [nodePath, node] of this.nodes.entries()) {
      if (!nodePath.startsWith(prefix) || nodePath === dirPath) continue;
      const rel = nodePath.slice(prefix.length);
      if (rel.includes("/")) continue;
      entries.push({
        name: path.basename(nodePath),
        path: unsafeAsFilePath(nodePath),
        isDirectory: node.isDirectory,
        size: node.data.length,
        mtime: node.mtime
      });
    }
    return entries;
  }
  async stat(filePath) {
    const node = this.nodes.get(filePath);
    if (!node) {
      throw new Error(`Path not found: ${filePath}`);
    }
    return {
      name: path.basename(filePath),
      path: unsafeAsFilePath(filePath),
      isDirectory: node.isDirectory,
      size: node.data.length,
      mtime: node.mtime
    };
  }
  async mkdir(dirPath) {
    this.nodes.set(dirPath, { data: new Uint8Array(), isDirectory: true, mtime: /* @__PURE__ */ new Date() });
  }
  async rm(filePath) {
    this.nodes.delete(filePath);
  }
  async exists(filePath) {
    return this.nodes.has(filePath);
  }
};

// packages/filesystem/src/drivers/zenfs.ts
var ZenFSDriver = class {
  async readFile(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async writeFile(_path, _data) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async readdir(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async stat(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async mkdir(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async rm(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
  async exists(_path) {
    throw new Error("ZenFSDriver is not implemented yet");
  }
};

// packages/filesystem/src/watcher/browser-watcher.ts
var normalizePath = (input) => {
  if (input === "" || input === ".") return "/";
  return input.startsWith("/") ? input : `/${input}`;
};
var isSamePath = (left, right) => normalizePath(left) === normalizePath(right);
var isWithinDirectory = (targetPath, directoryPath) => {
  const normalizedTarget = normalizePath(targetPath);
  const normalizedDirectory = normalizePath(directoryPath);
  if (normalizedDirectory === "/") return normalizedTarget.startsWith("/");
  return normalizedTarget === normalizedDirectory || normalizedTarget.startsWith(`${normalizedDirectory}/`);
};
var BrowserWatcherService = class {
  watch(path2, callback) {
    return subscribeBrowserFsEvents((event) => {
      if (isWithinDirectory(event.path, path2)) {
        callback(event);
      }
    });
  }
  watchFile(path2, callback) {
    return subscribeBrowserFsEvents((event) => {
      if (isSamePath(event.path, path2) || event.oldPath != null && isSamePath(event.oldPath, path2)) {
        callback(event);
      }
    });
  }
};

// packages/filesystem/src/watcher/service.ts
var createWatcherService = async () => {
  const env = detectPlatform();
  if (env.platform === "nodejs" /* NodeJS */) {
    const { NodeWatcherService } = await import(
      /* @vite-ignore */
      "./node-SYAKYRSK.js"
    );
    return new NodeWatcherService();
  }
  return new BrowserWatcherService();
};

// packages/filesystem/src/index.ts
var driverPromise;
var createFilesystemDriver = async () => {
  if (driverPromise) return driverPromise;
  driverPromise = (async () => {
    const env = detectPlatform();
    if (env.platform === "nodejs" /* NodeJS */) {
      const { NativeFSDriver } = await import(
        /* @vite-ignore */
        "./node-SYAKYRSK.js"
      );
      return new NativeFSDriver();
    }
    if (env.platform === "tauri" /* Tauri */) {
      const { TauriFSDriver } = await import("./tauri-4IVBVPTB.js");
      return new TauriFSDriver();
    }
    const { BrowserStoreFSDriver } = await import("./browser-store-HRWSKSVR.js");
    return new BrowserStoreFSDriver();
  })();
  return driverPromise;
};
var getFilesystemBackendInfo = async () => {
  const env = detectPlatform();
  const driver = await createFilesystemDriver();
  if (env.platform === "nodejs" /* NodeJS */) {
    return {
      platform: env.platform,
      adapter: "native-node"
    };
  }
  if (env.platform === "tauri" /* Tauri */) {
    const tauriDriver = driver;
    const info2 = await tauriDriver.getBackendInfo?.();
    const out2 = {
      platform: env.platform,
      adapter: info2?.adapter ?? "tauri"
    };
    if (info2?.baseDir) out2.baseDir = info2.baseDir;
    return out2;
  }
  const browserDriver = driver;
  const info = await browserDriver.getBackendInfo?.();
  const out = {
    platform: env.platform,
    adapter: info?.adapter ?? "browser-store"
  };
  if (info?.persistence) out.persistence = info.persistence;
  return out;
};

export {
  InMemoryDriver,
  ZenFSDriver,
  BrowserWatcherService,
  createWatcherService,
  createFilesystemDriver,
  getFilesystemBackendInfo
};
