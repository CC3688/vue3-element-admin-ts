<script setup lang="ts">
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

const data = [
  { value: 70, name: '新用户' },
  { value: 30, name: '老用户' },
]

// 指定图表的配置项和数据
var options: EChartsOption = {
  title: {
    text: '新老占比',
    top: 20,
    textStyle: {
      fontSize: '14',
      fontWeight: 'normal',
    },
  },
  grid: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // graphic: {
  //   type: 'text',
  //   left: '15%',
  //   top: 'center',
  //   style: {
  //     text: '销售额',
  //     textAlign: 'center',
  //     fill: '#333',
  //     fontSize: 10,
  //     fontWeight: 400,
  //   },
  // },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'center',
    right: '10%',
    orient: 'vertical',
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '60%'],
      avoidLabelOverlap: true,
      label: {
        show: false,
      },
      center: ['30%', '50%'],
      data: data,
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 380px"></div>
</template>
