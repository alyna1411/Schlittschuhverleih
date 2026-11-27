import { afterEach, describe, expect, it, vi } from 'vitest'
import { createRentalSystem } from '../../../../frontend/src/composables/useRentalSystem.js'
import { getAllStorageLocations } from '../../../../frontend/src/services/storageApi.js'

// API-Aufrufe durch Mock-Funktionen ersetzen
vi.mock('../../../../frontend/src/services/storageApi.js', () => ({
  getAllStorageLocations: vi.fn(),
}))

// Mock-Funktionen nach jedem Test zurücksetzen
afterEach(() => {
  vi.resetAllMocks()
})

// Testdaten für die Regale A, B und C
const locations = [
  { id: 1, code: 'A1.1', maxCapacity: 10, occupiedPairs: 3, freeCapacity: 7 },
  { id: 2, code: 'A1.2', maxCapacity: 10, occupiedPairs: 5, freeCapacity: 5 },
  { id: 3, code: 'B1.1', maxCapacity: 10, occupiedPairs: 2, freeCapacity: 8 },
  { id: 4, code: 'C1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
]

describe('useRentalSystem', () => {
  // Anwendungszustand ohne vorhandene Daten initialisieren
  it('initialisiert einen leeren Anwendungszustand', () => {
    const system = createRentalSystem()

    expect(system.storageLocations.value).toEqual([])
    expect(system.error.value).toBe('')
  })

  // Lagerorte abrufen und im reaktiven Zustand speichern
  it('lädt die Lagerorte erfolgreich', async () => {
    getAllStorageLocations.mockResolvedValue(locations)

    const system = createRentalSystem()

    await system.loadAll()

    expect(getAllStorageLocations).toHaveBeenCalledOnce()
    expect(system.storageLocations.value).toEqual(locations)
    expect(system.error.value).toBe('')
  })

  // Zusammengefasste Kapazitäten je Regal berechnen
  it('berechnet die Kapazitäten der Regale korrekt', async () => {
    getAllStorageLocations.mockResolvedValue(locations)

    const system = createRentalSystem()

    await system.loadAll()

    expect(system.shelfCapacity.value).toEqual([
      { shelf: 'A', occupied: 8, maximum: 20 },
      { shelf: 'B', occupied: 2, maximum: 10 },
      { shelf: 'C', occupied: 0, maximum: 10 },
    ])
  })

  // Fehler beim Laden der Lagerorte im Zustand speichern
  it('behandelt Fehler beim Laden der Lagerorte', async () => {
    getAllStorageLocations.mockRejectedValue(
      new Error('Lagerorte konnten nicht geladen werden.')
    )

    const system = createRentalSystem()

    await system.loadAll()

    expect(system.error.value)
      .toBe('Lagerorte konnten nicht geladen werden.')

    expect(system.storageLocations.value).toEqual([])
  })

  // Fehlermeldung beim Schließen der Benachrichtigung zurücksetzen
  it('setzt die Fehlermeldung zurück', () => {
    const system = createRentalSystem()

    system.error.value = 'Testfehlermeldung'

    system.closeToast()

    expect(system.error.value).toBe('')
  })
})