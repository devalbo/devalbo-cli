import { l as FilePreviewProps, F as FileEditProps, A as AsyncCommandHandler } from './file-operations-BTkZqrAg.js';
export { B as BrowserShellProvider, C as CliEntryOptions, a as CliRuntimeSource, b as CommandHandler, c as CommandMeta, d as CommandRegistry, e as CommandRegistryEntry, f as CommandRuntimeContext, g as CreateAppOptions, h as CreateAppResult, E as EditArgs, i as ExtendedCommandOptions, j as ExtendedCommandOptionsWithStore, k as FsTreeNode, I as InteractiveShell, M as MimeTypeHandler, N as NavigateArgs, P as ProgramArgumentLike, m as ProgramCommandLike, n as ProgramLike, S as ShellContext, o as ShellRuntimeContext, p as ShellRuntimeProvider, q as StoreCommandHandler, T as TerminalShellProvider, r as appCommands, s as bindCliRuntimeSource, t as buildCommandOptions, u as buildTree, v as changeDir, w as cli, x as copyPath, y as createApp, z as createCommandRegistry, D as defaultWelcomeMessage, G as executeCommand, H as executeCommandRaw, J as exportDirectoryAsBft, K as filesystemCommands, L as getCliRuntimeStatus, O as getDefaultCwd, Q as getDriver, R as getWatcher, U as importBftTextToLocation, V as importBftToLocation, W as joinFsPath, X as listDirectory, ap as listMimeTypeHandlers, Y as makeDirectory, Z as makeError, _ as makeOutput, $ as makeResult, a0 as makeResultError, a1 as mergeCommands, a2 as movePath, a3 as parseCommandLine, a4 as readBytesFile, a5 as readTextFile, a6 as registerBuiltinCommands, a7 as registerBuiltinCommandsToRegistry, aq as registerMimeTypeHandler, a8 as removePath, a9 as resolveFsPath, ar as resolveMimeTypeHandler, aa as splitFsPath, ab as startInteractiveCli, ac as statPath, ad as systemCommands, ae as touchFile, af as treeText, ag as unbindCliRuntimeSource, ah as useShell, ai as useShellRuntime, aj as useValidParse, ak as validateEditArgs, al as validateNavigateArgs, am as withValidation, an as writeBytesFile, ao as writeTextFile } from './file-operations-BTkZqrAg.js';
import React__default from 'react';
export { A as AbsolutePath, a as AbsolutePathSchema, b as ActivityId, c as ActivityIdToolbox, d as Branded, B as ByteCount, e as ByteCountSchema, C as ContactId, f as ContactIdToolbox, g as ContentHash, h as ContentHashSchema, D as DirectoryPath, i as DirectoryPathSchema, F as FilePath, j as FilePathSchema, G as GroupId, k as GroupIdToolbox, l as MembershipId, m as MembershipIdToolbox, M as Milliseconds, n as MillisecondsSchema, o as PersonaId, p as PersonaIdToolbox, q as PodETag, r as PodETagSchema, P as PodUrl, s as PodUrlSchema, R as RelativePath, t as RelativePathSchema, S as SyncRootId, u as SyncRootIdSchema, W as WebId, v as WebIdSchema, w as asDirectoryPath, x as asFilePath, y as assertAbsolutePath, z as assertActivityId, E as assertContactId, H as assertContentHash, I as assertDirectoryPath, J as assertFilePath, K as assertGroupId, L as assertMembershipId, N as assertPersonaId, O as assertPodUrl, Q as assertSyncRootId, T as assertWebId, U as parseAbsolutePath, V as parseActivityId, X as parseContactId, Y as parseDirectoryPath, Z as parseFilePath, _ as parseGroupId, $ as parseMembershipId, a0 as parsePersonaId, a1 as parsePodUrl, a2 as parseWebId, a3 as unsafeAsAbsolutePath, a4 as unsafeAsActivityId, a5 as unsafeAsByteCount, a6 as unsafeAsContactId, a7 as unsafeAsContentHash, a8 as unsafeAsDirectoryPath, a9 as unsafeAsFilePath, aa as unsafeAsGroupId, ab as unsafeAsMembershipId, ac as unsafeAsMilliseconds, ad as unsafeAsPersonaId, ae as unsafeAsPodETag, af as unsafeAsPodUrl, ag as unsafeAsRelativePath, ah as unsafeAsSyncRootId, ai as unsafeAsWebId } from './branded-D2eQxo7s.js';
export { A as AlwaysOnlineConnectivityService, B as BrowserConnectivityService, F as FileEntry, I as IConnectivityService, a as RuntimeEnv, R as RuntimePlatform, W as WatchEvent, b as WatchEventType } from './filesystem-BbmJFc5d.js';
export { C as CommandOptions, a as CommandResult, F as FileNotFound, M as MissingArgument } from './errors-Jkwy0AU7.js';
export { E as EditorBufferRow, F as FileTreeRow, S as SyncRoot, a as SyncRootSchema } from './sync-root-BCnMChoN.js';
export { ActivityRow, ActivityRowInput, ActivityRowSchema, ActivityRowStoreSchema, ActivitySubjectTypeSchema, ActivityTypeSchema, ContactKind, ContactKindSchema, ContactRow, ContactRowInput, ContactRowSchema, ContactRowStoreSchema, EditorBufferRowSchema, FileTreeRowSchema, GroupRow, GroupRowInput, GroupRowSchema, GroupRowStoreSchema, GroupType, GroupTypeSchema, IRI, MembershipRow, MembershipRowInput, MembershipRowSchema, MembershipRowStoreSchema, NS, NodeRef, ORG, POD_CONTEXT, PersonaRow, PersonaRowInput, PersonaRowSchema, PersonaRowStoreSchema, ServiceContainer, TIME, detectPlatform, generateUID, getId, iri, isNodeRef, nonEmptyString, nowISO, oneOrMany, pathArgSchema, toArray } from './sharedBrowser.js';
export { A as AppConfig, c as createCliAppConfig, a as createSocialAppConfig } from './app-config-MGBUKfI7.js';
export { D as DevalboStore, c as createDevalboStore } from './store-Doi5pYJL.js';
export { AppConfigContext, AppConfigProvider, EDITOR_BUFFER_TABLE, FILE_SYNC_STATE_TABLE, FILE_TREE_TABLE, FileSyncStateRow, FileSyncStatus, MemoryPersister, SYNC_ROOTS_TABLE, SqliteBrowserPersister, SqliteNodePersister, StoreContext, deleteBuffer, deleteEntry, deleteFileSyncState, deleteSyncRoot, getBuffer, getEntry, getFileSyncState, getSyncRoot, listBuffers, listEntries, listFileSyncStatesForRoot, listSyncRoots, setBuffer, setEntry, setFileSyncState, setSyncRoot, useAppConfig, useRow, useStore, useTable } from './stateBrowser.js';
export { F as FilesystemBackendInfo, I as IFilesystemDriver, a as IWatcherService, c as createFilesystemDriver, g as getFilesystemBackendInfo } from './index-CzSam8TC.js';
export { BrowserBackendInfo, BrowserStoreFSDriver, BrowserWatcherService, FS_STORAGE_KEY, InMemoryDriver, ZenFSDriver, createWatcherService, subscribeBrowserFsEvents, toDirectoryPath, toFilePath } from './filesystemBrowser.js';
export { DCTERMS, FOAF, LDP, VCARD } from '@inrupt/vocab-common-rdf';
export { SOLID, WS } from '@inrupt/vocab-solid-common';
import 'effect';
import 'tinybase';
import 'zod';
import 'effect/Cause';
import 'effect/Types';

