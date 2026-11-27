<script setup>
// Aktiven Bereich von AppLayout übernehmen
defineProps({
  activeSection: {
    type: String,
    default: '',
  },
})

// Auswahl des Navigationsbereichs an AppLayout übergeben
const emit = defineEmits(['select-section'])
</script>

<template>
  <header class="navbar">
    <div class="navbar-brand">
      <span class="brand-icon">❄</span>
      <span class="brand-text">Schlittschuhverleih</span>
    </div>

    <nav class="navbar-nav" aria-label="Hauptnavigation">
      <button
        type="button"
        class="nav-link nav-link--storage"
        :class="{ active: activeSection === 'regale' }"
        @click="emit('select-section', 'regale')"
      >
        ▤ Regalübersicht
      </button>
    </nav>
  </header>
</template>