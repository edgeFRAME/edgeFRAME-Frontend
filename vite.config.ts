import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/edgeFRAME-Frontend/',
  server: {
    proxy: {
      '/api': {
        target: 'https://web-production-b5116.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      }
    }
  }
})
