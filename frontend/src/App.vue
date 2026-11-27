<script setup>
import { onMounted, provide } from 'vue'
// Root-Komponente rendert das Hauptlayout
import AppLayout from './layouts/AppLayout.vue'
import {
  createRentalSystem,
  rentalSystemKey,
} from './composables/useRentalSystem'

// Zentralen Anwendungszustand bereitstellen
const system = createRentalSystem()
provide(rentalSystemKey, system)

// Daten beim Anwendungsstart laden
onMounted(() => system.loadAll())
</script>

<template>
  <AppLayout />
</template>