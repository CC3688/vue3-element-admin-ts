import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import bootstrap from '@/utils/bootstrap'
import SvgIcon from '@/icons'

const app = createApp(App)
app.use(bootstrap).use(SvgIcon).use(store, key).use(router).mount('#app')

export { app }
