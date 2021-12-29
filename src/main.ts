import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import bootstrap from '@/plugins/bootstrap'

const app = createApp(App)
app.use(bootstrap).use(store, key).use(router).mount('#app')

export { app }