interface SpinnerProps {
    type?: 'dots';
    label?: string;
}
declare const Spinner: React__default.FC<SpinnerProps>;

declare const useKeyboard: (handler: (input: string, key: {
    upArrow: boolean;
    downArrow: boolean;
    return: boolean;
}) => void) => void;

declare const registerDefaultMimeTypeHandlers: () => void;

declare const MarkdownView: React__default.FC<FilePreviewProps>;

declare const MarkdownEdit: React__default.FC<FileEditProps>;

declare const MarkdownViewEdit: React__default.FC<FileEditProps>;

/** Browser-safe built-ins (no Node-backed system commands). */
declare const builtinCommands: {
    readonly "app-config": AsyncCommandHandler;
    readonly clear: AsyncCommandHandler;
    readonly backend: AsyncCommandHandler;
    readonly exit: AsyncCommandHandler;
    readonly help: AsyncCommandHandler;
    readonly pwd: AsyncCommandHandler;
    readonly cd: AsyncCommandHandler;
    readonly ls: AsyncCommandHandler;
    readonly tree: AsyncCommandHandler;
    readonly stat: AsyncCommandHandler;
    readonly cat: AsyncCommandHandler;
    readonly touch: AsyncCommandHandler;
    readonly mkdir: AsyncCommandHandler;
    readonly cp: AsyncCommandHandler;
    readonly mv: AsyncCommandHandler;
    readonly rm: AsyncCommandHandler;
};

export { AsyncCommandHandler, FileEditProps as EditProps, MarkdownEdit, MarkdownView, MarkdownViewEdit, FilePreviewProps as PreviewProps, Spinner, builtinCommands, registerDefaultMimeTypeHandlers, useKeyboard };
