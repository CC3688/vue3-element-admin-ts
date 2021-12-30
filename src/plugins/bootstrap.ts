import { App } from 'vue'
import 'normalize.css/normalize.css'
import '@/utils/permission'
import '@/icons'
import allComponent from '@/components/index'
import '@/style/index.scss'

export default (app: App) => {
  app.config.globalProperties.$ELEMENT = {
    size: 'small',
  }

  // 注册全局组件
  for (const key in allComponent) {
    if (Object.prototype.hasOwnProperty.call(allComponent, key)) {
      app.component(key, allComponent[key])
    }
  }
}
