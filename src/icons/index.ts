import { App, Plugin } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

export default {
  install: (app: App) => {
    app.component('svg-icon', SvgIcon)
  },
} as Plugin

// register globally

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext)

requireAll(req)
