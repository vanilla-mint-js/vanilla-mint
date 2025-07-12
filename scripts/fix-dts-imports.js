#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of relative paths to package names
const pathToPackageMap = {
  'dom/src': '@vanilla-mint/dom',
  'router/src': '@vanilla-mint/router',
  'router-dom/src': '@vanilla-mint/router-dom',
  'forms/src': '@vanilla-mint/forms',
  'svg/src': '@vanilla-mint/svg',
  'components/src': '@vanilla-mint/components',
  'custom/src': '@vanilla-mint/custom',
  'component-pdf-viewer/src': '@vanilla-mint/component-pdf-viewer',
  'component-qr-code/src': '@vanilla-mint/component-qr-code',
  'component-sequence-diagram/src': '@vanilla-mint/component-sequence-diagram',
  'component-sig-pad/src': '@vanilla-mint/component-sig-pad',
  'component-csv-table/src': '@vanilla-mint/component-csv-table'
};

function fixImportPath(importPath) {
  // Remove .ts extension
  let fixedPath = importPath.replace(/\.ts(['"]?)$/, '$1');
  
  // Check if it's a relative path that needs to be converted to a package name
  if (fixedPath.startsWith('../')) {
    // Count how many levels up we go
    const upLevels = (fixedPath.match(/\.\.\//g) || []).length;
    
    // Check each package mapping
    for (const [pathPart, packageName] of Object.entries(pathToPackageMap)) {
      if (fixedPath.includes(pathPart)) {
        // Extract the path after the package src directory
        const regex = new RegExp(`(\\.\\.\\/)+${pathPart.replace('/', '\\/')}(\\/.*)?`);
        const match = fixedPath.match(regex);
        if (match) {
          const subPath = match[2] || '';
          // Remove the trailing quote if present
          const cleanSubPath = subPath.replace(/['"]$/, '');
          return packageName + (cleanSubPath === '/index' || cleanSubPath === '' ? '' : cleanSubPath);
        }
      }
    }
  }
  
  return fixedPath;
}

function fixDeclarationFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Fix import statements
  const importRegex = /from\s+['"](\.\.\/[^'"]+)['"]/g;
  content = content.replace(importRegex, (match, importPath) => {
    const fixedPath = fixImportPath(importPath);
    if (fixedPath !== importPath) {
      modified = true;
      return `from '${fixedPath}'`;
    }
    return match;
  });
  
  // Fix export statements
  const exportRegex = /export\s+.*?\s+from\s+['"](\.\.\/[^'"]+)['"]/g;
  content = content.replace(exportRegex, (match, importPath) => {
    const fixedPath = fixImportPath(importPath);
    if (fixedPath !== importPath) {
      modified = true;
      return match.replace(importPath, fixedPath);
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed imports in: ${filePath}`);
  } else {
    console.log(`  No changes needed for: ${filePath}`);
  }
}

function main() {
  const distPath = path.join(__dirname, '..', 'dist', 'libs');
  
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist/libs directory not found. Please build the project first.');
    process.exit(1);
  }
  
  // Find all .d.ts files in the dist directory
  const pattern = path.join(distPath, '**/*.d.ts');
  const files = glob.sync(pattern);
  
  console.log(`Found ${files.length} TypeScript declaration files to process...\n`);
  
  files.forEach(fixDeclarationFile);
  
  console.log('\n✅ Declaration file imports fixed successfully!');
}

// Check if glob is installed
try {
  require.resolve('glob');
  main();
} catch (e) {
  console.error('Error: glob package is not installed.');
  console.error('Please run: npm install --save-dev glob');
  process.exit(1);
}