<script setup lang="ts">
import { ECOption } from '@/vendor/echarts'
import { ref, defineProps } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

interface IProps {
  total: number
  sum: number
}

const props = defineProps<IProps>()

// 指定图表的配置项和数据
const gaugeData = [
  {
    value: ((props.sum * 100) / props.total).toFixed(2),
    title: {
      offsetCenter: ['-50%', '-50%'],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '0%'],
    },
  },
]

const options = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
      },
      axisLine: {
        lineStyle: {
          width: 10,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: 'inherit',
        formatter: '{value}%',
      },
    },
  ],
}

useEcharts(id.value, options as ECOption)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 120px"></div>
</template>
