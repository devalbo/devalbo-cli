# @devalbo-cli/filesystem

Filesystem drivers and watcher abstractions.

## Exports

- `NativeFSDriver`
- `InMemoryDriver`
- `ZenFSDriver` (stub)
- `createWatcherService`

## Example

```ts
import { InMemoryDriver } from '@devalbo-cli/filesystem';
import { unsafeAsFilePath } from '@devalbo-cli/shared';

const fs = new InMemoryDriver();
await fs.writeFile(unsafeAsFilePath('/tmp/a.txt'), new TextEncoder().encode('hello'));
```
