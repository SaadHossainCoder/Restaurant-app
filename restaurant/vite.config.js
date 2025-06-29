import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,                // 👈 allows access from network
    strictPort: true,          // optional, locks port so ngrok stays stable
    port: 5173,                // or any custom port you use
    cors: true,                // enables CORS if needed
    hmr: {
      clientPort: 443,         // 👈 important for ngrok HTTPS
    },
    allowedHosts: [
      '.ngrok-free.app',       // 👈 wildcard for ngrok subdomains
    ]
  }
})
