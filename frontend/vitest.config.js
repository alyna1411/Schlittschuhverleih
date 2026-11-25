import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

// Zentrale Teststruktur konfigurieren
export default defineConfig({
  root: fileURLToPath(new URL('../', import.meta.url)),

  plugins: [vue()],

  resolve: {
    alias: {
      vitest: fileURLToPath(import.meta.resolve('vitest')),
      '@vue/test-utils': fileURLToPath(import.meta.resolve('@vue/test-utils')),
      vue: fileURLToPath(import.meta.resolve('vue')),
    },
  },

  test: {
    environment: 'jsdom',
    include: ['tests/Frontend.Tests/**/*.test.js'],
  },
})