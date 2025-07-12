import { viteConfigFactory } from '@onivoro/onix';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

const baseConfig = viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/component-sequence-diagram',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/component-sequence-diagram',
});

export default mergeConfig(baseConfig, {
  build: {
    rollupOptions: {
      external: [
        '@vanilla-mint/dom',
        '@vanilla-mint/custom',
        '@preact/signals-core',
        'rxjs'
      ]
    }
  },
  plugins: [
    // Override the default DTS plugin with proper external handling
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.lib.json',
      rollupTypes: false,
      pathsToAliases: false // Keep workspace dependencies as package imports
    }),
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
