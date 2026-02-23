# @devalbo-cli/shared

Shared primitives across devalbo packages.

## Exports

- branded path helpers: `unsafeAsFilePath`, `unsafeAsDirectoryPath`
- platform detection: `detectPlatform`
- DI container: `ServiceContainer`
- typed errors: `MissingArgument`, `FileNotFound`

## Example

```ts
import { detectPlatform, unsafeAsFilePath } from '@devalbo-cli/shared';

const env = detectPlatform();
const file = unsafeAsFilePath('/tmp/demo.txt');
```
