import { unsafeAsFilePath } from '@devalbo-cli/shared';
import { InMemoryDriver } from '@devalbo-cli/filesystem';

const driver = new InMemoryDriver();
await driver.writeFile(unsafeAsFilePath('/tmp/demo.txt'), new TextEncoder().encode('demo'));

const bytes = await driver.readFile(unsafeAsFilePath('/tmp/demo.txt'));
console.log(new TextDecoder().decode(bytes));
