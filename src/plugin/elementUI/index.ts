import 'element-plus/lib/theme-chalk/index.css'
import { ElButton } from 'element-plus'
import { App, Plugin } from 'vue'

const el: Plugin = {} as Plugin

el.install = function (app: App) {
  app.use(ElButton)
}

export default el
