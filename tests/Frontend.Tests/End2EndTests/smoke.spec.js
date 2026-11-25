import { test, expect } from '../../../frontend/node_modules/@playwright/test/index.js'

test('renders the application start page', async ({ page }) => {
  // Act
  await page.goto('/')

  // Assert
  await expect(
    page.getByRole('heading', { name: 'Schlittschuhverleih' })
  ).toBeVisible()
})