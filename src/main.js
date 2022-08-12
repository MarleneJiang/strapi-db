import { createApp } from 'vue'
import App from './App.vue'
import strapiDb from 'strapi-db'
createApp(App).use(strapiDb).mount('#app')
