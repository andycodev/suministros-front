import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // 1. Asegura que las rutas de los assets sean absolutas
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5173,
    // 2. Esto es clave para que al recargar en /order funcione
    strictPort: true,
  },
  // 3. Configuración para que el navegador no se pierda al recargar
  preview: {
    port: 5173,
    strictPort: true,
  }
})