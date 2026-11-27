import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import StorageView from '../views/StorageView.vue'

// Router und verfügbare Anwendungsrouten konfigurieren
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Startseite
    { path: '/', component: DashboardView },

    // Regalübersicht
    { path: '/storage', name: 'regale', component: StorageView },
  ],
})

export default router