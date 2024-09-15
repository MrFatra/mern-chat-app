import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    proxy: {
      // '/api': { target: 'http://127.0.0.1:3000'}
      '/api': { target: 'http://backend:3000'}
    }
  }
})
