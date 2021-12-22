<script setup lang="ts">
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

const data = [
  { value: 69, name: '男' },
  { value: 31, name: '女' },
]

const colors = ['#409eff', '#ebc2cc']
// 指定图表的配置项和数据
var options: EChartsOption = {
  color: colors,
  title: {
    text: '性别',
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
    bottom: '3%',
    right: 'center',
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '60%'],
      avoidLabelOverlap: true,
      label: {
        show: false,
      },
      center: ['50%', '50%'],
      data: data,
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 380px"></div>
</template>
