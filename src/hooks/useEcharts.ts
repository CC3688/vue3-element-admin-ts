import { init, EChartsType, EChartsOption } from 'echarts'
import { onUnmounted, onMounted } from 'vue'
import { debounce } from '@/utils'

export const useEcharts = (
  id: string,
  options: EChartsOption
): { myChart: EChartsType | null } => {
  const obj: { myChart: EChartsType | null } = { myChart: null }

  const resizeHandler = debounce(() => {
    ;(obj.myChart as EChartsType).resize({ animation: { duration: 600 } })
  }, 500)

  onMounted(() => {
    const ref = document.getElementById(id)
    if (ref) {
      obj.myChart = init(ref)
      obj.myChart.setOption(options)
    }
    window.addEventListener('resize', resizeHandler, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler, false)
  })

  return obj
}
