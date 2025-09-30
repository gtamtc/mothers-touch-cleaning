import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: '5173-iwu5f0rk5t8qzkkdeff4v-2ac5772c.manusvm.computer',
      protocol: 'wss'
    },
    watch: {
      usePolling: true
    }
  }
})
