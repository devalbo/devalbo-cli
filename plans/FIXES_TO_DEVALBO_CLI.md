# Changes needed in devalbo-cli for devalbo-editor to depend on it

devalbo-editor currently expects either (a) a git clone of devalbo-cli with source and Vite aliases into `packages/*`, or (b) a published package that exposes the same surface. For the **published** npm-installable devalbo-cli, the following must be true so that devalbo-editor can install it and run (terminal, web, desktop) without Vite aliases into internal source paths.

---

## 1. Export strategy

**Logical grouping via subpaths:** Expose symbols in grouped subpath exports that mirror the internal packages, for example:

| Subpath | Purpose |
|--------|--------|
| `devalbo-cli` (main) | Re-exports everything from the subpaths below so `import { X } from 'devalbo-cli'` works for the full API. |
| `devalbo-cli/shared` | Types, Zod schemas, ID toolboxes, `unsafeAs*` helpers, path/pod types (§2.1). |
| `devalbo-cli/state` | Store, sync roots, file sync, TinyBase hooks (§2.2). |
| `devalbo-cli/cli-shell` | Shell UI, validation, command runtime, getDriver/getWatcher (§2.3). |
| `devalbo-cli/filesystem` | `IFilesystemDriver`, `IWatcherService` and related (§2.4). |

- **Main entry:** The main entry (`"."`) must re-export every symbol listed in §2 so that devalbo-editor can use only `import { X } from 'devalbo-cli'` and drop Vite/tsconfig aliases into `packages/`.
- **Subpaths (optional but recommended):** Implement the subpaths above and have the main entry aggregate them (e.g. `export * from './shared'` etc.). That keeps the public API grouped for maintainers and for consumers who prefer `import { ContactId } from 'devalbo-cli/shared'`.

---

## 2. Symbols that must be available (main entry; grouped by suggested subpath)

Everything listed here is imported somewhere in devalbo-editor (packages: editor-lib, social-state, social-ui, solid-client; apps: naveditor-web, naveditor-desktop, naveditor-terminal, naveditor tests).

### 2.1 Shared — suggested subpath `devalbo-cli/shared`  
Types, schemas, unsafe helpers, path/pod types.

**Types:**  
`ContactId`, `ContactRow`, `ContactRowInput`, `GroupId`, `GroupRow`, `GroupRowInput`, `PersonaId`, `PersonaRow`, `PersonaRowInput`, `ActivityId`, `ActivityRow`, `MembershipId`, `MembershipRow`, `AbsolutePath`, `RelativePath`, `PodUrl`, `PodETag`, `ByteCount`, `ContentHash`, `SyncRoot`, `SyncRootId`, `AppConfig`, `IConnectivityService`, `WatchEvent`, `WatchEventType`

**Row/Store schemas (Zod):**  
`ContactRowSchema`, `GroupRowSchema`, `PersonaRowSchema`, `PersonaRowStoreSchema`, `ContactRowStoreSchema`, `GroupRowStoreSchema`, `MembershipRowStoreSchema`, `ActivityRowStoreSchema`

**ID toolboxes / parsers:**  
`ContactIdToolbox`, `GroupIdToolbox`, `PersonaIdToolbox`, `ActivityIdToolbox`  
`parseContactId`, `parseGroupId`, `parsePersonaId`, `parseMembershipId`

**Unsafe coercion helpers:**  
`unsafeAsContactId`, `unsafeAsGroupId`, `unsafeAsPersonaId`, `unsafeAsMembershipId`, `unsafeAsActivityId`, `unsafeAsFilePath`, `unsafeAsDirectoryPath`, `unsafeAsAbsolutePath`, `unsafeAsRelativePath`, `unsafeAsPodUrl`, `unsafeAsByteCount`, `unsafeAsPodETag`, `unsafeAsContentHash`

**Other:**  
`ORG` (constant used in membership-jsonld), `WatchEventType` (enum or const)

---

### 2.2 State — suggested subpath `devalbo-cli/state`  
Store, sync roots, file sync, TinyBase.

**Store / React:**  
`createDevalboStore`, `StoreContext`, `useStore`, `useRow`, `useTable`

**Sync roots / file sync:**  
`listSyncRoots`, `SYNC_ROOTS_TABLE`, `setSyncRoot`, `getSyncRoot`, `deleteSyncRoot`, `getFileSyncState`, `setFileSyncState`, `deleteFileSyncState`, `listFileSyncStatesForRoot`

**Social accessors (if exposed from state):**  
`getDefaultPersona`, `listContacts`, `listGroups`, `listPersonas`, `listMembers`, `setContact`, `setPersona`, `setGroup`, `addMember`, `removeMember`, `getMembershipRowId`, `listMembers`, `logActivity`, `deletePersona`, `listActivities`

