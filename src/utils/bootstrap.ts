import { App, Plugin } from 'vue'
import 'normalize.css/normalize.css'
import '@/utils/permission'
import '@/style/index.scss'

export default {
  install: (app: App) => {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    }
  },
} as Plugin
