import { computed, inject, ref } from 'vue'
import { getAllStorageLocations } from '../services/storageApi'

export const rentalSystemKey = Symbol('rental-system')

export function useRentalSystem() {
  const system = inject(rentalSystemKey)
  if (!system) throw new Error('RentalSystemProvider fehlt.')
  return system
}

export function createRentalSystem() {
  const storageLocations = ref([])
  const error = ref('')

  const shelfCapacity = computed(() => ['A', 'B', 'C'].map(shelf => {
    const locations = storageLocations.value.filter(l => l.code.startsWith(shelf))
    return {
      shelf,
      occupied: locations.reduce((sum, l) => sum + l.occupiedPairs, 0),
      maximum: locations.reduce((sum, l) => sum + l.maxCapacity, 0),
    }
  }))

  function closeToast() {
    error.value = ''
  }

  async function loadStorage() {
    storageLocations.value = await getAllStorageLocations()
  }

  async function loadAll() {
    try {
      await loadStorage()
    } catch (err) {
      error.value = err?.message ?? 'Daten konnten nicht geladen werden.'
    }
  }

  return {
    storageLocations,
    error,
    shelfCapacity,
    closeToast,
    loadAll,
  }
}