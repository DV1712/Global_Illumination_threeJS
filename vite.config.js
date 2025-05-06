import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// export default defineConfig({
//   assetsInclude: '**/*.glsl'],
//   build: {
//     outDir: 'dist'
//   },
//   server: {
//     open: true
//   }
// });


export default {
  plugins: [glsl()],
};