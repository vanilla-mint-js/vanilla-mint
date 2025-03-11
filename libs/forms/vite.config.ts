import { viteConfigFactory } from '@onivoro/onix';

export default viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/forms',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/forms',
});
