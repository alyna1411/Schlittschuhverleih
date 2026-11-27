<script setup>
// Fehlermeldung übernehmen
defineProps({
  message: { type: String, default: '' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="message"
    class="toast-notification toast-error"
    role="status"
  >
    <span class="toast-icon">!</span>
    <div class="toast-content">
      <strong>Hinweis</strong>
      <p>{{ message }}</p>
    </div>
    <button
      type="button"
      class="toast-close"
      aria-label="Benachrichtigung schließen"
      @click="emit('close')"
    >×</button>
  </div>
</template>