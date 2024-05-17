import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'web/public',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './web')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
