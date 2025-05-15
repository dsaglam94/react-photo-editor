import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactPhotoEditor',
      fileName: 'react-photo-editor',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: true, // ✅ preserve import paths
        exports: 'named', // ✅ use named exports
      },
    },
    minify: false, // ✅ disable minification to keep export names readable
  },
});
