import { EChartsType } from 'echarts'
import { onUnmounted } from 'vue'
import { debounce } from '@/utils'

export const useResize = (echart: EChartsType) => {
  const resizeHandler = debounce(() => {
    echart.resize({ animation: { duration: 600 } })
  }, 500)

  window.addEventListener('resize', resizeHandler, false)

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler, false)
  })
}
