import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // Esto expone el proyecto a toda tu red local
    port: 5173,      // Este es el puerto por defecto, puedes asegurarlo aquí
  }
})
