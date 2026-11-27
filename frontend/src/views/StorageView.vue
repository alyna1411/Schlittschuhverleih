<script setup>
import StorageOverview from '../features/storage/StorageOverview.vue'
import { useRentalSystem } from '../composables/useRentalSystem'

const system = useRentalSystem()
</script>

<template>
  <header class="page-header">
    <h1>Regalübersicht</h1>
    <p>Regalkapazitäten und einzelne Fächer im Überblick</p>
  </header>

  <section class="panel storage-capacity-panel">
    <div class="panel-header"><h2>Regalkapazität</h2></div>
    <div class="panel-body">
      <div class="shelf-capacity-grid">
        <div
          v-for="shelf in system.shelfCapacity.value"
          :key="shelf.shelf"
          class="shelf-capacity-item"
        >
          <div class="shelf-capacity-label">
            <strong>Regal {{ shelf.shelf }}</strong>
            <span>{{ shelf.occupied }}/{{ shelf.maximum }}</span>
          </div>
          <div class="storage-progress">
            <div
              class="storage-progress-fill"
              :style="{ width: shelf.maximum ? `${Math.min(100, shelf.occupied / shelf.maximum * 100)}%` : '0%' }"
            ></div>
          </div>
          <small>{{ shelf.maximum - shelf.occupied }} Slot(s) frei</small>
        </div>
      </div>
    </div>
  </section>

  <section id="regale" class="panel">
    <div class="panel-header"><h2>Regalübersicht</h2></div>
    <div class="panel-body">
      <StorageOverview
        :locations="system.storageLocations.value"
      />
    </div>
  </section>
</template>