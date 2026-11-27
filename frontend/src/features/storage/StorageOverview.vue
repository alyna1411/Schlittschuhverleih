<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  locations: { type: Array, default: () => [] },
})

const selectedShelf = ref('A')
const shelves = ['A', 'B', 'C']

const visibleLocations = computed(() => props.locations
  .filter(location => location.code.startsWith(selectedShelf.value))
  .sort((a, b) => a.code.localeCompare(b.code)))

const occupiedTotal = computed(() =>
  visibleLocations.value.reduce((sum, l) => sum + l.occupiedPairs, 0)
)

const capacityTotal = computed(() =>
  visibleLocations.value.reduce((sum, l) => sum + l.maxCapacity, 0)
)

function status(location) {
  if (location.occupiedPairs >= location.maxCapacity) return 'full'
  if (location.occupiedPairs === 0) return 'empty'
  return 'partial'
}
</script>

<template>
  <div class="storage-overview">
    <div
      class="storage-tabs"
      role="tablist"
      aria-label="Regal auswählen"
    >
      <button
        v-for="shelf in shelves"
        :key="shelf"
        type="button"
        role="tab"
        :aria-selected="selectedShelf === shelf"
        :class="{ active: selectedShelf === shelf }"
        @click="selectedShelf = shelf"
      >
        Regal {{ shelf }}
      </button>
    </div>

    <div class="storage-summary">
      <strong>Regal {{ selectedShelf }}</strong>
      <span>
        {{ occupiedTotal }} / {{ capacityTotal }} Slot(s) belegt
      </span>
    </div>

    <div class="storage-grid">
      <div
        v-for="location in visibleLocations"
        :key="location.id"
        class="storage-slot"
        :class="`storage-slot--${status(location)}`"
      >
        <div class="storage-slot-header">
          <strong>{{ location.code }}</strong>
          <span
            class="storage-indicator"
            :class="`storage-indicator--${status(location)}`"
          ></span>
        </div>

        <div class="storage-count">
          {{ location.occupiedPairs }}/{{ location.maxCapacity }}
        </div>

        <div class="storage-progress">
          <div
            class="storage-progress-fill"
            :style="{
              width: `${Math.min(
                100,
                location.maxCapacity
                  ? location.occupiedPairs /
                    location.maxCapacity * 100
                  : 0
              )}%`,
            }"
          ></div>
        </div>

        <span class="storage-free">
          {{
            location.freeCapacity === 0
              ? 'Voll'
              : location.occupiedPairs === 0
                ? `Leer · ${location.freeCapacity} Slot(s) frei`
                : `${location.freeCapacity} Slot(s) frei`
          }}
        </span>
      </div>
    </div>
  </div>
</template>