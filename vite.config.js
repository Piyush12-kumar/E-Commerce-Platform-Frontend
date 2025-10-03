import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to our Spring Boot backend
      '/api': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // If you're using https
      },
      // Proxy /images requests to backend for image serving
      '/images': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})