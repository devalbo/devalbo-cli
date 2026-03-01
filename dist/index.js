import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  createStore
} from "./chunk-B6HT3W4I.js";
import {
  BrowserConnectivityService,
  Effect_exports,
  MissingArgument,
  createCliAppConfig,
  detectPlatform,
  external_exports,
  pathArgSchema,
  unsafeAsDirectoryPath,
  unsafeAsFilePath
} from "./chunk-UU3L6ZIJ.js";
import "./chunk-TWWXOWDW.js";

// packages/cli-shell/src/lib/filesystem-actions.ts
import path2 from "path";

// packages/filesystem/src/drivers/memory.ts
import path from "path";

// packages/filesystem/src/index.ts
var driverPromise;
var createFilesystemDriver = async () => {
  if (driverPromise) return driverPromise;
  driverPromise = (async () => {
    const env = detectPlatform();
    if (env.platform === "nodejs" /* NodeJS */) {
      const { NativeFSDriver } = await import(
        /* @vite-ignore */
        "./node-VNOECGHW.js"
      );
      return new NativeFSDriver();
    }
    if (env.platform === "tauri" /* Tauri */) {
      const { TauriFSDriver } = await import("./tauri-PAHQDJOI.js");
      return new TauriFSDriver();
    }
    const { BrowserStoreFSDriver } = await import("./browser-store-Z53PTR4W.js");
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

// packages/cli-shell/src/lib/file-operations.ts
var driverPromise2;
var getDriver = async () => {
  if (!driverPromise2) {
    driverPromise2 = createFilesystemDriver();
  }
  return driverPromise2;
};
var getFilesystemBackendInfo2 = async () => getFilesystemBackendInfo();

// packages/cli-shell/src/lib/bft-transfer.ts
var BftTextNodeSchema = external_exports.object({
  type: external_exports.literal("text"),
  content: external_exports.string(),
  comment: external_exports.string().optional()
});
var BftBinaryNodeSchema = external_exports.object({
  type: external_exports.literal("binary"),
  encoding: external_exports.literal("base64"),
  content: external_exports.string(),
  comment: external_exports.string().optional()
});
var BftNodeSchema = external_exports.lazy(
  () => external_exports.union([
    BftTextNodeSchema,
    BftBinaryNodeSchema,
    external_exports.object({
      type: external_exports.literal("directory"),
      entries: external_exports.record(external_exports.string(), BftNodeSchema),
      comment: external_exports.string().optional()
    })
  ])
);
var utf8Decoder = new TextDecoder("utf-8", { fatal: true });

// packages/cli-shell/src/lib/filesystem-args.schema.ts
var PathTokenSchema = pathArgSchema;
var CdArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var LsArgsSchema = external_exports.object({
  path: PathTokenSchema.optional()
});
var TreeArgsSchema = external_exports.object({
  path: PathTokenSchema.optional()
});
var StatArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var CatArgsSchema = external_exports.object({
  file: PathTokenSchema
});
var TouchArgsSchema = external_exports.object({
  file: PathTokenSchema
});
var MkdirArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var RmArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var CpArgsSchema = external_exports.object({
  source: PathTokenSchema,
  dest: PathTokenSchema
});
var MvArgsSchema = external_exports.object({
  source: PathTokenSchema,
  dest: PathTokenSchema
});

// packages/cli-shell/src/lib/filesystem-actions.ts
var isNode = () => detectPlatform().platform === "nodejs" /* NodeJS */;
var pathOps = () => isNode() ? path2 : path2.posix;
var getDefaultCwd = () => {
  if (!isNode()) return "/";
  const nodeProcess = globalThis.process;
  return nodeProcess?.cwd?.() ?? "/";
};
var joinFsPath = (left, right) => pathOps().join(left, right);
var resolveFsPath = (cwd, input = ".") => {
  const ops = pathOps();
  return isNode() ? ops.resolve(cwd, input) : ops.normalize(input.startsWith("/") ? input : ops.join(cwd, input));
};
var basename = (targetPath) => pathOps().basename(targetPath);
var toFilePath = (targetPath) => unsafeAsFilePath(targetPath);
var toDirectoryPath = (targetPath) => unsafeAsDirectoryPath(targetPath);
var validatePathArg = (value2, label) => {
  const parsed = PathTokenSchema.safeParse(value2);
  if (!parsed.success) {
    const message2 = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`${label}: ${message2}`);
  }
  return parsed.data;
};
var sortEntries = (entries) => entries.slice().sort((a, b) => {
  if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
  return a.name.localeCompare(b.name);
});
var changeDir = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (!entry.isDirectory) {
    throw new Error(`Not a directory: ${requested}`);
  }
  return targetPath;
};
var listDirectory = async (cwd, requested = ".") => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const entries = await driver.readdir(toDirectoryPath(targetPath));
  return sortEntries(entries);
};
var readTextFile = async (cwd, requested) => {
  const bytes = await readBytesFile(cwd, requested);
  return new TextDecoder().decode(bytes);
};
var readBytesFile = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid file path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (entry.isDirectory) {
    throw new Error(`Not a file: ${requested}`);
  }
  return driver.readFile(toFilePath(targetPath));
};
var touchFile = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid file path"));
  const driver = await getDriver();
  const exists = await driver.exists(toFilePath(targetPath));
  if (exists) {
    const entry = await driver.stat(toFilePath(targetPath));
    if (entry.isDirectory) {
      throw new Error(`Not a file: ${requested}`);
    }
  }
  await driver.writeFile(toFilePath(targetPath), new Uint8Array());
  return targetPath;
};
var makeDirectory = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  await driver.mkdir(toDirectoryPath(targetPath));
  return targetPath;
};
var removeRecursiveAbsolute = async (targetPath) => {
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (entry.isDirectory) {
    const children = await driver.readdir(toDirectoryPath(targetPath));
    for (const child of children) {
      await removeRecursiveAbsolute(joinFsPath(targetPath, child.name));
    }
  }
  await driver.rm(toFilePath(targetPath));
};
var copyRecursiveAbsolute = async (sourcePath, destPath) => {
  const driver = await getDriver();
  const source = await driver.stat(toFilePath(sourcePath));
  if (source.isDirectory) {
    await driver.mkdir(toDirectoryPath(destPath));
    const children = await driver.readdir(toDirectoryPath(sourcePath));
    for (const child of children) {
      await copyRecursiveAbsolute(joinFsPath(sourcePath, child.name), joinFsPath(destPath, child.name));
    }
    return;
  }
  const data = await driver.readFile(toFilePath(sourcePath));
  await driver.writeFile(toFilePath(destPath), data);
};
var removePath = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid path"));
  await removeRecursiveAbsolute(targetPath);
  return targetPath;
};
var copyPath = async (cwd, source, dest) => {
  const sourcePath = resolveFsPath(cwd, validatePathArg(source, "Invalid source path"));
  const destPath = resolveFsPath(cwd, validatePathArg(dest, "Invalid destination path"));
  await copyRecursiveAbsolute(sourcePath, destPath);
  return { sourcePath, destPath };
};
var movePath = async (cwd, source, dest) => {
  const sourcePath = resolveFsPath(cwd, validatePathArg(source, "Invalid source path"));
  const destPath = resolveFsPath(cwd, validatePathArg(dest, "Invalid destination path"));
  await copyRecursiveAbsolute(sourcePath, destPath);
  await removeRecursiveAbsolute(sourcePath);
  return { sourcePath, destPath };
};
var statPath = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  return { path: targetPath, entry };
};
var buildTree = async (cwd, requested = ".") => {
  const rootPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const root = await driver.stat(toFilePath(rootPath));
  if (!root.isDirectory) {
    throw new Error(`Not a directory: ${requested}`);
  }
  const walk = async (dirPath, name) => {
    const entries = sortEntries(await driver.readdir(toDirectoryPath(dirPath)));
    const children = await Promise.all(
      entries.map(async (entry) => {
        const childPath = joinFsPath(dirPath, entry.name);
        if (!entry.isDirectory) {
          return { name: entry.name, path: childPath, isDirectory: false };
        }
        return walk(childPath, entry.name);
      })
    );
    return {
      name,
      path: dirPath,
      isDirectory: true,
      children
    };
  };
  const rootName = basename(rootPath) || rootPath;
  return walk(rootPath, rootName);
};
var treeText = async (cwd, requested = ".") => {
  const tree = await buildTree(cwd, requested);
  const lines = [`${tree.name}/`];
  const walk = (node, prefix) => {
    const children = node.children ?? [];
    children.forEach((child, index) => {
      const isLast = index === children.length - 1;
      const branch = isLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
      lines.push(`${prefix}${branch}${child.name}${child.isDirectory ? "/" : ""}`);
      if (child.isDirectory) {
        walk(child, `${prefix}${isLast ? "    " : "\u2502   "}`);
      }
    });
  };
  walk(tree, "");
  return lines.join("\n");
};

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/annotations.js
var annotationKey = /* @__PURE__ */ Symbol.for("@optique/core/parser/annotation");

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/message.js
function message(message$1, ...values$1) {
  const messageTerms = [];
  for (let i = 0; i < message$1.length; i++) {
    if (message$1[i] !== "") messageTerms.push({
      type: "text",
      text: message$1[i]
    });
    if (i >= values$1.length) continue;
    const value$1 = values$1[i];
    if (typeof value$1 === "string") messageTerms.push({
      type: "value",
      value: value$1
    });
    else if (Array.isArray(value$1)) messageTerms.push(...value$1);
    else if (typeof value$1 === "object" && value$1 != null && "type" in value$1) messageTerms.push(value$1);
    else throw new TypeError(`Invalid value type in message: ${typeof value$1}.`);
  }
  return messageTerms;
}
function text(text$1) {
  return {
    type: "text",
    text: text$1
  };
}
function optionName(name) {
  return {
    type: "optionName",
    optionName: name
  };
}
function metavar(metavar$1) {
  return {
    type: "metavar",
    metavar: metavar$1
  };
}
function valueSet(values$1, options) {
  if (values$1.length === 0) return [];
  const formatter = new Intl.ListFormat(options?.locale, {
    type: options?.type,
    style: options?.style
  });
  const parts = formatter.formatToParts(values$1);
  const result = [];
  for (const part of parts) if (part.type === "element") result.push({
    type: "value",
    value: part.value
  });
  else result.push({
    type: "text",
    text: part.value
  });
  return result;
}
function formatMessage(msg, options = {}) {
  const colorConfig = options.colors ?? false;
  const useColors = typeof colorConfig === "boolean" ? colorConfig : true;
  const resetSuffix = typeof colorConfig === "object" ? colorConfig.resetSuffix ?? "" : "";
  const useQuotes = options.quotes ?? true;
  const resetSequence = `\x1B[0m${resetSuffix}`;
  function* stream() {
    const wordPattern = /\s*\S+\s*/g;
    for (const term of msg) if (term.type === "text") if (term.text.includes("\n\n")) {
      const paragraphs = term.text.split(/\n\n+/);
      for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        if (paragraphIndex > 0) yield {
          text: "\n",
          width: -1
        };
        const paragraph = paragraphs[paragraphIndex].replace(/\n/g, " ");
        wordPattern.lastIndex = 0;
        while (true) {
          const match = wordPattern.exec(paragraph);
          if (match == null) break;
          yield {
            text: match[0],
            width: match[0].length
          };
        }
      }
    } else {
      const normalizedText = term.text.replace(/\n/g, " ");
      if (normalizedText.trim() === "" && normalizedText.length > 0) yield {
        text: " ",
        width: 1
      };
      else {
        wordPattern.lastIndex = 0;
        while (true) {
          const match = wordPattern.exec(normalizedText);
          if (match == null) break;
          yield {
            text: match[0],
            width: match[0].length
          };
        }
      }
    }
    else if (term.type === "optionName") {
      const name = useQuotes ? `\`${term.optionName}\`` : term.optionName;
      yield {
        text: useColors ? `\x1B[3m${name}${resetSequence}` : name,
        width: name.length
      };
    } else if (term.type === "optionNames") {
      const names = term.optionNames.map((name) => useQuotes ? `\`${name}\`` : name);
      let i = 0;
      for (const name of names) {
        if (i > 0) yield {
          text: "/",
          width: 1
        };
        yield {
          text: useColors ? `\x1B[3m${name}${resetSequence}` : name,
          width: name.length
        };
        i++;
      }
    } else if (term.type === "metavar") {
      const metavar$1 = useQuotes ? `\`${term.metavar}\`` : term.metavar;
      yield {
        text: useColors ? `\x1B[1m${metavar$1}${resetSequence}` : metavar$1,
        width: metavar$1.length
      };
    } else if (term.type === "value") {
      const value$1 = useQuotes ? `${JSON.stringify(term.value)}` : term.value;
      yield {
        text: useColors ? `\x1B[32m${value$1}${resetSequence}` : value$1,
        width: value$1.length
      };
    } else if (term.type === "values") for (let i = 0; i < term.values.length; i++) {
      if (i > 0) yield {
        text: " ",
        width: 1
      };
      const value$1 = useQuotes ? JSON.stringify(term.values[i]) : term.values[i];
      yield {
        text: useColors ? i <= 0 ? `\x1B[32m${value$1}` : i + 1 >= term.values.length ? `${value$1}${resetSequence}` : value$1 : value$1,
        width: value$1.length
      };
    }
    else if (term.type === "envVar") {
      const envVar$1 = useQuotes ? `\`${term.envVar}\`` : term.envVar;
      yield {
        text: useColors ? `\x1B[1;4m${envVar$1}${resetSequence}` : envVar$1,
        width: envVar$1.length
      };
    } else if (term.type === "commandLine") {
      const cmd = useQuotes ? `\`${term.commandLine}\`` : term.commandLine;
      yield {
        text: useColors ? `\x1B[36m${cmd}${resetSequence}` : cmd,
        width: cmd.length
      };
    } else if (term.type === "lineBreak") yield {
      text: "\n",
      width: -1
    };
    else if (term.type === "url") {
      const urlString = term.url.href;
      const displayText = useQuotes ? `<${urlString}>` : urlString;
      if (useColors) {
        const hyperlink = `\x1B]8;;${urlString}\x1B\\${displayText}\x1B]8;;\x1B\\${resetSuffix}`;
        yield {
          text: hyperlink,
          width: displayText.length
        };
      } else yield {
        text: displayText,
        width: displayText.length
      };
    } else throw new TypeError(`Invalid MessageTerm type: ${term["type"]}.`);
  }
  let output = "";
  let totalWidth = 0;
  for (const { text: text$1, width } of stream()) {
    if (width === -1) {
      output += text$1;
      totalWidth = 0;
      continue;
    }
    if (options.maxWidth != null && totalWidth + width > options.maxWidth) {
      output += "\n";
      totalWidth = 0;
    }
    output += text$1;
    totalWidth += width;
  }
  return output;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/dependency.js
var dependencySourceMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencySourceMarker");
var derivedValueParserMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/derivedValueParserMarker");
var dependencyId = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencyId");
var dependencyIds = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencyIds");
var defaultValues = /* @__PURE__ */ Symbol.for("@optique/core/dependency/defaultValues");
var parseWithDependency = /* @__PURE__ */ Symbol.for("@optique/core/dependency/parseWithDependency");
var suggestWithDependency = /* @__PURE__ */ Symbol.for("@optique/core/dependency/suggestWithDependency");
function isDependencySource(parser) {
  return dependencySourceMarker in parser && parser[dependencySourceMarker] === true;
}
function isDerivedValueParser(parser) {
  return derivedValueParserMarker in parser && parser[derivedValueParserMarker] === true;
}
var deferredParseMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/deferredParseMarker");
function isDeferredParseState(value2) {
  return typeof value2 === "object" && value2 !== null && deferredParseMarker in value2 && value2[deferredParseMarker] === true;
}
function getDependencyIds(parser) {
  if (dependencyIds in parser) return parser[dependencyIds];
  return [parser[dependencyId]];
}
function getDefaultValuesFunction(parser) {
  if (defaultValues in parser) return parser[defaultValues];
  return void 0;
}
function createDeferredParseState(rawInput, parser, preliminaryResult) {
  const multipleIds = dependencyIds in parser ? parser[dependencyIds] : void 0;
  const defaultValuesFn = defaultValues in parser ? parser[defaultValues] : void 0;
  const defaultVals = defaultValuesFn ? defaultValuesFn() : void 0;
  return {
    [deferredParseMarker]: true,
    rawInput,
    parser,
    dependencyId: parser[dependencyId],
    dependencyIds: multipleIds,
    defaultValues: defaultVals,
    preliminaryResult
  };
}
var dependencySourceStateMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencySourceStateMarker");
function isDependencySourceState(value2) {
  return typeof value2 === "object" && value2 !== null && dependencySourceStateMarker in value2 && value2[dependencySourceStateMarker] === true;
}
function createDependencySourceState(result, depId) {
  return {
    [dependencySourceStateMarker]: true,
    [dependencyId]: depId,
    result
  };
}
var pendingDependencySourceStateMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/pendingDependencySourceStateMarker");
function isPendingDependencySourceState(value2) {
  return typeof value2 === "object" && value2 !== null && pendingDependencySourceStateMarker in value2 && value2[pendingDependencySourceStateMarker] === true;
}
var wrappedDependencySourceMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/wrappedDependencySourceMarker");
function isWrappedDependencySource(parser) {
  return typeof parser === "object" && parser !== null && wrappedDependencySourceMarker in parser;
}
var DependencyRegistry = class DependencyRegistry2 {
  values = /* @__PURE__ */ new Map();
  /**
  * Registers a resolved dependency value.
  * @param id The dependency ID.
  * @param value The resolved value.
  */
  set(id, value2) {
    this.values.set(id, value2);
  }
  /**
  * Gets a resolved dependency value.
  * @param id The dependency ID.
  * @returns The resolved value, or undefined if not found.
  */
  get(id) {
    return this.values.get(id);
  }
  /**
  * Checks if a dependency has been resolved.
  * @param id The dependency ID.
  * @returns `true` if the dependency has been resolved.
  */
  has(id) {
    return this.values.has(id);
  }
  /**
  * Creates a copy of the registry.
  */
  clone() {
    const copy = new DependencyRegistry2();
    for (const [id, value2] of this.values) copy.values.set(id, value2);
    return copy;
  }
};

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/usage.js
function extractOptionNames(usage) {
  const names = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "option") {
      if (term.hidden) continue;
      for (const name of term.names) names.add(name);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return names;
}
function extractCommandNames(usage) {
  const names = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "command") {
      if (term.hidden) continue;
      names.add(term.name);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return names;
}
function extractArgumentMetavars(usage) {
  const metavars = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "argument") {
      if (term.hidden) continue;
      metavars.add(term.metavar);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return metavars;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/mode-dispatch.js
function dispatchByMode(mode, syncFn, asyncFn) {
  if (mode === "async") return asyncFn();
  return syncFn();
}
function dispatchIterableByMode(mode, syncFn, asyncFn) {
  if (mode === "async") return asyncFn();
  return syncFn();
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/suggestion.js
function levenshteinDistance(source, target) {
  if (source.length === 0) return target.length;
  if (target.length === 0) return source.length;
  if (source.length > target.length) [source, target] = [target, source];
  let previousRow = new Array(source.length + 1);
  let currentRow = new Array(source.length + 1);
  for (let i = 0; i <= source.length; i++) previousRow[i] = i;
  for (let j = 1; j <= target.length; j++) {
    currentRow[0] = j;
    for (let i = 1; i <= source.length; i++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      currentRow[i] = Math.min(currentRow[i - 1] + 1, previousRow[i] + 1, previousRow[i - 1] + cost);
    }
    [previousRow, currentRow] = [currentRow, previousRow];
  }
  return previousRow[source.length];
}
var DEFAULT_FIND_SIMILAR_OPTIONS = {
  maxDistance: 3,
  maxDistanceRatio: 0.5,
  maxSuggestions: 3,
  caseSensitive: false
};
function findSimilar(input, candidates, options = {}) {
  const maxDistance = options.maxDistance ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxDistance;
  const maxDistanceRatio = options.maxDistanceRatio ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxDistanceRatio;
  const maxSuggestions = options.maxSuggestions ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxSuggestions;
  const caseSensitive = options.caseSensitive ?? DEFAULT_FIND_SIMILAR_OPTIONS.caseSensitive;
  if (input.length === 0) return [];
  const normalizedInput = caseSensitive ? input : input.toLowerCase();
  const matches = [];
  for (const candidate of candidates) {
    const normalizedCandidate = caseSensitive ? candidate : candidate.toLowerCase();
    const distance = levenshteinDistance(normalizedInput, normalizedCandidate);
    if (distance === 0) return [candidate];
    const distanceRatio = distance / input.length;
    if (distance <= maxDistance && distanceRatio <= maxDistanceRatio) matches.push({
      candidate,
      distance
    });
  }
  matches.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    const lengthDiffA = Math.abs(a.candidate.length - input.length);
    const lengthDiffB = Math.abs(b.candidate.length - input.length);
    if (lengthDiffA !== lengthDiffB) return lengthDiffA - lengthDiffB;
    return a.candidate.localeCompare(b.candidate);
  });
  return matches.slice(0, maxSuggestions).map((m) => m.candidate);
}
function createSuggestionMessage(suggestions) {
  if (suggestions.length === 0) return [];
  if (suggestions.length === 1) return message`Did you mean ${optionName(suggestions[0])}?`;
  const messageParts = [text("Did you mean one of these?")];
  for (const suggestion of suggestions) {
    messageParts.push(text("\n  "));
    messageParts.push(optionName(suggestion));
  }
  return messageParts;
}
function createErrorWithSuggestions(baseError, invalidInput, usage, type = "both", customFormatter) {
  const candidates = /* @__PURE__ */ new Set();
  if (type === "option" || type === "both") for (const name of extractOptionNames(usage)) candidates.add(name);
  if (type === "command" || type === "both") for (const name of extractCommandNames(usage)) candidates.add(name);
  const suggestions = findSimilar(invalidInput, candidates, DEFAULT_FIND_SIMILAR_OPTIONS);
  const suggestionMsg = customFormatter ? customFormatter(suggestions) : createSuggestionMessage(suggestions);
  return suggestionMsg.length > 0 ? [
    ...baseError,
    text("\n\n"),
    ...suggestionMsg
  ] : baseError;
}
function getSuggestionKey(suggestion) {
  if (suggestion.kind === "literal") return suggestion.text;
  return `__FILE__:${suggestion.type}:${suggestion.extensions?.join(",") ?? ""}:${suggestion.pattern ?? ""}`;
}
function deduplicateSuggestions(suggestions) {
  const seen = /* @__PURE__ */ new Set();
  return suggestions.filter((suggestion) => {
    const key = getSuggestionKey(suggestion);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/constructs.js
function isOptionRequiringValue(usage, token) {
  function traverse(terms) {
    if (!terms || !Array.isArray(terms)) return false;
    for (const term of terms) if (term.type === "option") {
      if (term.metavar && term.names.includes(token)) return true;
    } else if (term.type === "optional" || term.type === "multiple") {
      if (traverse(term.terms)) return true;
    } else if (term.type === "exclusive") {
      for (const exclusiveUsage of term.terms) if (traverse(exclusiveUsage)) return true;
    }
    return false;
  }
  return traverse(usage);
}
function extractRequiredUsage(usage) {
  const required = [];
  for (const term of usage) if (term.type === "optional") continue;
  else if (term.type === "exclusive") {
    const requiredBranches = term.terms.map((branch) => extractRequiredUsage(branch)).filter((branch) => branch.length > 0);
    if (requiredBranches.length > 0) required.push({
      type: "exclusive",
      terms: requiredBranches
    });
  } else if (term.type === "multiple") {
    if (term.min > 0) {
      const requiredTerms = extractRequiredUsage(term.terms);
      if (requiredTerms.length > 0) required.push({
        type: "multiple",
        terms: requiredTerms,
        min: term.min
      });
    }
  } else required.push(term);
  return required;
}
function analyzeNoMatchContext(parsers) {
  const combinedUsage = [{
    type: "exclusive",
    terms: parsers.map((p) => p.usage)
  }];
  const requiredUsage = extractRequiredUsage(combinedUsage);
  return {
    hasOptions: extractOptionNames(requiredUsage).size > 0,
    hasCommands: extractCommandNames(requiredUsage).size > 0,
    hasArguments: extractArgumentMetavars(requiredUsage).size > 0
  };
}
var DuplicateOptionError = class extends Error {
  constructor(optionName$1, sources) {
    const sourceNames = sources.map((s) => typeof s === "symbol" ? s.description ?? s.toString() : s);
    super(`Duplicate option name "${optionName$1}" found in fields: ${sourceNames.join(", ")}. Each option name must be unique within a parser combinator.`);
    this.optionName = optionName$1;
    this.sources = sources;
    this.name = "DuplicateOptionError";
  }
};
function checkDuplicateOptionNames(parserSources) {
  const optionNameSources = /* @__PURE__ */ new Map();
  for (const [source, usage] of parserSources) {
    const names = extractOptionNames(usage);
    for (const name of names) {
      if (!optionNameSources.has(name)) optionNameSources.set(name, []);
      optionNameSources.get(name).push(source);
    }
  }
  for (const [name, sources] of optionNameSources) if (sources.length > 1) throw new DuplicateOptionError(name, sources);
}
function generateNoMatchError(context) {
  const { hasOptions, hasCommands, hasArguments } = context;
  if (hasArguments && !hasOptions && !hasCommands) return message`Missing required argument.`;
  else if (hasCommands && !hasOptions && !hasArguments) return message`No matching command found.`;
  else if (hasOptions && !hasCommands && !hasArguments) return message`No matching option found.`;
  else if (hasCommands && hasOptions && !hasArguments) return message`No matching option or command found.`;
  else if (hasArguments && hasOptions && !hasCommands) return message`No matching option or argument found.`;
  else if (hasArguments && hasCommands && !hasOptions) return message`No matching command or argument found.`;
  else return message`No matching option, command, or argument found.`;
}
function* suggestObjectSync(context, prefix, parserPairs) {
  const registry = context.dependencyRegistry instanceof DependencyRegistry ? context.dependencyRegistry : new DependencyRegistry();
  if (context.state && typeof context.state === "object") collectDependencies(context.state, registry);
  const contextWithRegistry = {
    ...context,
    dependencyRegistry: registry
  };
  if (context.buffer.length > 0) {
    const lastToken = context.buffer[context.buffer.length - 1];
    for (const [field, parser] of parserPairs) if (isOptionRequiringValue(parser.usage, lastToken)) {
      const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
      yield* parser.suggest({
        ...contextWithRegistry,
        state: fieldState
      }, prefix);
      return;
    }
  }
  const suggestions = [];
  for (const [field, parser] of parserPairs) {
    const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
    const fieldSuggestions = parser.suggest({
      ...contextWithRegistry,
      state: fieldState
    }, prefix);
    suggestions.push(...fieldSuggestions);
  }
  yield* deduplicateSuggestions(suggestions);
}
async function* suggestObjectAsync(context, prefix, parserPairs) {
  const registry = context.dependencyRegistry instanceof DependencyRegistry ? context.dependencyRegistry : new DependencyRegistry();
  if (context.state && typeof context.state === "object") collectDependencies(context.state, registry);
  const contextWithRegistry = {
    ...context,
    dependencyRegistry: registry
  };
  if (context.buffer.length > 0) {
    const lastToken = context.buffer[context.buffer.length - 1];
    for (const [field, parser] of parserPairs) if (isOptionRequiringValue(parser.usage, lastToken)) {
      const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
      const suggestions$1 = parser.suggest({
        ...contextWithRegistry,
        state: fieldState
      }, prefix);
      for await (const s of suggestions$1) yield s;
      return;
    }
  }
  const suggestions = [];
  for (const [field, parser] of parserPairs) {
    const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
    const fieldSuggestions = parser.suggest({
      ...contextWithRegistry,
      state: fieldState
    }, prefix);
    for await (const s of fieldSuggestions) suggestions.push(s);
  }
  yield* deduplicateSuggestions(suggestions);
}
function collectDependencies(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return;
  if (typeof state === "object") {
    if (visited.has(state)) return;
    visited.add(state);
  }
  if (isDependencySourceState(state)) {
    const depId = state[dependencyId];
    const result = state.result;
    if (result.success) registry.set(depId, result.value);
    return;
  }
  if (Array.isArray(state)) {
    for (const item of state) collectDependencies(item, registry, visited);
    return;
  }
  if (typeof state === "object" && !isDeferredParseState(state)) for (const key of Reflect.ownKeys(state)) collectDependencies(state[key], registry, visited);
}
function isPlainObject(value2) {
  if (typeof value2 !== "object" || value2 === null) return false;
  const proto = Object.getPrototypeOf(value2);
  return proto === Object.prototype || proto === null;
}
function collectDependencyValues(deferredState, registry) {
  const depIds = deferredState.dependencyIds;
  if (depIds && depIds.length > 0) {
    const defaults = deferredState.defaultValues;
    const dependencyValues = [];
    for (let i = 0; i < depIds.length; i++) {
      const depId$1 = depIds[i];
      if (registry.has(depId$1)) dependencyValues.push(registry.get(depId$1));
      else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
      else return null;
    }
    return dependencyValues;
  }
  const depId = deferredState.dependencyId;
  if (registry.has(depId)) return registry.get(depId);
  return null;
}
function resolveDeferred(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return state;
  if (typeof state === "object") {
    if (visited.has(state)) return state;
    visited.add(state);
  }
  if (isDeferredParseState(state)) {
    const deferredState = state;
    const dependencyValue = collectDependencyValues(deferredState, registry);
    if (dependencyValue === null) return deferredState.preliminaryResult;
    const reParseResult = deferredState.parser[parseWithDependency](deferredState.rawInput, dependencyValue);
    if (reParseResult instanceof Promise) return deferredState.preliminaryResult;
    return reParseResult;
  }
  if (isDependencySourceState(state)) return state;
  if (Array.isArray(state)) return state.map((item) => resolveDeferred(item, registry, visited));
  if (isPlainObject(state)) {
    const resolved = {};
    for (const key of Reflect.ownKeys(state)) resolved[key] = resolveDeferred(state[key], registry, visited);
    return resolved;
  }
  return state;
}
function resolveDeferredParseStates(fieldStates) {
  const registry = new DependencyRegistry();
  collectDependencies(fieldStates, registry);
  return resolveDeferred(fieldStates, registry);
}
async function resolveDeferredAsync(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return state;
  if (typeof state === "object") {
    if (visited.has(state)) return state;
    visited.add(state);
  }
  if (isDeferredParseState(state)) {
    const deferredState = state;
    const dependencyValue = collectDependencyValues(deferredState, registry);
    if (dependencyValue === null) return deferredState.preliminaryResult;
    const reParseResult = deferredState.parser[parseWithDependency](deferredState.rawInput, dependencyValue);
    return Promise.resolve(reParseResult);
  }
  if (isDependencySourceState(state)) return state;
  if (Array.isArray(state)) return Promise.all(state.map((item) => resolveDeferredAsync(item, registry, visited)));
  if (isPlainObject(state)) {
    const resolved = {};
    const keys = Reflect.ownKeys(state);
    await Promise.all(keys.map(async (key) => {
      resolved[key] = await resolveDeferredAsync(state[key], registry, visited);
    }));
    return resolved;
  }
  return state;
}
async function resolveDeferredParseStatesAsync(fieldStates) {
  const registry = new DependencyRegistry();
  collectDependencies(fieldStates, registry);
  return await resolveDeferredAsync(fieldStates, registry);
}
function object(labelOrParsers, maybeParsersOrOptions, maybeOptions) {
  const label = typeof labelOrParsers === "string" ? labelOrParsers : void 0;
  let parsers;
  let options = {};
  if (typeof labelOrParsers === "string") {
    parsers = maybeParsersOrOptions;
    options = maybeOptions ?? {};
  } else {
    parsers = labelOrParsers;
    options = maybeParsersOrOptions ?? {};
  }
  const parserKeys = Reflect.ownKeys(parsers);
  const parserPairs = parserKeys.map((k) => [k, parsers[k]]);
  parserPairs.sort(([_, parserA], [__, parserB]) => parserB.priority - parserA.priority);
  const initialState = {};
  for (const key of parserKeys) initialState[key] = parsers[key].initialState;
  if (!options.allowDuplicates) checkDuplicateOptionNames(parserPairs.map(([field, parser]) => [field, parser.usage]));
  const noMatchContext = analyzeNoMatchContext(parserKeys.map((k) => parsers[k]));
  const combinedMode = parserKeys.some((k) => parsers[k].$mode === "async") ? "async" : "sync";
  const getInitialError = (context) => ({
    consumed: 0,
    error: context.buffer.length > 0 ? (() => {
      const token = context.buffer[0];
      const customMessage = options.errors?.unexpectedInput;
      if (customMessage) return typeof customMessage === "function" ? customMessage(token) : customMessage;
      const baseError = message`Unexpected option or argument: ${token}.`;
      return createErrorWithSuggestions(baseError, token, context.usage, "both", options.errors?.suggestions);
    })() : (() => {
      const customEndOfInput = options.errors?.endOfInput;
      return customEndOfInput ? typeof customEndOfInput === "function" ? customEndOfInput(noMatchContext) : customEndOfInput : generateNoMatchError(noMatchContext);
    })()
  });
  const parseSync2 = (context) => {
    let error = getInitialError(context);
    let currentContext = context;
    let anySuccess = false;
    const allConsumed = [];
    let madeProgress = true;
    while (madeProgress && currentContext.buffer.length > 0) {
      madeProgress = false;
      for (const [field, parser] of parserPairs) {
        const result = parser.parse({
          ...currentContext,
          state: currentContext.state && typeof currentContext.state === "object" && field in currentContext.state ? currentContext.state[field] : parser.initialState
        });
        if (result.success && result.consumed.length > 0) {
          currentContext = {
            ...currentContext,
            buffer: result.next.buffer,
            optionsTerminated: result.next.optionsTerminated,
            state: {
              ...currentContext.state,
              [field]: result.next.state
            }
          };
          allConsumed.push(...result.consumed);
          anySuccess = true;
          madeProgress = true;
          break;
        } else if (!result.success && error.consumed < result.consumed) error = result;
      }
    }
    if (anySuccess) return {
      success: true,
      next: currentContext,
      consumed: allConsumed
    };
    if (context.buffer.length === 0) {
      let allCanComplete = true;
      for (const [field, parser] of parserPairs) {
        const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
        const completeResult = parser.complete(fieldState);
        if (!completeResult.success) {
          allCanComplete = false;
          break;
        }
      }
      if (allCanComplete) return {
        success: true,
        next: context,
        consumed: []
      };
    }
    return {
      ...error,
      success: false
    };
  };
  const parseAsync2 = async (context) => {
    let error = getInitialError(context);
    let currentContext = context;
    let anySuccess = false;
    const allConsumed = [];
    let madeProgress = true;
    while (madeProgress && currentContext.buffer.length > 0) {
      madeProgress = false;
      for (const [field, parser] of parserPairs) {
        const resultOrPromise = parser.parse({
          ...currentContext,
          state: currentContext.state && typeof currentContext.state === "object" && field in currentContext.state ? currentContext.state[field] : parser.initialState
        });
        const result = await resultOrPromise;
        if (result.success && result.consumed.length > 0) {
          currentContext = {
            ...currentContext,
            buffer: result.next.buffer,
            optionsTerminated: result.next.optionsTerminated,
            state: {
              ...currentContext.state,
              [field]: result.next.state
            }
          };
          allConsumed.push(...result.consumed);
          anySuccess = true;
          madeProgress = true;
          break;
        } else if (!result.success && error.consumed < result.consumed) error = result;
      }
    }
    if (anySuccess) return {
      success: true,
      next: currentContext,
      consumed: allConsumed
    };
    if (context.buffer.length === 0) {
      let allCanComplete = true;
      for (const [field, parser] of parserPairs) {
        const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
        const completeResult = await parser.complete(fieldState);
        if (!completeResult.success) {
          allCanComplete = false;
          break;
        }
      }
      if (allCanComplete) return {
        success: true,
        next: context,
        consumed: []
      };
    }
    return {
      ...error,
      success: false
    };
  };
  return {
    $mode: combinedMode,
    $valueType: [],
    $stateType: [],
    priority: Math.max(...parserKeys.map((k) => parsers[k].priority)),
    usage: parserPairs.flatMap(([_, p]) => p.usage),
    initialState,
    parse(context) {
      return dispatchByMode(combinedMode, () => parseSync2(context), () => parseAsync2(context));
    },
    complete(state) {
      return dispatchByMode(combinedMode, () => {
        const preCompletedState = {};
        const preCompletedKeys = /* @__PURE__ */ new Set();
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldState = state[fieldKey];
          const fieldParser = parsers[field];
          if (Array.isArray(fieldState) && fieldState.length === 1 && isPendingDependencySourceState(fieldState[0])) {
            const completed = fieldParser.complete(fieldState);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isPendingDependencySourceState(fieldParser.initialState)) {
            const completed = fieldParser.complete([fieldParser.initialState]);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isWrappedDependencySource(fieldParser)) {
            const pendingState = fieldParser[wrappedDependencySourceMarker];
            const completed = fieldParser.complete([pendingState]);
            if (isDependencySourceState(completed)) {
              preCompletedState[fieldKey] = completed;
              preCompletedKeys.add(fieldKey);
            } else preCompletedState[fieldKey] = fieldState;
          } else preCompletedState[fieldKey] = fieldState;
        }
        const resolvedState = resolveDeferredParseStates(preCompletedState);
        const result = {};
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldResolvedState = resolvedState[fieldKey];
          const fieldParser = parsers[field];
          if (isDependencySourceState(fieldResolvedState) && preCompletedKeys.has(fieldKey)) {
            const depResult = fieldResolvedState.result;
            if (depResult.success) result[fieldKey] = depResult.value;
            else return {
              success: false,
              error: depResult.error
            };
            continue;
          }
          const valueResult = fieldParser.complete(fieldResolvedState);
          if (valueResult.success) result[fieldKey] = valueResult.value;
          else return {
            success: false,
            error: valueResult.error
          };
        }
        return {
          success: true,
          value: result
        };
      }, async () => {
        const preCompletedState = {};
        const preCompletedKeys = /* @__PURE__ */ new Set();
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldState = state[fieldKey];
          const fieldParser = parsers[field];
          if (Array.isArray(fieldState) && fieldState.length === 1 && isPendingDependencySourceState(fieldState[0])) {
            const completed = await fieldParser.complete(fieldState);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isPendingDependencySourceState(fieldParser.initialState)) {
            const completed = await fieldParser.complete([fieldParser.initialState]);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isWrappedDependencySource(fieldParser)) {
            const pendingState = fieldParser[wrappedDependencySourceMarker];
            const completed = await fieldParser.complete([pendingState]);
            if (isDependencySourceState(completed)) {
              preCompletedState[fieldKey] = completed;
              preCompletedKeys.add(fieldKey);
            } else preCompletedState[fieldKey] = fieldState;
          } else preCompletedState[fieldKey] = fieldState;
        }
        const resolvedState = await resolveDeferredParseStatesAsync(preCompletedState);
        const result = {};
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldResolvedState = resolvedState[fieldKey];
          const fieldParser = parsers[field];
          if (isDependencySourceState(fieldResolvedState) && preCompletedKeys.has(fieldKey)) {
            const depResult = fieldResolvedState.result;
            if (depResult.success) result[fieldKey] = depResult.value;
            else return {
              success: false,
              error: depResult.error
            };
            continue;
          }
          const valueResult = await fieldParser.complete(fieldResolvedState);
          if (valueResult.success) result[fieldKey] = valueResult.value;
          else return {
            success: false,
            error: valueResult.error
          };
        }
        return {
          success: true,
          value: result
        };
      });
    },
    suggest(context, prefix) {
      return dispatchIterableByMode(combinedMode, () => {
        const syncParserPairs = parserPairs;
        return suggestObjectSync(context, prefix, syncParserPairs);
      }, () => suggestObjectAsync(context, prefix, parserPairs));
    },
    getDocFragments(state, defaultValue) {
      const fragments = parserPairs.flatMap(([field, p]) => {
        const fieldState = state.kind === "unavailable" ? { kind: "unavailable" } : {
          kind: "available",
          state: state.state[field]
        };
        return p.getDocFragments(fieldState, defaultValue?.[field]).fragments;
      });
      const entries = fragments.filter((d) => d.type === "entry");
      const sections = [];
      for (const fragment of fragments) {
        if (fragment.type !== "section") continue;
        if (fragment.title == null) entries.push(...fragment.entries);
        else sections.push(fragment);
      }
      const section = {
        title: label,
        entries
      };
      sections.push(section);
      return { fragments: sections.map((s) => ({
        ...s,
        type: "section"
      })) };
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/modifiers.js
function parseOptionalStyleSync(context, parser) {
  const innerState = typeof context.state === "undefined" ? parser.initialState : context.state[0];
  const result = parser.parse({
    ...context,
    state: innerState
  });
  return processOptionalStyleResult(result, innerState, context);
}
async function parseOptionalStyleAsync(context, parser) {
  const innerState = typeof context.state === "undefined" ? parser.initialState : context.state[0];
  const result = await parser.parse({
    ...context,
    state: innerState
  });
  return processOptionalStyleResult(result, innerState, context);
}
function processOptionalStyleResult(result, innerState, context) {
  if (result.success) {
    if (result.next.state !== innerState || result.consumed.length === 0) return {
      success: true,
      next: {
        ...result.next,
        state: [result.next.state]
      },
      consumed: result.consumed
    };
    return {
      success: true,
      next: {
        ...result.next,
        state: context.state
      },
      consumed: result.consumed
    };
  }
  if (result.consumed === 0) return {
    success: true,
    next: context,
    consumed: []
  };
  return result;
}
function optional(parser) {
  const syncParser = parser;
  function* suggestSync2(context, prefix) {
    const innerState = typeof context.state === "undefined" ? syncParser.initialState : context.state[0];
    yield* syncParser.suggest({
      ...context,
      state: innerState
    }, prefix);
  }
  async function* suggestAsync2(context, prefix) {
    const innerState = typeof context.state === "undefined" ? syncParser.initialState : context.state[0];
    const suggestions = parser.suggest({
      ...context,
      state: innerState
    }, prefix);
    for await (const s of suggestions) yield s;
  }
  const innerHasWrappedDependency = isWrappedDependencySource(parser);
  const innerHasDirectDependency = isPendingDependencySourceState(syncParser.initialState);
  const wrappedDependencyMarker = innerHasWrappedDependency ? { [wrappedDependencySourceMarker]: parser[wrappedDependencySourceMarker] } : innerHasDirectDependency ? { [wrappedDependencySourceMarker]: syncParser.initialState } : {};
  const hasWrappedDependencySource = wrappedDependencySourceMarker in wrappedDependencyMarker;
  const wrappedPendingState = hasWrappedDependencySource ? wrappedDependencyMarker[wrappedDependencySourceMarker] : void 0;
  return {
    $mode: parser.$mode,
    $valueType: [],
    $stateType: [],
    priority: parser.priority,
    usage: [{
      type: "optional",
      terms: parser.usage
    }],
    initialState: void 0,
    ...wrappedDependencyMarker,
    parse(context) {
      return dispatchByMode(parser.$mode, () => parseOptionalStyleSync(context, syncParser), () => parseOptionalStyleAsync(context, parser));
    },
    complete(state) {
      if (typeof state === "undefined") {
        if (innerHasWrappedDependency && wrappedPendingState) return dispatchByMode(parser.$mode, () => syncParser.complete([wrappedPendingState]), () => parser.complete([wrappedPendingState]));
        return {
          success: true,
          value: void 0
        };
      }
      if (Array.isArray(state) && state.length === 1 && isPendingDependencySourceState(state[0])) {
        if (innerHasWrappedDependency) return dispatchByMode(parser.$mode, () => syncParser.complete(state), () => parser.complete(state));
        return {
          success: true,
          value: void 0
        };
      }
      return dispatchByMode(parser.$mode, () => syncParser.complete(state[0]), () => parser.complete(state[0]));
    },
    suggest(context, prefix) {
      return dispatchIterableByMode(parser.$mode, () => suggestSync2(context, prefix), () => suggestAsync2(context, prefix));
    },
    getDocFragments(state, defaultValue) {
      const innerState = state.kind === "unavailable" ? { kind: "unavailable" } : state.state === void 0 ? { kind: "unavailable" } : {
        kind: "available",
        state: state.state[0]
      };
      return syncParser.getDocFragments(innerState, defaultValue);
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/nonempty.js
function ensureNonEmptyString(value2) {
  if (value2 === "") throw new TypeError("Expected a non-empty string.");
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/valueparser.js
function string(options = {}) {
  const metavar2 = options.metavar ?? "STRING";
  ensureNonEmptyString(metavar2);
  return {
    $mode: "sync",
    metavar: metavar2,
    parse(input) {
      if (options.pattern != null && !options.pattern.test(input)) return {
        success: false,
        error: options.errors?.patternMismatch ? typeof options.errors.patternMismatch === "function" ? options.errors.patternMismatch(input, options.pattern) : options.errors.patternMismatch : message`Expected a string matching pattern ${text(options.pattern.source)}, but got ${input}.`
      };
      return {
        success: true,
        value: input
      };
    },
    format(value2) {
      return value2;
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/primitives.js
function createOptionParseState(rawInput, valueParser, parseResult) {
  if (isDerivedValueParser(valueParser)) return createDeferredParseState(rawInput, valueParser, parseResult);
  if (isDependencySource(valueParser)) return createDependencySourceState(parseResult, valueParser[dependencyId]);
  return parseResult;
}
function* getSuggestionsWithDependency(valueParser, prefix, dependencyRegistry) {
  if (!valueParser.suggest) return;
  if (isDerivedValueParser(valueParser) && suggestWithDependency in valueParser) {
    const derived = valueParser;
    const suggestWithDep = derived[suggestWithDependency];
    if (suggestWithDep && dependencyRegistry) {
      const depIds = getDependencyIds(derived);
      const defaultsFn = getDefaultValuesFunction(derived);
      const defaults = defaultsFn?.();
      const dependencyValues = [];
      let hasAnyValue = false;
      for (let i = 0; i < depIds.length; i++) {
        const depId = depIds[i];
        if (dependencyRegistry.has(depId)) {
          dependencyValues.push(dependencyRegistry.get(depId));
          hasAnyValue = true;
        } else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
        else {
          yield* valueParser.suggest(prefix);
          return;
        }
      }
      if (hasAnyValue) {
        const depValue = depIds.length === 1 ? dependencyValues[0] : dependencyValues;
        yield* suggestWithDep(prefix, depValue);
        return;
      }
    }
  }
  yield* valueParser.suggest(prefix);
}
async function* getSuggestionsWithDependencyAsync(valueParser, prefix, dependencyRegistry) {
  if (!valueParser.suggest) return;
  if (isDerivedValueParser(valueParser) && suggestWithDependency in valueParser) {
    const derived = valueParser;
    const suggestWithDep = derived[suggestWithDependency];
    if (suggestWithDep && dependencyRegistry) {
      const depIds = getDependencyIds(derived);
      const defaultsFn = getDefaultValuesFunction(derived);
      const defaults = defaultsFn?.();
      const dependencyValues = [];
      let hasAnyValue = false;
      for (let i = 0; i < depIds.length; i++) {
        const depId = depIds[i];
        if (dependencyRegistry.has(depId)) {
          dependencyValues.push(dependencyRegistry.get(depId));
          hasAnyValue = true;
        } else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
        else {
          for await (const suggestion of valueParser.suggest(prefix)) yield suggestion;
          return;
        }
      }
      if (hasAnyValue) {
        const depValue = depIds.length === 1 ? dependencyValues[0] : dependencyValues;
        for await (const suggestion of suggestWithDep(prefix, depValue)) yield suggestion;
        return;
      }
    }
  }
  for await (const suggestion of valueParser.suggest(prefix)) yield suggestion;
}
function* suggestArgumentSync(valueParser, hidden, prefix, dependencyRegistry) {
  if (hidden) return;
  if (valueParser.suggest) yield* getSuggestionsWithDependency(valueParser, prefix, dependencyRegistry);
}
async function* suggestArgumentAsync(valueParser, hidden, prefix, dependencyRegistry) {
  if (hidden) return;
  if (valueParser.suggest) yield* getSuggestionsWithDependencyAsync(valueParser, prefix, dependencyRegistry);
}
function argument(valueParser, options = {}) {
  const isAsync = valueParser.$mode === "async";
  const optionPattern = /^--?[a-z0-9-]+$/i;
  const term = {
    type: "argument",
    metavar: valueParser.metavar,
    ...options.hidden && { hidden: true }
  };
  const result = {
    $mode: valueParser.$mode,
    $valueType: [],
    $stateType: [],
    priority: 5,
    usage: [term],
    initialState: void 0,
    parse(context) {
      if (context.buffer.length < 1) return {
        success: false,
        consumed: 0,
        error: options.errors?.endOfInput ?? message`Expected an argument, but got end of input.`
      };
      let i = 0;
      let optionsTerminated = context.optionsTerminated;
      if (!optionsTerminated) {
        if (context.buffer[i] === "--") {
          optionsTerminated = true;
          i++;
        } else if (context.buffer[i].match(optionPattern)) return {
          success: false,
          consumed: i,
          error: message`Expected an argument, but got an option: ${optionName(context.buffer[i])}.`
        };
      }
      if (context.buffer.length < i + 1) return {
        success: false,
        consumed: i,
        error: message`Expected an argument, but got end of input.`
      };
      if (context.state != null) return {
        success: false,
        consumed: i,
        error: options.errors?.multiple ? typeof options.errors.multiple === "function" ? options.errors.multiple(valueParser.metavar) : options.errors.multiple : message`The argument ${metavar(valueParser.metavar)} cannot be used multiple times.`
      };
      const rawInput = context.buffer[i];
      const parseResultOrPromise = valueParser.parse(rawInput);
      if (isAsync) return parseResultOrPromise.then((parseResult) => ({
        success: true,
        next: {
          ...context,
          buffer: context.buffer.slice(i + 1),
          state: createOptionParseState(rawInput, valueParser, parseResult),
          optionsTerminated
        },
        consumed: context.buffer.slice(0, i + 1)
      }));
      return {
        success: true,
        next: {
          ...context,
          buffer: context.buffer.slice(i + 1),
          state: createOptionParseState(rawInput, valueParser, parseResultOrPromise),
          optionsTerminated
        },
        consumed: context.buffer.slice(0, i + 1)
      };
    },
    complete(state) {
      if (state == null) return {
        success: false,
        error: options.errors?.endOfInput ?? message`Expected a ${metavar(valueParser.metavar)}, but too few arguments.`
      };
      if (isDeferredParseState(state)) {
        const preliminaryResult = state.preliminaryResult;
        if (preliminaryResult.success) return preliminaryResult;
        return {
          success: false,
          error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(preliminaryResult.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${preliminaryResult.error}`
        };
      }
      if (isDependencySourceState(state)) {
        const result$1 = state.result;
        if (result$1.success) return result$1;
        return {
          success: false,
          error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(result$1.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${result$1.error}`
        };
      }
      if (state.success) return state;
      return {
        success: false,
        error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(state.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${state.error}`
      };
    },
    suggest(context, prefix) {
      if (isAsync) return suggestArgumentAsync(valueParser, options.hidden ?? false, prefix, context.dependencyRegistry);
      return suggestArgumentSync(valueParser, options.hidden ?? false, prefix, context.dependencyRegistry);
    },
    getDocFragments(_state, defaultValue) {
      if (options.hidden) return {
        fragments: [],
        description: options.description
      };
      const choicesMessage = valueParser.choices != null && valueParser.choices.length > 0 ? valueSet(valueParser.choices.map((c) => valueParser.format(c)), { type: "unit" }) : void 0;
      const fragments = [{
        type: "entry",
        term,
        description: options.description,
        default: defaultValue == null ? void 0 : message`${valueParser.format(defaultValue)}`,
        choices: choicesMessage
      }];
      return {
        fragments,
        description: options.description
      };
    },
    [/* @__PURE__ */ Symbol.for("Deno.customInspect")]() {
      return `argument()`;
    }
  };
  return result;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/parser.js
function parseSync(parser, args, options) {
  let initialState = parser.initialState;
  if (options?.annotations) initialState = {
    ...typeof initialState === "object" && initialState !== null ? initialState : {},
    [annotationKey]: options.annotations
  };
  let context = {
    buffer: args,
    optionsTerminated: false,
    state: initialState,
    usage: parser.usage
  };
  do {
    const result = parser.parse(context);
    if (!result.success) return {
      success: false,
      error: result.error
    };
    const previousBuffer = context.buffer;
    context = result.next;
    if (context.buffer.length > 0 && context.buffer.length === previousBuffer.length && context.buffer.every((item, i) => item === previousBuffer[i])) return {
      success: false,
      error: message`Unexpected option or argument: ${context.buffer[0]}.`
    };
  } while (context.buffer.length > 0);
  const endResult = parser.complete(context.state);
  return endResult.success ? {
    success: true,
    value: endResult.value
  } : {
    success: false,
    error: endResult.error
  };
}
async function parseAsync(parser, args, options) {
  let initialState = parser.initialState;
  if (options?.annotations) initialState = {
    ...typeof initialState === "object" && initialState !== null ? initialState : {},
    [annotationKey]: options.annotations
  };
  let context = {
    buffer: args,
    optionsTerminated: false,
    state: initialState,
    usage: parser.usage
  };
  do {
    const result = await parser.parse(context);
    if (!result.success) return {
      success: false,
      error: result.error
    };
    const previousBuffer = context.buffer;
    context = result.next;
    if (context.buffer.length > 0 && context.buffer.length === previousBuffer.length && context.buffer.every((item, i) => item === previousBuffer[i])) return {
      success: false,
      error: message`Unexpected option or argument: ${context.buffer[0]}.`
    };
  } while (context.buffer.length > 0);
  const endResult = await parser.complete(context.state);
  return endResult.success ? {
    success: true,
    value: endResult.value
  } : {
    success: false,
    error: endResult.error
  };
}
function parse(parser, args, options) {
  if (parser.$mode === "async") return parseAsync(parser, args, options);
  return parseSync(parser, args, options);
}

// packages/cli-shell/src/lib/filesystem-args.parser.ts
var cpParser = object({
  source: argument(string()),
  dest: argument(string())
});
var cdParser = object({
  path: argument(string())
});
var lsParser = object({
  path: optional(argument(string()))
});
var treeParser = object({
  path: optional(argument(string()))
});
var statParser = object({
  path: argument(string())
});
var catParser = object({
  file: argument(string())
});
var touchParser = object({
  file: argument(string())
});
var mkdirParser = object({
  path: argument(string())
});
var rmParser = object({
  path: argument(string())
});
var mvParser = object({
  source: argument(string()),
  dest: argument(string())
});
var zodErrorToMessage = (error) => error.issues.map((issue) => issue.message).join("; ");
var parseWithSchema = (parser, args, schema, mapValue) => {
  const result = parse(parser, args);
  if (!result.success) {
    return { success: false, error: formatMessage(result.error) };
  }
  const input = mapValue ? mapValue(result.value) : result.value;
  const validated = schema.safeParse(input);
  if (!validated.success) {
    return { success: false, error: zodErrorToMessage(validated.error) };
  }
  return { success: true, value: validated.data };
};
var parseCpArgs = (args) => parseWithSchema(cpParser, args, CpArgsSchema);
var parseCdArgs = (args) => parseWithSchema(cdParser, args, CdArgsSchema);
var parseLsArgs = (args) => parseWithSchema(lsParser, args, LsArgsSchema);
var parseTreeArgs = (args) => parseWithSchema(treeParser, args, TreeArgsSchema);
var parseStatArgs = (args) => parseWithSchema(statParser, args, StatArgsSchema);
var parseCatArgs = (args) => parseWithSchema(catParser, args, CatArgsSchema);
var parseTouchArgs = (args) => parseWithSchema(touchParser, args, TouchArgsSchema);
var parseMkdirArgs = (args) => parseWithSchema(mkdirParser, args, MkdirArgsSchema);
var parseRmArgs = (args) => parseWithSchema(rmParser, args, RmArgsSchema);
var parseMvArgs = (args) => parseWithSchema(mvParser, args, MvArgsSchema);

// packages/cli-shell/src/commands/_util.tsx
import { Box, Text } from "ink";
import "react";
import { jsx } from "react/jsx-runtime";
var makeOutput = (text2) => ({
  component: /* @__PURE__ */ jsx(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ jsx(Text, { children: text2 }) })
});
var makeError = (message2) => ({
  component: /* @__PURE__ */ jsx(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ jsx(Text, { color: "red", children: message2 }) }),
  error: message2
});
var makeResult = (text2, data) => ({
  component: /* @__PURE__ */ jsx(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ jsx(Text, { children: text2 }) }),
  data,
  status: "ok"
});
var makeResultError = (message2, data) => ({
  component: /* @__PURE__ */ jsx(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ jsx(Text, { color: "red", children: message2 }) }),
  error: message2,
  data,
  status: "error"
});
var mergeCommands = (...groups) => {
  const merged = {};
  for (const group2 of groups) {
    for (const [name, handler] of Object.entries(group2)) {
      if (name in merged) {
        throw new Error(`Duplicate command registration: "${name}"`);
      }
      merged[name] = handler;
    }
  }
  return merged;
};

// packages/cli-shell/src/commands/filesystem.ts
var filesystemCommands = {
  pwd: async (_args, options) => {
    const cwd = options?.cwd ?? getDefaultCwd();
    return makeOutput(cwd);
  },
  cd: async (args, options) => {
    const parsed = parseCdArgs(args);
    if (!parsed.success) return makeError(`Usage: cd <path>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const targetPath = await changeDir(cwd, parsed.value.path);
      options?.setCwd?.(targetPath);
      return makeOutput(targetPath);
    } catch (err) {
      return makeError(String(err.message ?? `Directory not found: ${parsed.value.path}`));
    }
  },
  ls: async (args, options) => {
    const parsed = parseLsArgs(args);
    if (!parsed.success) return makeError(`Usage: ls [path]
${parsed.error}`);
    const requested = parsed.value.path ?? ".";
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const entries = await listDirectory(cwd, requested);
      const output = entries.length === 0 ? "(empty)" : entries.map((entry) => entry.isDirectory ? `${entry.name}/` : entry.name).join("\n");
      return makeOutput(output);
    } catch {
      return makeError(`Cannot list directory: ${requested}`);
    }
  },
  tree: async (args, options) => {
    const parsed = parseTreeArgs(args);
    if (!parsed.success) return makeError(`Usage: tree [path]
${parsed.error}`);
    const requested = parsed.value.path ?? ".";
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await treeText(cwd, requested));
    } catch {
      return makeError(`Cannot read directory: ${requested}`);
    }
  },
  stat: async (args, options) => {
    const parsed = parseStatArgs(args);
    if (!parsed.success) return makeError(`Usage: stat <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { path: path3, entry } = await statPath(cwd, requested);
      const mtime = entry.mtime ? entry.mtime.toISOString() : "unknown";
      const lines = [
        `Path: ${path3}`,
        `Name: ${entry.name}`,
        `Type: ${entry.isDirectory ? "directory" : "file"}`,
        `Size: ${entry.size} bytes`,
        `Modified: ${mtime}`
      ];
      return makeOutput(lines.join("\n"));
    } catch {
      return makeError(`Path not found: ${requested}`);
    }
  },
  cat: async (args, options) => {
    const parsed = parseCatArgs(args);
    if (!parsed.success) return makeError(`Usage: cat <file>
${parsed.error}`);
    const requested = parsed.value.file;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await readTextFile(cwd, requested));
    } catch {
      return makeError(`Cannot read file: ${requested}`);
    }
  },
  touch: async (args, options) => {
    const parsed = parseTouchArgs(args);
    if (!parsed.success) return makeError(`Usage: touch <file>
${parsed.error}`);
    const requested = parsed.value.file;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await touchFile(cwd, requested));
    } catch {
      return makeError(`Cannot touch file: ${requested}`);
    }
  },
  mkdir: async (args, options) => {
    const parsed = parseMkdirArgs(args);
    if (!parsed.success) return makeError(`Usage: mkdir <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await makeDirectory(cwd, requested));
    } catch {
      return makeError(`Cannot create directory: ${requested}`);
    }
  },
  cp: async (args, options) => {
    const parsed = parseCpArgs(args);
    if (!parsed.success) return makeError(`Usage: cp <source> <dest>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { sourcePath, destPath } = await copyPath(cwd, parsed.value.source, parsed.value.dest);
      return makeOutput(`${sourcePath} -> ${destPath}`);
    } catch {
      return makeError(`Cannot copy: ${parsed.value.source} -> ${parsed.value.dest}`);
    }
  },
  mv: async (args, options) => {
    const parsed = parseMvArgs(args);
    if (!parsed.success) return makeError(`Usage: mv <source> <dest>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { sourcePath, destPath } = await movePath(cwd, parsed.value.source, parsed.value.dest);
      return makeOutput(`${sourcePath} -> ${destPath}`);
    } catch {
      return makeError(`Cannot move: ${parsed.value.source} -> ${parsed.value.dest}`);
    }
  },
  rm: async (args, options) => {
    const parsed = parseRmArgs(args);
    if (!parsed.success) return makeError(`Usage: rm <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await removePath(cwd, requested));
    } catch {
      return makeError(`Cannot remove: ${requested}`);
    }
  }
};

// packages/cli-shell/src/commands/system.ts
var systemCommands = {
  clear: async (_args, options) => {
    options?.clearScreen?.();
    return makeOutput("");
  },
  backend: async () => {
    const info = await getFilesystemBackendInfo2();
    const lines = [`Platform: ${info.platform}`, `Adapter: ${info.adapter}`];
    if (info.persistence) lines.push(`Persistence: ${info.persistence}`);
    if (info.baseDir) lines.push(`Base directory: ${info.baseDir}`);
    return makeOutput(lines.join("\n"));
  },
  exit: async (_args, options) => {
    if (!options?.exit) return makeError("exit is only available in terminal interactive mode");
    options.exit();
    return makeOutput("Exiting...");
  },
  help: async (_args, options) => {
    if (!options?.createProgram) {
      return makeOutput("No program registered. Pass createProgram when setting up the shell.");
    }
    const program = options.createProgram();
    const lines = [];
    lines.push(`Usage: ${program.name()} [options] [command]`);
    lines.push("");
    lines.push(program.description());
    lines.push("");
    lines.push("Commands:");
    for (const cmd of program.commands) {
      const args = cmd.registeredArguments?.map((a) => a.required ? `<${a.name()}>` : `[${a.name()}]`).join(" ") ?? "";
      lines.push(`  ${(cmd.name() + " " + args).trim().padEnd(20)} ${cmd.description()}`);
    }
    return makeOutput(lines.join("\n"));
  }
};

// packages/cli-shell/src/commands/app.ts
var appCommands = {
  "app-config": async (_args, options) => {
    if (!options?.config) {
      return makeOutput("App config is not available in this runtime context.");
    }
    const { config } = options;
    return makeOutput(
      [
        `appId: ${config.appId}`,
        `appName: ${config.appName}`,
        `storageKey: ${config.storageKey}`,
        `podNamespace: ${config.podNamespace}`,
        `socialLocalPath: ${config.socialLocalPath}`,
        `sync.social.pollIntervalMs: ${config.sync.social.pollIntervalMs}`,
        `sync.social.outboundDebounceMs: ${config.sync.social.outboundDebounceMs}`,
        `sync.files.pollIntervalMs: ${config.sync.files.pollIntervalMs}`,
        `sync.files.outboundDebounceMs: ${config.sync.files.outboundDebounceMs}`,
        `sync.files.maxFileSizeBytes: ${config.sync.files.maxFileSizeBytes}`,
        `features.socialSync: ${config.features.socialSync}`,
        `features.fileSync: ${config.features.fileSync}`,
        `features.fileSharing: ${config.features.fileSharing}`
      ].join("\n")
    );
  }
};

// packages/cli-shell/src/components/InteractiveShell.tsx
import { useMemo as useMemo8, useState as useState11 } from "react";
import { Box as Box7, Text as Text8 } from "ink";

// packages/ui/src/primitives/text-input.tsx
import { useEffect, useState } from "react";
import { Text as Text2, useInput } from "ink";
import { jsx as jsx2 } from "react/jsx-runtime";
var TextInput = ({
  value: value2,
  defaultValue,
  onChange,
  onSubmit,
  placeholder,
  isDisabled
}) => {
  const [internalValue, setInternalValue] = useState(value2 ?? defaultValue ?? "");
  const controlled = typeof value2 === "string";
  const renderedValue = controlled ? value2 : internalValue;
  useEffect(() => {
    if (controlled) setInternalValue(value2);
  }, [controlled, value2]);
  useInput((input, key) => {
    if (isDisabled) return;
    if (key.return) {
      onSubmit?.(renderedValue ?? "");
      return;
    }
    if (key.backspace || key.delete) {
      const next = (renderedValue ?? "").slice(0, -1);
      if (!controlled) setInternalValue(next);
      onChange(next);
      return;
    }
    if (input && !key.ctrl && !key.meta) {
      const next = `${renderedValue ?? ""}${input}`;
      if (!controlled) setInternalValue(next);
      onChange(next);
    }
  });
  const display = renderedValue && renderedValue.length > 0 ? renderedValue : placeholder ?? "";
  const dimColor = !renderedValue || renderedValue.length === 0;
  return /* @__PURE__ */ jsx2(Text2, { dimColor, children: display });
};

// packages/ui/src/primitives/spinner.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { Text as Text3 } from "ink";
import { jsx as jsx3 } from "react/jsx-runtime";

// packages/ui/src/primitives/select.tsx
import React4 from "react";
import { Box as Box2, Text as Text4, useInput as useInput2 } from "ink";
import { jsx as jsx4, jsxs } from "react/jsx-runtime";

// packages/ui/src/primitives/tree-view.tsx
import "react";
import { Box as Box3, Text as Text5 } from "ink";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";

// packages/ui/src/primitives/status-bar.tsx
import "react";
import { Box as Box4, Text as Text6 } from "ink";
import { jsx as jsx6 } from "react/jsx-runtime";

// packages/ui/src/primitives/scroll-area.tsx
import "react";
import { Box as Box5 } from "ink";
import { jsx as jsx7 } from "react/jsx-runtime";

// packages/ui/src/shell/shell-context.tsx
import { createContext, useContext } from "react";
var ShellContext = createContext(null);

// packages/ui/src/shell/browser-shell-provider.tsx
import { useMemo, useState as useState3 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var BrowserShellProvider = ({ children }) => {
  const [isCommandRunning, setIsCommandRunning] = useState3(false);
  const value2 = useMemo(
    () => ({
      isCommandRunning,
      startCommand: () => setIsCommandRunning(true),
      endCommand: () => setIsCommandRunning(false)
    }),
    [isCommandRunning]
  );
  return /* @__PURE__ */ jsx8(ShellContext.Provider, { value: value2, children });
};

// packages/ui/src/shell/terminal-shell-provider.tsx
import { useMemo as useMemo2, useState as useState4 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var TerminalShellProvider = ({ children }) => {
  const [isCommandRunning, setIsCommandRunning] = useState4(false);
  const value2 = useMemo2(
    () => ({
      isCommandRunning,
      startCommand: () => setIsCommandRunning(true),
      endCommand: () => setIsCommandRunning(false)
    }),
    [isCommandRunning]
  );
  return /* @__PURE__ */ jsx9(ShellContext.Provider, { value: value2, children });
};

// packages/ui/src/shell/interactive-shell.tsx
import "react";
import { Box as Box6, Text as Text7 } from "ink";
import { jsx as jsx10, jsxs as jsxs3 } from "react/jsx-runtime";

// packages/ui/src/hooks/use-keyboard.ts
import { useInput as useInput3 } from "ink";

// packages/ui/src/file-handlers/registry.ts
var exactHandlers = /* @__PURE__ */ new Map();
var wildcardHandlers = /* @__PURE__ */ new Map();
var normalizePattern = (pattern) => pattern.trim().toLowerCase();
var isWildcardPattern = (pattern) => pattern.endsWith("/*");
var wildcardPrefix = (pattern) => pattern.slice(0, pattern.length - 2);
var registerMimeTypeHandler = (pattern, handler) => {
  const normalized = normalizePattern(pattern);
  if (!normalized.includes("/")) {
    throw new Error(`Invalid MIME type pattern: ${pattern}`);
  }
  if (isWildcardPattern(normalized)) {
    wildcardHandlers.set(wildcardPrefix(normalized), handler);
    return;
  }
  exactHandlers.set(normalized, handler);
};

// packages/ui/src/file-handlers/image-file-preview.tsx
import { useEffect as useEffect3, useMemo as useMemo3, useState as useState5 } from "react";
import { jsx as jsx11, jsxs as jsxs4 } from "react/jsx-runtime";

// packages/ui/src/file-handlers/markdown-edit.tsx
import { useEffect as useEffect4, useMemo as useMemo4, useState as useState6 } from "react";
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";

// packages/ui/src/file-handlers/markdown-view.tsx
import { useMemo as useMemo5 } from "react";
import { jsx as jsx13 } from "react/jsx-runtime";

// packages/ui/src/file-handlers/markdown-view-edit.tsx
import { useEffect as useEffect5, useMemo as useMemo6, useState as useState7 } from "react";
import { jsx as jsx14, jsxs as jsxs6 } from "react/jsx-runtime";

// packages/ui/src/file-handlers/text-file-view-edit.tsx
import { useEffect as useEffect6, useMemo as useMemo7, useState as useState8 } from "react";
import { jsx as jsx15, jsxs as jsxs7 } from "react/jsx-runtime";

// packages/state/src/store.ts
var createDevalboStore = () => {
  const store = createStore();
  store.setTablesSchema({
    entries: {
      path: { type: "string" },
      name: { type: "string" },
      parentPath: { type: "string" },
      isDirectory: { type: "boolean" },
      size: { type: "number" },
      mtime: { type: "string" }
    },
    buffers: {
      path: { type: "string" },
      content: { type: "string" },
      isDirty: { type: "boolean" },
      cursorLine: { type: "number" },
      cursorCol: { type: "number" }
    },
    sync_roots: {
      label: { type: "string" },
      localPath: { type: "string" },
      podUrl: { type: "string" },
      webId: { type: "string" },
      readonly: { type: "boolean" },
      enabled: { type: "boolean" }
    },
    file_sync_state: {
      path: { type: "string" },
      syncRootId: { type: "string" },
      podEtag: { type: "string" },
      contentHash: { type: "string" },
      status: { type: "string" }
    }
  });
  return store;
};

// packages/state/src/hooks/use-store.ts
import { createContext as createContext2, useContext as useContext2 } from "react";
var StoreContext = createContext2(null);

// packages/state/src/hooks/use-table.ts
import { useEffect as useEffect7, useState as useState9 } from "react";

// packages/state/src/hooks/use-row.ts
import { useEffect as useEffect8, useState as useState10 } from "react";

// packages/state/src/hooks/use-app-config.tsx
import { createContext as createContext3, useContext as useContext3 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var AppConfigContext = createContext3(null);
var AppConfigProvider = ({ config, children }) => /* @__PURE__ */ jsx16(AppConfigContext.Provider, { value: config, children });
var useAppConfig = () => {
  const ctx = useContext3(AppConfigContext);
  if (!ctx) throw new Error("useAppConfig must be used inside AppConfigProvider");
  return ctx;
};

// packages/commands/src/parser.ts
var splitInput = (input) => {
  if (Array.isArray(input)) {
    return input.map((value2) => value2.trim()).filter((value2) => value2.length > 0);
  }
  return input.trim().split(/\s+/).filter((value2) => value2.length > 0);
};
var parseCommand = (input) => {
  const parts = splitInput(input);
  const first = parts[0];
  return {
    fullName: first ?? "",
    path: first ? [first] : [],
    name: first ?? "",
    args: parts.slice(1)
  };
};

// packages/commands/src/validation.ts
var withValidation = (validate, onSuccess, onMissingArg) => {
  return Effect_exports.runSync(
    Effect_exports.matchEffect(validate, {
      onFailure: (error) => Effect_exports.succeed({ component: onMissingArg(error), error: error.message }),
      onSuccess: (value2) => Effect_exports.succeed({ component: onSuccess(value2) })
    })
  );
};

// packages/cli-shell/src/lib/command-runtime.ts
var parseCommandLine = (raw) => {
  const { name, args } = parseCommand(raw);
  return { commandName: name, args };
};
var notReady = () => makeError("CLI not ready");
var buildCommandOptions = (ctx) => ({
  store: ctx.store,
  cwd: ctx.cwd,
  setCwd: ctx.setCwd,
  ...ctx.session !== void 0 ? { session: ctx.session } : {},
  ...ctx.config !== void 0 ? { config: ctx.config } : {},
  ...ctx.driver ? { driver: ctx.driver } : {},
  ...ctx.connectivity ? { connectivity: ctx.connectivity } : {},
  ...ctx.clearScreen ? { clearScreen: ctx.clearScreen } : {},
  ...ctx.exit ? { exit: ctx.exit } : {},
  ...ctx.createProgram ? { createProgram: ctx.createProgram } : {}
});
var executeCommand = async (commandName, args, ctx) => {
  if (!ctx) return notReady();
  const command2 = ctx.commands[commandName];
  if (!command2) {
    return makeError(`Command not found: ${commandName}`);
  }
  try {
    return await command2(args, buildCommandOptions(ctx));
  } catch (error) {
    const message2 = error instanceof Error ? error.message : String(error);
    return makeError(message2);
  }
};
var executeCommandRaw = async (raw, ctx) => {
  if (!ctx) return notReady();
  const { commandName, args } = parseCommandLine(raw);
  if (!commandName) return makeOutput("");
  return executeCommand(commandName, args, ctx);
};

// packages/cli-shell/src/context/ShellRuntimeContext.tsx
import { createContext as createContext4, useContext as useContext4, useEffect as useEffect9, useRef } from "react";

// packages/cli-shell/src/web/console-helpers.ts
var runtimeSource = null;
var bindCliRuntimeSource = (source) => {
  runtimeSource = source;
};
var unbindCliRuntimeSource = () => {
  runtimeSource = null;
};
var getCliRuntimeStatus = () => {
  if (!runtimeSource) return { ready: false, missing: ["runtimeSource"] };
  const ctx = runtimeSource.getContext();
  if (!ctx) return { ready: false, missing: ["runtimeContext"] };
  return { ready: true, missing: [] };
};
function extractText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = node.props;
    if (props?.children) return extractText(props.children);
  }
  return "";
}
var withCwdOverride = (ctx, cwdOverride) => {
  if (!cwdOverride) return ctx;
  return { ...ctx, cwd: cwdOverride };
};
var getContextOrThrow = (cwdOverride) => {
  const status = getCliRuntimeStatus();
  if (!status.ready || !runtimeSource) {
    throw new Error(`CLI not ready: ${status.missing.join(", ") || "unknown"}`);
  }
  const ctx = runtimeSource.getContext();
  if (!ctx) {
    throw new Error("CLI not ready: runtimeContext");
  }
  return withCwdOverride(ctx, cwdOverride);
};
var unwrapOrThrow = (result) => {
  if (result.error) throw new Error(result.error);
  return result;
};
async function exec(commandName, args = [], cwdOverride) {
  const ctx = getContextOrThrow(cwdOverride);
  const result = await executeCommand(commandName, args, ctx);
  const commandResult = unwrapOrThrow(result);
  const text2 = extractText(commandResult.component);
  if (text2) {
    console.log(`
${text2}
`);
  }
  return commandResult;
}
async function execRaw(raw, cwdOverride) {
  const ctx = getContextOrThrow(cwdOverride);
  const result = await executeCommandRaw(raw, ctx);
  const commandResult = unwrapOrThrow(result);
  const text2 = extractText(commandResult.component);
  if (text2) {
    console.log(`
${text2}
`);
  }
  return commandResult;
}
async function execText(commandName, args = [], cwdOverride) {
  try {
    const result = await exec(commandName, args, cwdOverride);
    return {
      text: extractText(result.component),
      error: result.error ?? null
    };
  } catch (error) {
    return {
      text: "",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
var cli = {
  exec,
  execRaw,
  execText,
  status: getCliRuntimeStatus,
  pwd: () => exec("pwd"),
  cd: (target) => exec("cd", [target]),
  ls: (target = ".") => exec("ls", [target]),
  tree: (target = ".") => exec("tree", [target]),
  stat: (target) => exec("stat", [target]),
  clear: () => exec("clear"),
  cat: (target) => exec("cat", [target]),
  touch: (target) => exec("touch", [target]),
  mkdir: (target) => exec("mkdir", [target]),
  cp: (source, dest) => exec("cp", [source, dest]),
  mv: (source, dest) => exec("mv", [source, dest]),
  rm: (target) => exec("rm", [target]),
  backend: () => exec("backend"),
  export: (target = ".", output) => exec("export", output ? [target, output] : [target]),
  import: (locationOrBftFile, location) => exec("import", location ? [locationOrBftFile ?? "", location] : locationOrBftFile ? [locationOrBftFile] : []),
  exit: () => exec("exit"),
  help: () => exec("help"),
  helpText: async () => (await execText("help")).text
};

// packages/cli-shell/src/context/ShellRuntimeContext.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var ShellRuntimeContext = createContext4(null);
function useShellRuntime() {
  return useContext4(ShellRuntimeContext);
}
function ShellRuntimeProvider({
  value: value2,
  bindToCli = true,
  children
}) {
  const valueRef = useRef(value2);
  valueRef.current = value2;
  useEffect9(() => {
    if (!bindToCli) return;
    bindCliRuntimeSource({
      getContext: () => valueRef.current
    });
    return () => unbindCliRuntimeSource();
  }, [bindToCli]);
  return /* @__PURE__ */ jsx17(ShellRuntimeContext.Provider, { value: value2, children });
}

// packages/cli-shell/src/components/InteractiveShell.tsx
import { jsx as jsx18, jsxs as jsxs8 } from "react/jsx-runtime";
function ShellContent({
  commands,
  createProgram,
  runtime,
  store,
  config,
  driver,
  cwd,
  setCwd,
  session,
  connectivity: connectivityProp,
  welcomeMessage
}) {
  const [connectivityFallback] = useState11(() => new BrowserConnectivityService());
  const connectivity = connectivityProp ?? connectivityFallback;
  const [input, setInput] = useState11("");
  const [inputKey, setInputKey] = useState11(0);
  const [history, setHistory] = useState11([
    {
      component: typeof welcomeMessage === "string" ? /* @__PURE__ */ jsx18(Text8, { color: "cyan", children: welcomeMessage }) : welcomeMessage
    }
  ]);
  const executeCommand2 = async (raw) => {
    const { commandName } = parseCommandLine(raw);
    if (!commandName) return;
    const result = await executeCommandRaw(raw, {
      commands,
      store,
      cwd,
      setCwd,
      ...createProgram ? { createProgram } : {},
      ...session !== void 0 ? { session } : {},
      ...config !== void 0 ? { config } : {},
      ...driver ? { driver } : {},
      ...connectivity ? { connectivity } : {},
      clearScreen: () => setHistory([]),
      ...runtime === "terminal" ? {
        exit: () => {
          const nodeProcess = globalThis.process;
          nodeProcess?.exit?.(0);
        }
      } : {}
    });
    if (commandName !== "clear") {
      setHistory((prev) => [...prev, { command: `$ ${raw}`, component: result.component }]);
    }
    setInput("");
    setInputKey((prev) => prev + 1);
  };
  return /* @__PURE__ */ jsxs8(Box7, { flexDirection: "column", padding: 1, children: [
    history.map((item, idx) => /* @__PURE__ */ jsxs8(Box7, { flexDirection: "column", marginBottom: 1, children: [
      item.command ? /* @__PURE__ */ jsx18(Text8, { dimColor: true, children: item.command }) : null,
      item.component && /* @__PURE__ */ jsx18(Box7, { marginLeft: 2, children: item.component })
    ] }, idx)),
    /* @__PURE__ */ jsxs8(Box7, { children: [
      /* @__PURE__ */ jsx18(Text8, { color: "green", children: "$ " }),
      /* @__PURE__ */ jsx18(
        TextInput,
        {
          defaultValue: input,
          onChange: setInput,
          onSubmit: executeCommand2,
          placeholder: "Type command"
        },
        inputKey
      )
    ] })
  ] });
}
var InteractiveShell = ({
  commands: commandsProp,
  createProgram: createProgramProp,
  runtime = "browser",
  store: storeProp,
  config: configProp,
  driver: driverProp = null,
  cwd: cwdProp,
  setCwd: setCwdProp,
  session: sessionProp,
  welcomeMessage
}) => {
  const runtimeContext = useShellRuntime();
  const fromContext = runtimeContext ?? void 0;
  const commands = commandsProp ?? fromContext?.commands;
  const createProgram = createProgramProp ?? (fromContext?.createProgram ? () => fromContext.createProgram() : void 0);
  const store = storeProp ?? fromContext?.store;
  const config = configProp ?? fromContext?.config;
  const driver = driverProp ?? fromContext?.driver ?? null;
  const cwd = cwdProp ?? fromContext?.cwd;
  const setCwd = setCwdProp ?? fromContext?.setCwd;
  const session = sessionProp !== void 0 ? sessionProp : fromContext?.session;
  const connectivity = fromContext?.connectivity ?? null;
  const shellStore = useMemo8(() => store ?? createDevalboStore(), [store]);
  const fallbackCwd = useMemo8(() => {
    if (detectPlatform().platform !== "nodejs" /* NodeJS */) return "/";
    const nodeProcess = globalThis.process;
    return nodeProcess?.cwd?.() ?? "/";
  }, []);
  const resolvedCwd = cwd ?? fallbackCwd;
  const resolvedSetCwd = setCwd ?? (() => void 0);
  if (commands == null) {
    throw new Error("InteractiveShell: commands are required. Pass commands as a prop or render inside ShellRuntimeProvider (e.g. createApp().App).");
  }
  const shellContentProps = {
    commands,
    ...createProgram ? { createProgram } : {},
    store: shellStore,
    ...config ? { config } : {},
    driver,
    cwd: resolvedCwd,
    setCwd: resolvedSetCwd,
    ...session !== void 0 ? { session } : {},
    ...connectivity ? { connectivity } : {},
    welcomeMessage
  };
  if (runtime === "terminal") {
    return /* @__PURE__ */ jsx18(TerminalShellProvider, { children: /* @__PURE__ */ jsx18(ShellContent, { ...shellContentProps, runtime: "terminal" }) });
  }
  return /* @__PURE__ */ jsx18(BrowserShellProvider, { children: /* @__PURE__ */ jsx18(ShellContent, { ...shellContentProps, runtime: "browser" }) });
};

// packages/cli-shell/src/program-helpers.ts
var BUILTIN_META = {
  pwd: { description: "Print working directory" },
  cd: { description: "Change directory", args: [{ name: "path", description: "Directory path", required: true }] },
  ls: { description: "List directory contents", args: [{ name: "path", description: "Path", required: false }] },
  tree: { description: "Show directory tree", args: [{ name: "path", description: "Path", required: false }] },
  cat: { description: "Display file contents", args: [{ name: "file", description: "File path", required: true }] },
  touch: { description: "Create empty file", args: [{ name: "file", description: "File path", required: true }] },
  mkdir: { description: "Create directory", args: [{ name: "dir", description: "Directory path", required: true }] },
  cp: { description: "Copy file or directory", args: [{ name: "src", description: "Source", required: true }, { name: "dest", description: "Destination", required: true }] },
  mv: { description: "Move/rename file or directory", args: [{ name: "src", description: "Source", required: true }, { name: "dest", description: "Destination", required: true }] },
  rm: { description: "Remove file or directory", args: [{ name: "path", description: "Path", required: true }] },
  stat: { description: "Show file/directory info", args: [{ name: "path", description: "Path", required: true }] },
  clear: { description: "Clear terminal" },
  backend: { description: "Show filesystem backend info" },
  exit: { description: "Exit the shell" },
  help: { description: "Show available commands" },
  "app-config": { description: "Show current app configuration" }
};
function registerBuiltinCommandsToRegistry(registry, skipExisting = true) {
  const all = { ...filesystemCommands, ...systemCommands, ...appCommands };
  for (const [name, handler] of Object.entries(all)) {
    if (skipExisting && registry.has(name)) continue;
    const meta = BUILTIN_META[name];
    registry.register(name, handler, meta);
  }
}
var registerBuiltinCommands = (program) => {
  program.command("pwd").description("Print working directory");
  program.command("cd <path>").description("Change directory");
  program.command("ls [path]").description("List directory contents");
  program.command("tree [path]").description("Show directory tree");
  program.command("cat <file>").description("Display file contents");
  program.command("touch <file>").description("Create empty file");
  program.command("mkdir <dir>").description("Create directory");
  program.command("cp <src> <dest>").description("Copy file or directory");
  program.command("mv <src> <dest>").description("Move/rename file or directory");
  program.command("rm <path>").description("Remove file or directory");
  program.command("stat <path>").description("Show file/directory info");
  program.command("clear").description("Clear terminal");
  program.command("backend").description("Show filesystem backend info");
  program.command("exit").description("Exit the shell");
  program.command("help").description("Show available commands");
  program.command("app-config").description("Show current app configuration");
};
var defaultWelcomeMessage = (config) => {
  const name = config?.appName ?? config?.appId ?? "CLI shell";
  return `Welcome to ${name}. Type "help" for available commands.`;
};

// packages/cli-shell/src/cli-entry.tsx
import { render } from "ink";
import { useState as useState12 } from "react";
import "react";
import { jsx as jsx19 } from "react/jsx-runtime";
async function startInteractiveCli(opts) {
  const store = createDevalboStore();
  const driver = await createFilesystemDriver();
  const initialCwd = globalThis.process?.cwd?.() ?? "/";
  const App = () => {
    const [cwd, setCwd] = useState12(initialCwd);
    return /* @__PURE__ */ jsx19(
      InteractiveShell,
      {
        runtime: "terminal",
        commands: opts.commands,
        createProgram: opts.createProgram,
        store,
        config: opts.config,
        driver,
        cwd,
        setCwd,
        welcomeMessage: opts.welcomeMessage
      }
    );
  };
  render(/* @__PURE__ */ jsx19(App, {}));
}

// packages/cli-shell/src/create-app.tsx
import { useMemo as useMemo9, useState as useState13 } from "react";

// packages/cli-shell/src/lib/command-registry.ts
import { Command } from "commander";
function createCommandRegistry() {
  const entries = /* @__PURE__ */ new Map();
  let frozen = false;
  return {
    has(name) {
      return entries.has(name);
    },
    register(name, handler, meta) {
      if (frozen) {
        throw new Error(`Cannot register command "${name}": registry is frozen. Register commands in onReady before createApp() resolves.`);
      }
      if (entries.has(name)) {
        throw new Error(`Command already registered: ${name}`);
      }
      const entry = { name, handler };
      if (meta !== void 0) entry.meta = meta;
      entries.set(name, entry);
    },
    freeze() {
      frozen = true;
    },
    getCommandMap() {
      const map2 = {};
      for (const [name, { handler }] of entries) {
        map2[name] = handler;
      }
      return map2;
    },
    createProgram(appName, version = "0.0.0", description = "") {
      const program = new Command(appName).version(version);
      if (description) program.description(description);
      for (const [, { name, meta }] of entries) {
        const spec = meta?.args?.length ? `${name} ${meta.args.map((a) => a.required ? `<${a.name}>` : `[${a.name}]`).join(" ")}` : name;
        const cmd = program.command(spec);
        if (meta?.description) cmd.description(meta.description);
      }
      return program;
    }
  };
}

// packages/cli-shell/src/create-app.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
async function createApp(options) {
  const {
    appId,
    appName = appId,
    storageKey,
    version = "0.0.0",
    description = "",
    onReady
  } = options;
  const store = createDevalboStore();
  const config = createCliAppConfig({ appId, appName, storageKey });
  const registry = createCommandRegistry();
  const registerCommand = (name, handler, meta) => {
    registry.register(name, handler, meta);
  };
  onReady?.({ registerCommand, registerMimeTypeHandler });
  registerBuiltinCommandsToRegistry(registry);
  registry.freeze();
  const driver = await createFilesystemDriver();
  const createProgram = () => registry.createProgram(appId, version, description);
  const commands = registry.getCommandMap();
  function App({
    welcomeMessage = defaultWelcomeMessage(config),
    children
  } = {}) {
    const [cwd, setCwd] = useState13("/");
    const [connectivity] = useState13(() => new BrowserConnectivityService());
    const runtimeValue = useMemo9(
      () => ({ commands, createProgram, store, config, driver, cwd, setCwd, connectivity }),
      [cwd, setCwd, connectivity]
    );
    return /* @__PURE__ */ jsx20(StoreContext.Provider, { value: store, children: /* @__PURE__ */ jsx20(AppConfigProvider, { config, children: /* @__PURE__ */ jsx20(ShellRuntimeProvider, { value: runtimeValue, bindToCli: true, children: children ?? /* @__PURE__ */ jsx20(InteractiveShell, { welcomeMessage }) }) }) });
  }
  return { store, driver, App };
}

// packages/cli-shell/src/lib/validate-args.ts
var validateNavigateArgs = (args) => Effect_exports.gen(function* () {
  const requested = args[0] || ".";
  return { path: requested };
});
var validateEditArgs = (args) => Effect_exports.gen(function* () {
  const requested = args[0]?.trim();
  if (!requested) {
    return yield* Effect_exports.fail(
      new MissingArgument({
        argName: "file",
        message: "File path is required"
      })
    );
  }
  return { file: requested };
});

// packages/cli-shell/src/hooks/use-valid-parse.ts
import { useState as useState14, useEffect as useEffect10, useRef as useRef2 } from "react";
function useValidParse(source, parse2) {
  const [validDoc, setValidDoc] = useState14(null);
  const [parseError, setParseError] = useState14(null);
  const parseRef = useRef2(parse2);
  parseRef.current = parse2;
  useEffect10(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const result = await Promise.resolve(parseRef.current(source));
        if (!cancelled) {
          setValidDoc(result);
          setParseError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message2 = err instanceof Error ? err.message : String(err);
          setParseError(message2);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [source]);
  return { validDoc, parseError };
}

// packages/cli-shell/src/index.ts
var builtinCommands = { ...filesystemCommands, ...systemCommands, ...appCommands };
export {
  AppConfigProvider,
  BrowserConnectivityService,
  InteractiveShell,
  ShellRuntimeProvider,
  StoreContext,
  bindCliRuntimeSource,
  builtinCommands,
  cli,
  createApp,
  createCliAppConfig,
  createCommandRegistry,
  createDevalboStore,
  createFilesystemDriver,
  defaultWelcomeMessage,
  makeError,
  makeOutput,
  makeResult,
  makeResultError,
  mergeCommands,
  registerBuiltinCommands,
  registerBuiltinCommandsToRegistry,
  startInteractiveCli,
  unbindCliRuntimeSource,
  useAppConfig,
  useShellRuntime,
  useValidParse,
  validateEditArgs,
  validateNavigateArgs,
  withValidation
};
