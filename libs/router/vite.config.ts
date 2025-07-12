import { viteConfigFactory } from '@onivoro/onix';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mergeConfig } from 'vite';

const baseConfig = viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/router',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/router',
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
