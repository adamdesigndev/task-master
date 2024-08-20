import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Ensure correct output directory
  build: {
    outDir: 'dist',
  },
  // Optional: server configuration, can be useful for local development
  server: {
    port: 3000,
  }
});