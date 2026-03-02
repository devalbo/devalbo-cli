import { Store } from 'tinybase';

declare const createDevalboStore: () => Store;
type DevalboStore = Store;

export { type DevalboStore as D, createDevalboStore as c };
