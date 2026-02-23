import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  unsafeAsFilePath
} from "./chunk-IQRLQ6B6.js";
import "./chunk-WPQ5MXLX.js";

// packages/filesystem/src/drivers/tauri.ts
import path from "path";
var tauriInvoke;
var getInvoke = async () => {
  if (tauriInvoke) return tauriInvoke;
  const mod = await import("./core-R3JC4BUB.js");
  tauriInvoke = mod.invoke;
  return tauriInvoke;
};
var normalizeVirtualPath = (value) => {
  if (!value || value === ".") return "/";
  if (value.startsWith("/")) return value;
  return `/${value}`;
};
var TauriFSDriver = class {
  baseDirPromise;
  async getBaseDir() {
    if (!this.baseDirPromise) {
      this.baseDirPromise = (async () => {
        const invoke = await getInvoke();
        const cwd = await invoke("fs_get_base_dir");
        return cwd;
      })();
    }
    return this.baseDirPromise;
  }
  async toRealPath(input) {
    const base = await this.getBaseDir();
    const normalized = normalizeVirtualPath(input);
    if (normalized === "/") return base;
    const relative = normalized.slice(1);
    return path.join(base, relative);
  }
  async toFileEntry(entry) {
    const base = await this.getBaseDir();
    const rel = path.relative(base, entry.path);
    const virtualPath = rel ? `/${rel.split(path.sep).join("/")}` : "/";
    return {
      name: entry.name,
      path: unsafeAsFilePath(virtualPath),
      isDirectory: entry.isDirectory,
      size: entry.size,
      mtime: entry.mtimeMs ? new Date(entry.mtimeMs) : /* @__PURE__ */ new Date()
    };
  }
  async readFile(filePath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(filePath);
    const bytes = await invoke("fs_read_file", { path: realPath });
    return new Uint8Array(bytes);
  }
  async writeFile(filePath, data) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(filePath);
    await invoke("fs_write_file", { path: realPath, data: Array.from(data) });
  }
  async readdir(dirPath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(dirPath);
    const entries = await invoke("fs_readdir", { path: realPath });
    return Promise.all(entries.map((entry) => this.toFileEntry(entry)));
  }
  async stat(filePath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(filePath);
    const entry = await invoke("fs_stat", { path: realPath });
    return this.toFileEntry(entry);
  }
  async mkdir(dirPath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(dirPath);
    await invoke("fs_mkdir", { path: realPath });
  }
  async rm(filePath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(filePath);
    await invoke("fs_rm", { path: realPath });
  }
  async exists(filePath) {
    const invoke = await getInvoke();
    const realPath = await this.toRealPath(filePath);
    return invoke("fs_exists", { path: realPath });
  }
  async getBackendInfo() {
    return {
      adapter: "tauri",
      baseDir: await this.getBaseDir()
    };
  }
};
export {
  TauriFSDriver
};
