import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // VITE_BASE_URL is set in CI for GitHub Pages (/snake-battle/)
  // Defaults to '/' for local dev and other deployments
  base: process.env.VITE_BASE_URL || '/',
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
  },
  // public/ is used by Express for dev; excluded from Vite build
  // to prevent public/index.html from overwriting the processed bundle
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@client': path.resolve(__dirname, './src/client'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/socket.io': 'http://localhost:3000',
    },
  },
});
