import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Entwicklungsserver und Weiterleitung an ASP.NET-Core-Backend konfigurieren
export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      // API-Anfragen vom Vue-Frontend an das Backend weiterleiten
      '/api': {
        target: 'http://localhost:5124',
        changeOrigin: true,
      },
    },
  },
})
