import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import bootstrap from '@/utils/bootstrap'

createApp(App).use(bootstrap).use(store, key).use(router).mount('#app')
