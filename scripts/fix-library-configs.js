#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Library dependency mapping
const libraryConfig = {
  'dom': {
    workspaceDeps: [],
    externalDeps: [] // dom bundles @preact/signals-core since it's the base library
  },
  'router': {
    workspaceDeps: [],
    externalDeps: []
  },
  'router-dom': {
    workspaceDeps: ['@vanilla-mint/dom', '@vanilla-mint/router'],
    externalDeps: ['@preact/signals-core']
  },
  'forms': {
    workspaceDeps: ['@vanilla-mint/dom'],
    externalDeps: ['@preact/signals-core']
  },
  'component-sequence-diagram': {
    workspaceDeps: ['@vanilla-mint/dom', '@vanilla-mint/custom'],
    externalDeps: ['@preact/signals-core', 'rxjs']
  }
};

function createViteConfig(libName, config) {
  const allExternals = [...config.workspaceDeps, ...config.externalDeps];
  
  const viteConfigContent = `import { viteConfigFactory } from '@onivoro/onix';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

const baseConfig = viteConfigFactory({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/${libName}',
  tsconfigPath: 'tsconfig.lib.json',
  outDir: '../../dist/libs/${libName}',
});

export default mergeConfig(baseConfig, {${allExternals.length > 0 ? `
  build: {
    rollupOptions: {
      external: [${allExternals.map(dep => `\n        '${dep}'`).join(',')}
      ]
    }
  },` : ''}
  plugins: [${allExternals.length > 0 ? `
    // Override the default DTS plugin with proper external handling
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.lib.json',
      rollupTypes: false,
      pathsToAliases: false // Keep workspace dependencies as package imports
    }),` : ''}
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
`;

  return viteConfigContent;
}

function updateLibraryConfig(libName) {
  const libPath = path.join(__dirname, '..', 'libs', libName);
  const viteConfigPath = path.join(libPath, 'vite.config.ts');
  
  if (!fs.existsSync(libPath)) {
    console.log(`❌ Library ${libName} not found at ${libPath}`);
    return;
  }
  
  const config = libraryConfig[libName];
  if (!config) {
    console.log(`❌ No configuration found for library ${libName}`);
    return;
  }
  
  const viteConfigContent = createViteConfig(libName, config);
  
  // Write the updated vite.config.ts
  fs.writeFileSync(viteConfigPath, viteConfigContent);
  console.log(`✅ Updated vite.config.ts for ${libName}`);
  
  if (config.workspaceDeps.length > 0 || config.externalDeps.length > 0) {
    console.log(`   External dependencies: ${[...config.workspaceDeps, ...config.externalDeps].join(', ')}`);
  } else {
    console.log(`   No external dependencies (standalone library)`);
  }
}

function removePostBuildTargets() {
  const libPaths = Object.keys(libraryConfig).map(lib => 
    path.join(__dirname, '..', 'libs', lib, 'project.json')
  );
  
  libPaths.forEach(projectPath => {
    if (!fs.existsSync(projectPath)) return;
    
    const projectJson = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
    const libName = path.basename(path.dirname(projectPath));
    
    // Remove postbuild target since it's no longer needed
    if (projectJson.targets && projectJson.targets.postbuild) {
      delete projectJson.targets.postbuild;
      console.log(`✅ Removed postbuild target from ${libName}`);
    }
    
    // Update publish target to only depend on build
    if (projectJson.targets && projectJson.targets.publish) {
      projectJson.targets.publish.dependsOn = ['build'];
      console.log(`✅ Updated publish dependencies for ${libName}`);
    }
    
    fs.writeFileSync(projectPath, JSON.stringify(projectJson, null, 2) + '\n');
  });
}

function main() {
  console.log('🔧 Updating library configurations with proper external dependencies...\\n');
  
  // Update each library's vite.config.ts
  Object.keys(libraryConfig).forEach(updateLibraryConfig);
  
  console.log('\\n🔧 Removing postbuild targets (no longer needed)...\\n');
  
  // Remove postbuild targets from project.json files
  removePostBuildTargets();
  
  console.log('\\n✅ All library configurations updated successfully!');
  console.log('\\n📦 Libraries are now configured with proper external dependencies.');
  console.log('   - Workspace packages will be imported rather than bundled');
  console.log('   - TypeScript declarations will use package imports');
  console.log('   - Bundle sizes will be significantly smaller');
}

main();