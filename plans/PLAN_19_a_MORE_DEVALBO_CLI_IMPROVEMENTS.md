
#### 1. Verify root exports for `Spinner`, `useKeyboard`, `FILE_TREE_TABLE` ✅ DONE (v0.2.x)

**Implemented:** Added to both `src/index.ts` (node) and `src/index.browser.ts`:

- `Spinner`, `useKeyboard` — re-exported from `@devalbo-cli/ui`
- `FILE_TREE_TABLE` — re-exported from `@devalbo-cli/state`

#### 2. Make `AppConfig` extensible for custom fields ✅ DONE (v0.2.x)

**Implemented:** Added `[key: string]: unknown` index signature to `AppConfig` in `packages/shared/src/app-config.ts`. Consuming apps can spread `createCliAppConfig()` and attach custom fields without a type error. All existing named fields are compatible with `unknown`.

#### 3. Export command result helpers from the root ✅ DONE (v0.2.0)

`makeOutput`, `makeResult`, `makeResultError`, and `makeError` are exported from both `src/index.ts` and `src/index.browser.ts`.

#### 4. Export `StoreCommandHandler` from the root ✅ DONE (v0.2.0)

`StoreCommandHandler` is exported from both `src/index.ts` and `src/index.browser.ts`.
