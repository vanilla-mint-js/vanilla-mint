import { viteConfigFactory } from '@onivoro/onix';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mergeConfig } from 'vite';

const baseConfig = viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/component-sequence-diagram',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/component-sequence-diagram',
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
