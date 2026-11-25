import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // Browser-Tests im zentralen Testordner
  testDir: '../tests/Frontend.Tests/End2EndTests',
  testMatch: '**/*.spec.js',

  use: {
    baseURL: 'http://127.0.0.1:5173',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Vue-Frontend automatisch starten
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173 --strictPort',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
})