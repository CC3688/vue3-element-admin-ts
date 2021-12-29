<script setup lang="ts">
import { ECOption } from '@/vendor/echarts'
import { ref, defineProps } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

interface IProps {
  title: string
  sum: string
}

const props = defineProps<IProps>()

// 指定图表的配置项和数据
var options: ECOption = {
  title: {
    text: props.title,
    top: 0,
    textStyle: {
      fontSize: '12',
      color: '#929292',
      fontWeight: 'normal',
    },
    subtext: props.sum,
    subtextStyle: {
      fontSize: '24',
      color: '#272727',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['前日', '昨日'],
    bottom: 0,
  },
  grid: {
    top: 100,
    bottom: 50,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ],
    axisLabel: {
      formatter(value) {
        return `${value}日`
      },
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '前日',
      data: [20, 30, 40, 50, 60, 80, 100, 100, 90, 80, 60, 50, 60, 80, 100],
      type: 'line',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '昨日',
      data: [30, 40, 50, 50, 60, 70, 90, 100, 110, 120, 100, 90, 80, 80, 60],
      type: 'line',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 400px"></div>
</template>
