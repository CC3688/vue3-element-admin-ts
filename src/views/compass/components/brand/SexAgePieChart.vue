<script setup lang="ts">
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

// 指定图表的配置项和数据
var options = {
  title: {
    text: '人群类型',
    top: 20,
    textStyle: {
      fontSize: '14',
      fontWeight: 'normal',
    },
  },
  legend: {
    bottom: '10',
    right: 'center',
  },
  grid: {
    top: 60,
    left: 50,
    right: 0,
    bottom: 50,
  },
  tooltip: {
    trigger: 'axis',
    formatter(obj: any[]) {
      return `${obj[0].name} <br />
      ${obj[1].marker}${obj[1].seriesName}   ${-obj[1].value} <br />
      ${obj[0].marker}${obj[0].seriesName}   ${obj[0].value} 
      `
    },
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: [
    {
      type: 'value',
      boundaryGap: [1, 1],
      axisLabel: {},
    },
  ],
  yAxis: {
    type: 'category',
    data: ['<18', '18-30', '31-40', '41-50', '51-60', '60+'],
  },
  series: [
    {
      name: '女',
      type: 'bar',
      stack: 'Total',
      data: [100, 250, 300, 270, 200, 80],
      itemStyle: {
        borderWidth: 150,
      },
    },
    {
      name: '男',
      type: 'bar',
      stack: 'Total',
      data: [-120, -260, -300, -250, -180, -70],
    },
  ],
}

useEcharts(id.value, options as EChartsOption)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 380px"></div>
</template>
