import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from "path";
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    sourcemap: true,
    postcss: ({
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
      sourceMap: true
    }),
  },
  server: {
    host: '0.0.0.0',
    port: 5001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
