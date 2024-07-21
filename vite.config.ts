import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from "path";
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
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
  build: {
    minify: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // Naming pattern for JS chunks
        entryFileNames: 'js/[name]-[hash].js', // Naming pattern for JS entry files
        assetFileNames: ({ name }) => {
          // output path for different types of assets
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'img/[name][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/styles-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name][extname]';
          }
          // Default output path for other assets
          return '[name]-[hash][extname]';
        },
      },
    }
  }
})
