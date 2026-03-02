export { A as AbsolutePath, a as AbsolutePathSchema, b as ActivityId, c as ActivityIdToolbox, d as Branded, B as ByteCount, e as ByteCountSchema, C as ContactId, f as ContactIdToolbox, g as ContentHash, h as ContentHashSchema, D as DirectoryPath, i as DirectoryPathSchema, F as FilePath, j as FilePathSchema, G as GroupId, k as GroupIdToolbox, l as MembershipId, m as MembershipIdToolbox, M as Milliseconds, n as MillisecondsSchema, o as PersonaId, p as PersonaIdToolbox, q as PodETag, r as PodETagSchema, P as PodUrl, s as PodUrlSchema, R as RelativePath, t as RelativePathSchema, S as SyncRootId, u as SyncRootIdSchema, W as WebId, v as WebIdSchema, w as asDirectoryPath, x as asFilePath, y as assertAbsolutePath, z as assertActivityId, E as assertContactId, H as assertContentHash, I as assertDirectoryPath, J as assertFilePath, K as assertGroupId, L as assertMembershipId, N as assertPersonaId, O as assertPodUrl, Q as assertSyncRootId, T as assertWebId, U as parseAbsolutePath, V as parseActivityId, X as parseContactId, Y as parseDirectoryPath, Z as parseFilePath, _ as parseGroupId, $ as parseMembershipId, a0 as parsePersonaId, a1 as parsePodUrl, a2 as parseWebId, a3 as unsafeAsAbsolutePath, a4 as unsafeAsActivityId, a5 as unsafeAsByteCount, a6 as unsafeAsContactId, a7 as unsafeAsContentHash, a8 as unsafeAsDirectoryPath, a9 as unsafeAsFilePath, aa as unsafeAsGroupId, ab as unsafeAsMembershipId, ac as unsafeAsMilliseconds, ad as unsafeAsPersonaId, ae as unsafeAsPodETag, af as unsafeAsPodUrl, ag as unsafeAsRelativePath, ah as unsafeAsSyncRootId, ai as unsafeAsWebId } from './branded-D2eQxo7s.js';
export { A as AlwaysOnlineConnectivityService, B as BrowserConnectivityService, F as FileEntry, I as IConnectivityService, a as RuntimeEnv, R as RuntimePlatform, W as WatchEvent, b as WatchEventType } from './filesystem-BbmJFc5d.js';
export { C as CommandOptions, a as CommandResult, F as FileNotFound, M as MissingArgument } from './errors-Jkwy0AU7.js';
export { E as EditorBufferRow, F as FileTreeRow, S as SyncRoot, a as SyncRootSchema } from './sync-root-BCnMChoN.js';
export { ActivityRow, ActivityRowInput, ActivityRowSchema, ActivityRowStoreSchema, ActivitySubjectTypeSchema, ActivityTypeSchema, ContactKind, ContactKindSchema, ContactRow, ContactRowInput, ContactRowSchema, ContactRowStoreSchema, EditorBufferRowSchema, FileTreeRowSchema, GroupRow, GroupRowInput, GroupRowSchema, GroupRowStoreSchema, GroupType, GroupTypeSchema, IRI, MembershipRow, MembershipRowInput, MembershipRowSchema, MembershipRowStoreSchema, NS, NodeRef, ORG, POD_CONTEXT, PersonaRow, PersonaRowInput, PersonaRowSchema, PersonaRowStoreSchema, ServiceContainer, TIME, detectPlatform, generateUID, getId, iri, isNodeRef, nonEmptyString, nowISO, oneOrMany, pathArgSchema, toArray } from './shared.js';
export { A as AppConfig, c as createCliAppConfig, a as createSocialAppConfig } from './app-config-MGBUKfI7.js';
export { D as DevalboStore, c as createDevalboStore } from './store-Doi5pYJL.js';
export { AppConfigContext, AppConfigProvider, EDITOR_BUFFER_TABLE, FILE_SYNC_STATE_TABLE, FILE_TREE_TABLE, FileSyncStateRow, FileSyncStatus, MemoryPersister, SYNC_ROOTS_TABLE, SqliteBrowserPersister, SqliteNodePersister, StoreContext, deleteBuffer, deleteEntry, deleteFileSyncState, deleteSyncRoot, getBuffer, getEntry, getFileSyncState, getSyncRoot, listBuffers, listEntries, listFileSyncStatesForRoot, listSyncRoots, setBuffer, setEntry, setFileSyncState, setSyncRoot, useAppConfig, useRow, useStore, useTable } from './state.js';
export { F as FilesystemBackendInfo, I as IFilesystemDriver, a as IWatcherService, c as createFilesystemDriver, g as getFilesystemBackendInfo } from './index-CzSam8TC.js';
import { F as FilePreviewProps, a as FileEditProps } from './cli-shell-DiAwY3PG.js';
export { A as AsyncCommandHandler, B as BrowserShellProvider, C as CliEntryOptions, b as CliRuntimeSource, c as CommandHandler, d as CommandMeta, e as CommandRegistry, f as CommandRegistryEntry, g as CommandRuntimeContext, h as CreateAppOptions, i as CreateAppResult, E as EditArgs, j as ExtendedCommandOptions, k as ExtendedCommandOptionsWithStore, l as FsTreeNode, I as InteractiveShell, M as MimeTypeHandler, N as NavigateArgs, P as ProgramArgumentLike, m as ProgramCommandLike, n as ProgramLike, S as ShellContext, o as ShellRuntimeContext, p as ShellRuntimeProvider, q as StoreCommandHandler, T as TerminalShellProvider, r as appCommands, s as bindCliRuntimeSource, t as buildCommandOptions, u as buildTree, v as builtinCommands, w as changeDir, x as cli, y as copyPath, z as createApp, D as createCommandRegistry, G as defaultWelcomeMessage, H as executeCommand, J as executeCommandRaw, K as exportDirectoryAsBft, L as filesystemCommands, O as getCliRuntimeStatus, Q as getDefaultCwd, R as getDriver, U as getWatcher, V as importBftTextToLocation, W as importBftToLocation, X as joinFsPath, Y as listDirectory, Z as listMimeTypeHandlers, _ as makeDirectory, $ as makeError, a0 as makeOutput, a1 as makeResult, a2 as makeResultError, a3 as mergeCommands, a4 as movePath, a5 as parseCommandLine, a6 as readBytesFile, a7 as readTextFile, a8 as registerBuiltinCommands, a9 as registerBuiltinCommandsToRegistry, aa as registerMimeTypeHandler, ab as removePath, ac as resolveFsPath, ad as resolveMimeTypeHandler, ae as splitFsPath, af as startInteractiveCli, ag as statPath, ah as systemCommands, ai as touchFile, aj as treeText, ak as unbindCliRuntimeSource, al as useShell, am as useShellRuntime, an as useValidParse, ao as validateEditArgs, ap as validateNavigateArgs, aq as withValidation, ar as writeBytesFile, as as writeTextFile } from './cli-shell-DiAwY3PG.js';
import React__default from 'react';
export { BrowserBackendInfo, BrowserStoreFSDriver, BrowserWatcherService, FS_STORAGE_KEY, InMemoryDriver, ZenFSDriver, createWatcherService, subscribeBrowserFsEvents, toDirectoryPath, toFilePath } from './filesystem.js';
export { DCTERMS, FOAF, LDP, VCARD } from '@inrupt/vocab-common-rdf';
export { SOLID, WS } from '@inrupt/vocab-solid-common';
import 'zod';
import 'effect/Cause';
import 'effect/Types';
import 'tinybase';
import 'effect';

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

export { FileEditProps as EditProps, MarkdownEdit, MarkdownView, MarkdownViewEdit, FilePreviewProps as PreviewProps, Spinner, registerDefaultMimeTypeHandlers, useKeyboard };
