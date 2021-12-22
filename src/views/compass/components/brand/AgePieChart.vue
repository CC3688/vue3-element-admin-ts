<script setup lang="ts">
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

const data = [
  { value: 1893, name: '18-25岁' },
  { value: 1756, name: '26-30岁' },
  { value: 2440, name: '31-35岁' },
  { value: 1840, name: '36-40岁' },
  { value: 1556, name: '41-50岁' },
  { value: 515, name: '51岁以上' },
]

// 指定图表的配置项和数据
var options: EChartsOption = {
  title: {
    text: '预测年龄分布',
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
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'center',
    right: '10%',
    orient: 'vertical',
    formatter: (v) => {
      const item = data.find((i) => i.name === v)
      const sum = data.reduce((pre, cur) => {
        return pre + cur.value
      }, 0)
      const percent = item ? ((item.value / sum) * 100).toFixed(2) + '%' : ''
      return `${v}    ${percent}`
    },
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
