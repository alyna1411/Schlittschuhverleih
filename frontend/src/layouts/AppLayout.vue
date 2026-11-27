<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import AppNavbar from './AppNavbar.vue'
import ToastNotification from '../components/ui/ToastNotification.vue'
import { useRentalSystem } from '../composables/useRentalSystem'

const route = useRoute()
const router = useRouter()
const system = useRentalSystem()

// Aktiven Navigationsbereich anhand der Route ermitteln
const activeSection = computed(() =>
  route.name === 'regale' ? 'regale' : ''
)

// Zum ausgewählten Navigationsbereich wechseln
async function selectSection(section) {
  const paths = { regale: '/storage' }

  if (!paths[section]) return

  await router.push(paths[section])
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<template>
  <div class="app-layout">
    <AppNavbar
      :active-section="activeSection"
      @select-section="selectSection"
    />

    <main class="main-content">
      <RouterView />
    </main>

    <ToastNotification
      :message="system.error.value"
      @close="system.closeToast()"
    />
  </div>
</template>