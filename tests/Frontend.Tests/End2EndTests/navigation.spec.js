import { createRequire } from 'node:module'

// Playwright aus dem Frontend-Projekt verwenden
const require = createRequire(process.cwd() + '/package.json')
const { test, expect } = require('@playwright/test')

// Testdaten für alle 27 Regalfächer erzeugen
const storageLocations = ['A', 'B', 'C'].flatMap(shelf =>
  [1, 2, 3].flatMap(row =>
    [1, 2, 3].map(column => ({
      code: `${shelf}${row}.${column}`,
      maxCapacity: 10,
      occupiedPairs: 0,
      freeCapacity: 10,
    }))
  )
).map((location, index) => ({
  id: index + 1,
  ...location,
}))

test('Navbar öffnet die Regalübersicht und bleibt beim Scrollen sichtbar', async ({ page }) => {
  // Testdaten ohne Backend bereitstellen
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname

    if (path === '/api/storage') {
      return route.fulfill({ json: storageLocations })
    }

    return route.fulfill({ status: 404 })
  })

  await page.setViewportSize({ width: 1100, height: 480 })
  await page.goto('/')

  const navbar = page.locator('.navbar')

  const regaleButton = navbar.getByRole('button', {
    name: /Regalübersicht/,
  })

  // Startseite überprüfen
  await expect(navbar).toBeVisible()
  await expect(regaleButton).toBeVisible()
  await expect(regaleButton).not.toHaveClass(/active/)

  // Regalübersicht auswählen
  await regaleButton.click()

  await expect(page).toHaveURL(/\/storage$/)
  await expect(regaleButton).toHaveClass(/active/)

  // Kapazitätsübersicht und Regalfächer anzeigen
  await expect(
    page.getByRole('heading', { name: 'Regalkapazität' })
  ).toBeVisible()

  await expect(page.locator('#regale')).toBeVisible()
  await expect(page.locator('.shelf-capacity-item')).toHaveCount(3)

  // Standardmäßig Regal A mit neun Regalfächern anzeigen
  await expect(page.locator('.storage-slot')).toHaveCount(9)

  await expect(
    page.getByText('A1.1', { exact: true })
  ).toBeVisible()

  await expect(page.locator('.storage-summary'))
    .toContainText('0 / 90 Slot(s) belegt')

  // Zu Regal B wechseln
  await page.getByRole('tab', { name: 'Regal B' }).click()

  await expect(page.locator('.storage-slot')).toHaveCount(9)
  await expect(page.getByText('B1.1', { exact: true })).toBeVisible()
  await expect(page.getByText('A1.1', { exact: true })).toHaveCount(0)

  // Zu Regal C wechseln
  await page.getByRole('tab', { name: 'Regal C' }).click()

  await expect(page.locator('.storage-slot')).toHaveCount(9)
  await expect(page.getByText('C1.1', { exact: true })).toBeVisible()
  await expect(page.getByText('B1.1', { exact: true })).toHaveCount(0)

  // Navbar bleibt beim Scrollen am oberen Bildschirmrand
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  await expect(navbar).toHaveCSS('position', 'sticky')

  await expect.poll(async () => {
    return await page.evaluate(() => window.scrollY)
  }).toBeGreaterThan(0)

  await expect.poll(async () => {
    const rect = await navbar.boundingBox()
    return Math.round(rect?.y ?? -999)
  }).toBe(0)
})