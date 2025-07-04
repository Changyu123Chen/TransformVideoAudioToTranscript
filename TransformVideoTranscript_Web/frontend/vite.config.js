import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, 
    proxy: {
      '/upload': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },

      '/download': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,        
      }
    }
  }
})
