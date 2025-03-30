import { viteConfigFactory } from '@onivoro/onix';

export default viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/component-sequence-diagram',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/component-sequence-diagram',
});