**Tables / constants:**  
`FILE_TREE_TABLE`

---

### 2.3 CLI shell — suggested subpath `devalbo-cli/cli-shell`  
UI, validation, command runtime, drivers.

**Components / runtime:**  
`TerminalShellProvider`, `InteractiveShell`, `Spinner`, `useKeyboard`

**Validation (used by edit.tsx and navigate.tsx):**  
`withValidation`, `validateEditArgs`, `validateNavigateArgs`  
(Currently imported from cli-shell internals — must be re-exported from the main entry.)

**Command runtime (tests):**  
`CommandRuntimeContext` and exports from `lib/command-runtime` used by tests (e.g. `getCommandMap`, `createProgram`-like helpers if any).

**Driver / watcher access:**  
`getDriver`, `getWatcher`

**Types:**  
`FileEntry` (must be exported; currently “declared locally but not exported”).  
`IFilesystemDriver` (must be exported as a type; same note).

---

### 2.4 Filesystem — suggested subpath `devalbo-cli/filesystem`  
Types (and any related APIs) used by solid-client.

**Types:**  
`IFilesystemDriver`, `IWatcherService`

(These are also re-exported from editor-lib as `from 'devalbo-cli'`; they can live on the main entry.)

---

### 2.5 Main / commands  
Core CLI, commands, result helpers, platform/config, FS/BFT/IO, MIME, shell. (Typically the main entry’s own surface plus re-exports from the subpaths above.)

**Commands:**  
`filesystemCommands`, `systemCommands`, `appCommands`, `registerBuiltinCommands`

**Result helpers:**  
`makeOutput`, `makeError`, `makeResult`, `makeResultError`

**Types:**  
`CommandHandler`, `AsyncCommandHandler`, `StoreCommandHandler`, `ExtendedCommandOptions`, `ExtendedCommandOptionsWithStore`

**Platform / config:**  
`detectPlatform`, `RuntimePlatform`, `getDefaultCwd`, `createCliAppConfig`, `unsafeAsByteCount`, `unsafeAsMilliseconds`

**FS / BFT / IO:**  
`exportDirectoryAsBft`, `importBftToLocation`, `importBftTextToLocation`, `readTextFile`, `writeTextFile`, `writeBytesFile`, `readBytesFile`, `listDirectory`, `makeDirectory`, `removePath`, `resolveFsPath`, `splitFsPath`, `buildTree`, `getFilesystemBackendInfo`, `getWatcher`, `pathArgSchema`

**Sync / connectivity:**  
`listSyncRoots`, `listFileSyncStatesForRoot`, `setSyncRoot`, `getSyncRoot`, `deleteSyncRoot`, `getFileSyncState`, `setFileSyncState`, `deleteFileSyncState`, `listFileSyncStatesForRoot`, `AlwaysOnlineConnectivityService`, `assertAbsolutePath`, `assertPodUrl`, `assertSyncRootId`, `assertWebId`

**Types:**  
`SyncRoot`, `SyncRootId`, `DevalboStore`, `AppConfig`, `FileContent`

**Navigator / file tree:**  
`FILE_TREE_TABLE`, `Spinner`, `useKeyboard`, `unsafeAsFilePath`, `FileEntry` (type)

**MIME / shell:**  
`registerDefaultMimeTypeHandlers`, `registerMimeTypeHandler`, `listMimeTypeHandlers`, `resolveMimeTypeHandler`, `MarkdownEdit`, `MarkdownView`, `MarkdownViewEdit`, `InteractiveShell`, `bindCliRuntimeSource`, `unbindCliRuntimeSource`, `cli`, `createFilesystemDriver`, `createWatcherService`, `AppConfigProvider`, `useAppConfig`

---

## 3. Package.json / publishing

- **Exports:** The main entry must expose all of the symbols in §2.
- **No dependency on `packages/` in the tarball:** The published package only has `dist/`. Consumers must get everything from the main bundle; do not require access to `packages/*` source.
- **`package.json` in exports (optional):** If you want consumers to do `require.resolve('devalbo-cli/package.json')`, add `"./package.json": "./package.json"` to `exports`. devalbo-editor’s Vite config was updated to avoid this, so this is optional.

---

## 4. Summary checklist for devalbo-cli

- [x] All symbols in §2.1–§2.5 are exported from the main entry.
- [x] Types `FileEntry` and `IFilesystemDriver` are exported (not only declared internally).
- [x] `withValidation`, `validateEditArgs`, `validateNavigateArgs` are re-exported from the main entry.
- [x] Published tarball does not rely on `packages/*` source; everything is in the bundle and exposed via the main entry.

Once these are done, devalbo-editor can depend on the published devalbo-cli and will use only `import { X } from 'devalbo-cli'` for all of the above.
