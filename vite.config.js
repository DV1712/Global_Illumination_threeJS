import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import fs from 'node:fs';
import path from 'node:path';

// export default defineConfig({
//   assetsInclude: '**/*.glsl'],
//   build: {
//     outDir: 'dist'
//   },
//   server: {
//     open: true
//   }
// });


// export default {
//   plugins: [glsl()],
// };

function copyRuntimeAssets() {
  const assetExtensions = new Set(['.glsl', '.jpg', '.jpeg', '.png']);
  const directories = ['shaders', 'images'];
  const collectFiles = (directory) => {
    const files = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        files.push(...collectFiles(entryPath));
      } else if (entry.isFile()) {
        files.push(entryPath);
      }
    }

    return files;
  };

  return {
    name: 'copy-runtime-assets',
    generateBundle() {
      for (const directory of directories) {
        const sourceDirectory = path.resolve(directory);
        if (!fs.existsSync(sourceDirectory)) {
          throw new Error(`Runtime asset directory not found: ${sourceDirectory}`);
        }

        for (const sourcePath of collectFiles(sourceDirectory)) {
          if (!assetExtensions.has(path.extname(sourcePath).toLowerCase())) {
            continue;
          }

          const outputPath = path.relative('.', sourcePath).replaceAll('\\', '/');

          this.emitFile({
            type: 'asset',
            fileName: outputPath,
            source: fs.readFileSync(sourcePath),
          });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [glsl(), copyRuntimeAssets()],
  build: {
    outDir: 'dist',
  }
});