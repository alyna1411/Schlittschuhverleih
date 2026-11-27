import { afterEach, describe, expect, it, vi } from 'vitest'
import { getAllStorageLocations } from '../../../../frontend/src/services/storageApi.js'
import { apiRequest } from '../../../../frontend/src/services/httpClient.js'

// HTTP-Client durch eine Mock-Funktion ersetzen
vi.mock('../../../../frontend/src/services/httpClient.js', () => ({
  apiRequest: vi.fn(),
}))

// Mock-Funktionen nach jedem Test zurücksetzen
afterEach(() => {
  vi.resetAllMocks()
})

describe('storageApi', () => {
  // Lagerorte über den korrekten API-Endpunkt abrufen
  it('ruft alle Lagerorte ab', async () => {
    const locations = [
      {
        id: 1,
        code: 'A1.1',
        maxCapacity: 10,
        occupiedPairs: 0,
        freeCapacity: 10,
      },
    ]

    apiRequest.mockResolvedValue(locations)

    const result = await getAllStorageLocations()

    expect(apiRequest).toHaveBeenCalledOnce()
    expect(apiRequest).toHaveBeenCalledWith('/storage')
    expect(result).toEqual(locations)
  })

  // Fehler des HTTP-Clients an den Aufrufer weitergeben
  it('gibt Fehler beim Abrufen der Lagerorte weiter', async () => {
    apiRequest.mockRejectedValue(
      new Error('Lagerorte konnten nicht geladen werden.')
    )

    await expect(
      getAllStorageLocations()
    ).rejects.toThrow('Lagerorte konnten nicht geladen werden.')
  })
})