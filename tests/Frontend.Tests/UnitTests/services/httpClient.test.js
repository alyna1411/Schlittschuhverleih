import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from '../../../../frontend/src/services/httpClient.js'

// Globale Mock-Funktionen nach jedem Test zurücksetzen
afterEach(() => {
  vi.unstubAllGlobals()
})

describe('httpClient', () => {
  // GET-Anfrage an den korrekten API-Pfad senden
  it('ruft JSON-Daten über den API-Pfad ab', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )

    vi.stubGlobal('fetch', fetchMock)

    const result = await apiRequest('/storage')

    expect(result).toEqual([])
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock).toHaveBeenCalledWith('/api/storage')
  })

  // Fehlermeldung aus der Backend-Antwort übernehmen
  it('zeigt die Fehlermeldung des Backends', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({
          detail: 'Lagerorte konnten nicht geladen werden.',
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/problem+json',
          },
        })
      )
    )

    await expect(
      apiRequest('/storage')
    ).rejects.toThrow('Lagerorte konnten nicht geladen werden.')
  })

  // Standardfehlermeldung bei fehlender JSON-Fehlerantwort verwenden
  it('zeigt eine Standardfehlermeldung bei HTTP-Fehlern', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(null, { status: 502 })
      )
    )

    await expect(
      apiRequest('/storage')
    ).rejects.toThrow('API-Anfrage fehlgeschlagen (HTTP 502).')
  })
})