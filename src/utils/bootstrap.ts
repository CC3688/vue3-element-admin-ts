import { App, Plugin } from 'vue'
import 'normalize.css/normalize.css'
import '@/utils/permission'
import '@/style/index.scss'
import '@/icons'
import allComponent from '@/components/index'

export default {
  install: (app: App) => {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    }

    // 注册全局组件
    for (const key in allComponent) {
      if (Object.prototype.hasOwnProperty.call(allComponent, key)) {
        app.component(key, allComponent[key])
      }
    }
  },
} as Plugin
