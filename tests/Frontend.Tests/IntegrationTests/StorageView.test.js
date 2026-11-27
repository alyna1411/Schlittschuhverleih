import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StorageView from '../../../frontend/src/views/StorageView.vue'
import {
  createRentalSystem,
  rentalSystemKey,
} from '../../../frontend/src/composables/useRentalSystem.js'
import { getAllStorageLocations } from '../../../frontend/src/services/storageApi.js'

// API-Aufruf durch eine Mock-Funktion ersetzen
vi.mock('../../../frontend/src/services/storageApi.js', () => ({
  getAllStorageLocations: vi.fn(),
}))

// Mock-Funktionen nach jedem Test zurücksetzen
afterEach(() => {
  vi.resetAllMocks()
})

describe('StorageView', () => {
  // Zusammenspiel von Datenabruf, Zustandsverwaltung und Darstellung prüfen
  it('zeigt die geladenen Lagerorte und Regalkapazitäten an', async () => {
    const locations = [
      { id: 1, code: 'A1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
      { id: 2, code: 'B1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
      { id: 3, code: 'C1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
    ]

    getAllStorageLocations.mockResolvedValue(locations)

    const system = createRentalSystem()

    // Gemeinsamen Anwendungszustand für die View bereitstellen
    const wrapper = mount(StorageView, {
      global: {
        provide: {
          [rentalSystemKey]: system,
        },
      },
    })

    // Lagerdaten laden und reaktive Darstellung aktualisieren
    await system.loadAll()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toBe('Regalübersicht')
    expect(wrapper.findAll('.shelf-capacity-item')).toHaveLength(3)
    expect(wrapper.find('.storage-slot').text()).toContain('A1.1')

    // Wechsel zu Regal B überprüfen
    await wrapper.findAll('.storage-tabs button')[1].trigger('click')

    expect(wrapper.find('.storage-slot').text()).toContain('B1.1')

    wrapper.unmount()
  })
})