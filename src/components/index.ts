import { importComponent } from '@/utils/importAll'

const res = importComponent(require.context('./', true, /\.vue$/))

export default res
