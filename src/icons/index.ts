import { app } from '@/main'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
// register globally
app.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext: => requireContext.keys().map(requireContext)
// requireAll(req)
req.keys().map(req)
