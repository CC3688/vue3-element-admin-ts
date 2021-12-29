<script setup lang="ts">
import echarts, { ECOption } from '@/vendor/echarts'
import { ref, defineProps } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

const props = defineProps({
  height: {
    type: Number,
    default: 80,
  },
})

// 指定图表的配置项和数据
var options: ECOption = {
  grid: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    show: false,
    axisLabel: {
      formatter(value) {
        return `${value}日`
      },
    },
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      data: [
        0, 10, 20, 20, 80, 60, 30, 20, 30, 40, 30, 30, 20, 40, 30, 20, 10, 0,
      ],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)',
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div
    ref="main"
    :id="id"
    style="width: 100%"
    :style="{ height: props.height + 'px' }"
  ></div>
</template>
