import { App, Plugin } from 'vue'
import 'normalize.css/normalize.css'
import '@/utils/permission'
import '@/style/index.scss'
import { elementUI } from '@/plugin'

export default {
  install: (app: App) => {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    }
    app.use(elementUI)
  },
} as Plugin
