import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    EnvironmentPlugin(['GOOGLE_AI_API_KEY', 'REACT_APP_GOOGLE_AI_API_KEY'])
  ],
  server: {
    host: '0.0.0.0',
    port:5173,
    proxy: {
    '/api': 'http://localhost:3001', // redirige /api a tu backend
  },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.glb']
})
