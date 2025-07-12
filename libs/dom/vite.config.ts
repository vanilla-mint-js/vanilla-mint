import { viteConfigFactory } from '@onivoro/onix';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

const baseConfig = viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/dom',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/dom',
});

export default mergeConfig(baseConfig, {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'LICENSE',
          dest: '.'
        },
        {
          src: 'README.md',
          dest: '.'
        }
      ]
    })
  ]
});
