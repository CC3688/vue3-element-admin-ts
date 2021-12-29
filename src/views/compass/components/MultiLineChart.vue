<script setup lang="ts">
import { ECOption } from '@/vendor/echarts'
import { ref, defineProps, watch } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

export interface IYAxis {
  type: string
  min: number
  max: number
  axisLabel: {
    show: boolean
  }
}

export interface ISerie {
  name: string
  type: string
  yAxisIndex?: number
  smooth: boolean
  data: number[]
}

interface IData {
  yAxis: IYAxis[]
  series: ISerie[]
}

const props = defineProps<IData>()

// 指定图表的配置项和数据
const colors = ['#5470C6', '#91CC75', '#EE6666', '#ddf516']
const options = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  grid: {
    left: '3%',
    right: '3%',
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: false,
      },
      // prettier-ignore
      data: ['9-07', '9-08', '9-09', '9-10', '9-11', '9-13', '9-15', '9-17', '9-19', '9-21', '9-23', '9-25', '9-29', '10-01', '10-03', '10-07'],
    },
  ],
  yAxis: props.yAxis,
  series: props.series,
}

const obj = useEcharts(id.value, options as ECOption)
watch(
  props,
  () => {
    if (obj.myChart) {
      obj.myChart.clear()
      obj.myChart.setOption({ ...options, series: props.series })
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 400px"></div>
</template>
