#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Libraries that have TypeScript declarations
const libsWithTypes = [
  'dom',
  'router',
  'router-dom',
  'forms',
  'component-sequence-diagram'
];

function updateProjectConfig(projectPath) {
  const projectJson = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
  const libName = path.basename(path.dirname(projectPath));
  
  if (!libsWithTypes.includes(libName)) {
    console.log(`Skipping ${libName} - no TypeScript declarations`);
    return;
  }
  
  // Check if build target exists
  if (!projectJson.targets || !projectJson.targets.build) {
    console.log(`Skipping ${libName} - no build target`);
    return;
  }
  
  // Add postbuild target if it doesn't exist
  if (!projectJson.targets.postbuild) {
    projectJson.targets.postbuild = {
      "executor": "nx:run-commands",
      "dependsOn": ["build"],
      "options": {
        "command": "node scripts/fix-dts-imports.js"
      }
    };
    console.log(`✓ Added postbuild target to ${libName}`);
  }
  
  // Update publish target to depend on postbuild
  if (projectJson.targets.publish) {
    const deps = projectJson.targets.publish.dependsOn || [];
    if (!deps.includes('postbuild') && deps.includes('build')) {
      projectJson.targets.publish.dependsOn = [...deps, 'postbuild'];
      console.log(`✓ Updated publish dependencies for ${libName}`);
    }
  }
  
  // Write the updated project.json
  fs.writeFileSync(projectPath, JSON.stringify(projectJson, null, 2) + '\n');
}

function main() {
  const libsPath = path.join(__dirname, '..', 'libs');
  const pattern = path.join(libsPath, '**/project.json');
  const files = glob.sync(pattern);
  
  console.log(`Found ${files.length} project.json files to process...\n`);
  
  files.forEach(updateProjectConfig);
  
  console.log('\n✅ Project configurations updated successfully!');
}

main();