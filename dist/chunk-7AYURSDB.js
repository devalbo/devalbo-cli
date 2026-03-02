import {
  createStore
} from "./chunk-O6JNKVMS.js";
import {
  unsafeAsDirectoryPath,
  unsafeAsFilePath
} from "./chunk-WZOCM4TZ.js";

// packages/filesystem/src/drivers/browser-store.ts
var FS_TABLE = "fs";
var FS_STORAGE_KEY = "naveditor.fs.v1";
var browserFsListeners = /* @__PURE__ */ new Set();
var subscribeBrowserFsEvents = (listener) => {
  browserFsListeners.add(listener);
  return () => {
    browserFsListeners.delete(listener);
  };
};
var emitBrowserFsEvent = (event) => {
  for (const listener of browserFsListeners) {
    try {
      listener(event);
    } catch {
    }
  }
};
var normalizeBrowserPath = (input) => {
  if (input === "" || input === ".") return "/";
  if (input.startsWith("/")) return input;
  return `/${input}`;
};
var baseName = (targetPath) => {
  if (targetPath === "/") return "/";
  const parts = targetPath.split("/").filter(Boolean);
  return parts.at(-1) ?? "/";
};
var parentPath = (targetPath) => {
  if (targetPath === "/") return "/";
  const parts = targetPath.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return `/${parts.slice(0, -1).join("/")}`;
};
var encodeBytes = (bytes) => {
  if (typeof btoa !== "function") {
    throw new Error("btoa is unavailable in this runtime");
  }
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};
var decodeBytes = (base64) => {
  if (typeof atob !== "function") {
    throw new Error("atob is unavailable in this runtime");
  }
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
};
var seedBrowserStore = (store) => {
  const existing = store.getTable(FS_TABLE);
  if (Object.keys(existing).length > 0) return;
  const ensureDirectoryPath = (targetPath) => {
    const normalized = normalizeBrowserPath(targetPath);
    if (normalized === "/") {
      const root = store.getRow(FS_TABLE, "/");
      if (!Object.keys(root ?? {}).length) {
        store.setRow(FS_TABLE, "/", {
          name: "/",
          isDirectory: 1,
          size: 0,
          mtime: (/* @__PURE__ */ new Date()).toISOString(),
          data: ""
        });
      }
      return;
    }
    const parts = normalized.split("/").filter(Boolean);
    let current = "";
    for (const part of parts) {
      current = `${current}/${part}`;
      const row = store.getRow(FS_TABLE, current);
      if (!Object.keys(row ?? {}).length) {
        store.setRow(FS_TABLE, current, {
          name: baseName(current),
          isDirectory: 1,
          size: 0,
          mtime: (/* @__PURE__ */ new Date()).toISOString(),
          data: ""
        });
      }
    }
  };
  ensureDirectoryPath("/");
  ensureDirectoryPath("/src");
  ensureDirectoryPath("/tests/fixtures/sample-files");
  const seedFiles = {
    "/README.md": "# naveditor\nBrowser demo filesystem",
    "/notes.txt": "Type commands in the shell to navigate or edit files.",
    "/src/index.ts": 'export const hello = () => "world";',
    "/tests/fixtures/sample-files/hello.txt": "Hello, World!"
  };
  const now = (/* @__PURE__ */ new Date()).toISOString();
  Object.entries(seedFiles).forEach(([filePath, content]) => {
    const bytes = new TextEncoder().encode(content);
    store.setRow(FS_TABLE, filePath, {
      name: baseName(filePath),
      isDirectory: 0,
      size: bytes.length,
      mtime: now,
      data: encodeBytes(bytes)
    });
  });
};
var BrowserStoreFSDriver = class {
  store;
  persister;
  initPromise;
  persistenceMode = "localStorage";
  hasStoreListener = false;
  constructor() {
    this.store = createStore();
  }
  rowForPath(targetPath) {
    const row = this.store.getRow(FS_TABLE, targetPath);
    if (!row) return void 0;
    return Object.keys(row).length === 0 ? void 0 : row;
  }
  setDirectoryRow(targetPath) {
    this.store.setRow(FS_TABLE, targetPath, {
      name: baseName(targetPath),
      isDirectory: 1,
      size: 0,
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      data: ""
    });
  }
  ensureDirectoryPath(targetPath) {
    const created = [];
    const normalized = normalizeBrowserPath(targetPath);
    if (normalized === "/") {
      if (!this.rowForPath("/")) {
        this.setDirectoryRow("/");
        created.push("/");
      }
      return created;
    }
    const parts = normalized.split("/").filter(Boolean);
    let current = "";
    for (const part of parts) {
      current = `${current}/${part}`;
      if (!this.rowForPath(current)) {
        this.setDirectoryRow(current);
        created.push(current);
      }
    }
    return created;
  }
  ensureStoreListener() {
    if (this.hasStoreListener) return;
    this.store.addTableListener(FS_TABLE, () => {
      emitBrowserFsEvent({
        type: "modified" /* Modified */,
        path: unsafeAsFilePath("/"),
        timestamp: /* @__PURE__ */ new Date()
      });
    });
    this.hasStoreListener = true;
  }
  async init() {
    if (this.initPromise) return this.initPromise;
    this.initPromise = (async () => {
      try {
        const { createOpfsPersister } = await import("./persister-browser-MMZCMMU3.js");
        const opfsRoot = await navigator.storage.getDirectory();
        const opfsHandle = await opfsRoot.getFileHandle(`${FS_STORAGE_KEY}.json`, { create: true });
        const opfsPersister = createOpfsPersister(this.store, opfsHandle);
        this.persistenceMode = "opfs";
        this.persister = opfsPersister;
        await opfsPersister.load();
        seedBrowserStore(this.store);
        await opfsPersister.save();
        await opfsPersister.startAutoSave();
        await opfsPersister.startAutoLoad();
      } catch (opfsError) {
        console.warn("OPFS init failed, trying IndexedDB persister:", opfsError);
        try {
          const { createIndexedDbPersister } = await import("./persister-indexed-db-EUADPV4I.js");
          this.persistenceMode = "indexeddb";
          const indexedDbPersister = createIndexedDbPersister(this.store, FS_STORAGE_KEY);
          this.persister = indexedDbPersister;
          await indexedDbPersister.load();
          seedBrowserStore(this.store);
          await indexedDbPersister.save();
          await indexedDbPersister.startAutoSave();
          await indexedDbPersister.startAutoLoad();
        } catch (indexedDbError) {
          console.warn("IndexedDB init failed, falling back to localStorage persister:", indexedDbError);
          const { createLocalPersister } = await import("./persister-browser-MMZCMMU3.js");
          this.persistenceMode = "localStorage";
          const localPersister = createLocalPersister(this.store, FS_STORAGE_KEY);
          this.persister = localPersister;
          await localPersister.load();
          seedBrowserStore(this.store);
          await localPersister.save();
          await localPersister.startAutoSave();
          await localPersister.startAutoLoad();
        }
      }
      this.ensureStoreListener();
    })();
    await this.initPromise;
  }
  async load() {
    await this.init();
    await this.persister?.load();
  }
  async save() {
    await this.init();
    await this.persister?.save();
  }
  async readFile(path2) {
    await this.load();
    const targetPath = normalizeBrowserPath(path2);
    const row = this.rowForPath(targetPath);
    if (!row || row.isDirectory === 1) {
      throw new Error(`File not found: ${targetPath}`);
    }
    return decodeBytes(row.data ?? "");
  }
  async writeFile(path2, data) {
    await this.init();
    const targetPath = normalizeBrowserPath(path2);
    const existed = Boolean(this.rowForPath(targetPath));
    const createdDirectories = this.ensureDirectoryPath(parentPath(targetPath));
    this.store.setRow(FS_TABLE, targetPath, {
      name: baseName(targetPath),
      isDirectory: 0,
      size: data.length,
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      data: encodeBytes(data)
    });
    await this.save();
    for (const createdPath of createdDirectories) {
      emitBrowserFsEvent({
        type: "created" /* Created */,
        path: unsafeAsFilePath(createdPath),
        timestamp: /* @__PURE__ */ new Date()
      });
    }
    emitBrowserFsEvent({
      type: existed ? "modified" /* Modified */ : "created" /* Created */,
      path: unsafeAsFilePath(targetPath),
      timestamp: /* @__PURE__ */ new Date()
    });
  }
  async readdir(path2) {
    await this.load();
    const dirPath = normalizeBrowserPath(path2);
    const dirRow = this.rowForPath(dirPath);
    if (!dirRow || dirRow.isDirectory !== 1) {
      throw new Error(`Directory not found: ${dirPath}`);
    }
    const prefix = dirPath === "/" ? "/" : `${dirPath}/`;
    return Object.entries(this.store.getTable(FS_TABLE) ?? {}).filter(([entryPath]) => entryPath !== dirPath && entryPath.startsWith(prefix)).filter(([entryPath]) => {
      const rel = entryPath.slice(prefix.length);
      return rel.length > 0 && !rel.includes("/");
    }).map(([entryPath, row]) => {
      const fsRow = row;
      return {
        name: fsRow.name ?? baseName(entryPath),
        path: unsafeAsFilePath(entryPath),
        isDirectory: fsRow.isDirectory === 1,
        size: fsRow.size ?? 0,
        mtime: fsRow.mtime ? new Date(fsRow.mtime) : /* @__PURE__ */ new Date()
      };
    });
  }
  async stat(path2) {
    await this.load();
    const targetPath = normalizeBrowserPath(path2);
    const row = this.rowForPath(targetPath);
    if (!row) throw new Error(`Path not found: ${targetPath}`);
    return {
      name: row.name ?? baseName(targetPath),
      path: unsafeAsFilePath(targetPath),
      isDirectory: row.isDirectory === 1,
      size: row.size ?? 0,
      mtime: row.mtime ? new Date(row.mtime) : /* @__PURE__ */ new Date()
    };
  }
  async mkdir(path2) {
    await this.init();
    const dirPath = normalizeBrowserPath(path2);
    const createdPaths = this.ensureDirectoryPath(dirPath);
    await this.save();
    for (const createdPath of createdPaths) {
      emitBrowserFsEvent({
        type: "created" /* Created */,
        path: unsafeAsFilePath(createdPath),
        timestamp: /* @__PURE__ */ new Date()
      });
    }
  }
  async rm(path2) {
    await this.init();
    const targetPath = normalizeBrowserPath(path2);
    const existed = Boolean(this.rowForPath(targetPath));
    this.store.delRow(FS_TABLE, targetPath);
    await this.save();
    if (existed) {
      emitBrowserFsEvent({
        type: "deleted" /* Deleted */,
        path: unsafeAsFilePath(targetPath),
        timestamp: /* @__PURE__ */ new Date()
      });
    }
  }
  async exists(path2) {
    await this.load();
    const targetPath = normalizeBrowserPath(path2);
    return Boolean(this.rowForPath(targetPath));
  }
  async getBackendInfo() {
    await this.init();
    return {
      adapter: "browser-store",
      persistence: this.persistenceMode
    };
  }
};
var toFilePath = (path2) => unsafeAsFilePath(normalizeBrowserPath(path2));
var toDirectoryPath = (path2) => unsafeAsDirectoryPath(normalizeBrowserPath(path2));

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

// packages/filesystem/src/browser.ts
var createWatcherService = () => new BrowserWatcherService();
var createFilesystemDriver = async () => new BrowserStoreFSDriver();
var getFilesystemBackendInfo = async () => {
  const driver = new BrowserStoreFSDriver();
  const info = await driver.getBackendInfo?.();
  return {
    platform: "browser" /* Browser */,
    adapter: "browser-store",
    ...info?.persistence ? { persistence: info.persistence } : {}
  };
};

export {
  FS_STORAGE_KEY,
  subscribeBrowserFsEvents,
  BrowserStoreFSDriver,
  toFilePath,
  toDirectoryPath,
  BrowserWatcherService,
  InMemoryDriver,
  ZenFSDriver,
  createWatcherService,
  createFilesystemDriver,
  getFilesystemBackendInfo
};
