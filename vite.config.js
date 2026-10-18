import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({


  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for `src` folder
    },
  },
  server: {
    proxy: {
      '/qdrant': {
        target: 'https://ab472062-3f3e-458c-89ac-10b295067104.us-east4-0.gcp.cloud.qdrant.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/qdrant/, ''),
      },
    },
  },
});
