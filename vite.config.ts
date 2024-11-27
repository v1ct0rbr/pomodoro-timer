import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set a custom port
    host: '0.0.0.0', // Bind to all available network interfaces
    open: true, // Open the browser automatically when the server starts
  },
  preview: {
    port: 3000,
  },
})
