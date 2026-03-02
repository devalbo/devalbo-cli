import { A as AsyncCommandHandler } from './file-operations-BTkZqrAg.js';
export { B as BrowserShellProvider, C as CliEntryOptions, a as CliRuntimeSource, b as CommandHandler, c as CommandMeta, d as CommandRegistry, e as CommandRegistryEntry, f as CommandRuntimeContext, g as CreateAppOptions, h as CreateAppResult, E as EditArgs, F as EditProps, i as ExtendedCommandOptions, j as ExtendedCommandOptionsWithStore, k as FsTreeNode, I as InteractiveShell, M as MimeTypeHandler, N as NavigateArgs, l as PreviewProps, P as ProgramArgumentLike, m as ProgramCommandLike, n as ProgramLike, S as ShellContext, o as ShellRuntimeContext, p as ShellRuntimeProvider, q as StoreCommandHandler, T as TerminalShellProvider, r as appCommands, s as bindCliRuntimeSource, t as buildCommandOptions, u as buildTree, v as changeDir, w as cli, x as copyPath, y as createApp, z as createCommandRegistry, D as defaultWelcomeMessage, G as executeCommand, H as executeCommandRaw, J as exportDirectoryAsBft, K as filesystemCommands, L as getCliRuntimeStatus, O as getDefaultCwd, Q as getDriver, R as getWatcher, U as importBftTextToLocation, V as importBftToLocation, W as joinFsPath, X as listDirectory, Y as makeDirectory, Z as makeError, _ as makeOutput, $ as makeResult, a0 as makeResultError, a1 as mergeCommands, a2 as movePath, a3 as parseCommandLine, a4 as readBytesFile, a5 as readTextFile, a6 as registerBuiltinCommands, a7 as registerBuiltinCommandsToRegistry, a8 as removePath, a9 as resolveFsPath, aa as splitFsPath, ab as startInteractiveCli, ac as statPath, ad as systemCommands, ae as touchFile, af as treeText, ag as unbindCliRuntimeSource, ah as useShell, ai as useShellRuntime, aj as useValidParse, ak as validateEditArgs, al as validateNavigateArgs, am as withValidation, an as writeBytesFile, ao as writeTextFile } from './file-operations-BTkZqrAg.js';
export { c as createCliAppConfig } from './app-config-MGBUKfI7.js';
import 'effect';
import './errors-Jkwy0AU7.js';
import 'react';
import 'effect/Cause';
import 'effect/Types';
import './store-Doi5pYJL.js';
import 'tinybase';
import './index-CzSam8TC.js';
import './filesystem-BbmJFc5d.js';
import './branded-D2eQxo7s.js';
import 'zod';

/** All built-in commands combined: filesystem + system + app. */
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

export { AsyncCommandHandler, builtinCommands };
