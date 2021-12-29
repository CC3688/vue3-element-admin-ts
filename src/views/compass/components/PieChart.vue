<script setup lang="ts">
import { ECOption } from '@/vendor/echarts'
import { ref } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'

const id = ref()
id.value = 'echarts_id_' + Math.random().toString().slice(2)

const data = [
  { value: 36, name: '家用电器' },
  { value: 20, name: '食用酒水' },
  { value: 16, name: '个护健康' },
  { value: 10, name: '服饰箱包' },
  { value: 9, name: '母婴产品' },
  { value: 9, name: '其它' },
]

// 指定图表的配置项和数据
var options: ECOption = {
  title: {
    text: '销售额类别占比',
    top: 5,
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
    right: 'right',
    orient: 'vertical',
    formatter: (v) => {
      const item = data.find((i) => i.name === v)
      return `${v}\t\t ${item?.value}% \t\t ¥${item?.value}`
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '60%'],
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: 'center',
        formatter: `销售额\t\n¥123,244`,
        fontSize: '14',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
        },
      },
      labelLine: {
        show: false,
      },
      center: ['20%', '50%'],
      data: data,
    },
  ],
}

useEcharts(id.value, options)
</script>

<template>
  <div ref="main" :id="id" style="width: 100%; height: 185px"></div>
</template>
