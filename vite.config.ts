import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactPhotoEditor',
      formats: ['es'],
      fileName: (format) => `react-photo-editor.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
        preserveModules: true, // ✅ Preserve module structure
        preserveModulesRoot: 'src', // ✅ Keeps import paths clean
        exports: 'named', // ✅ Avoid default-only export mapping
      },
    },
    minify: false, // ✅ Avoid export name mangling like `ke` and `Be`
  },
});
