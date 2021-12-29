<script setup lang="ts">
import { ECOption } from '@/vendor/echarts'
import { ref, defineProps } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

interface IProps {
  title: string
  sum: string
  data: number[]
}

const props = defineProps<IProps>()

// 指定图表的配置项和数据
var options: ECOption = {
  title: {
    text: props.title,
    top: 30,
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
  xAxis: {
    data: [],
  },
  yAxis: {
    axisLabel: {
      formatter: '',
    },
  },
  grid: {
    top: 100,
    bottom: 10,
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: props.data,
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 180px"></div>
</template>
