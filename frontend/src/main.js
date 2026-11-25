import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Vue-Anwendung mit Router starten
createApp(App)
  .use(router)
  .mount('#app')