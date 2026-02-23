/**
 * Re-export node polyfills plugin for Vite browser builds.
 * Use in your app's vite.config: plugins: [react(), nodePolyfills()]
 * so devalbo-cli and ink-web work in the browser.
 */
export { nodePolyfills } from 'vite-plugin-node-polyfills';
