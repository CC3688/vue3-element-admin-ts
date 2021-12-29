import echarts, { ECOption } from '@/vendor/echarts'

import { onUnmounted, onMounted } from 'vue'
import { debounce } from '@/utils'

export const useEcharts = (
  id: string,
  options: ECOption
): { myChart: echarts.ECharts | null } => {
  const obj: { myChart: echarts.ECharts | null } = { myChart: null }

  const resizeHandler = debounce(() => {
    ;(obj.myChart as echarts.ECharts).resize({ animation: { duration: 600 } })
  }, 500)

  onMounted(() => {
    const ref = document.getElementById(id)
    if (ref) {
      obj.myChart = echarts.init(ref)
      obj.myChart.setOption(options)
    }
    window.addEventListener('resize', resizeHandler, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler, false)
  })

  return obj
}
