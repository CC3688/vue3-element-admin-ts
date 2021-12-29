<script lang="ts">
export default { name: 'CompassBrandMonitor' }
</script>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ArrowLeftBold, ArrowRightBold, Top } from '@element-plus/icons'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import MultiLineChart, { ISerie, IYAxis } from './components/MultiLineChart.vue'

interface IPage {
  id: number
  text: string
  checked: boolean
}

const pageInfo = reactive<IPage[]>([
  { id: 1, text: '7天', checked: true },
  { id: 2, text: '30天', checked: false },
  { id: 3, text: '日', checked: false },
  { id: 4, text: '周', checked: false },
  { id: 5, text: '月', checked: false },
  { id: 6, text: '自定义', checked: false },
])

const toggle = (p: IPage) => {
  pageInfo.forEach((i: IPage) => {
    i.checked = false
  })
  p.checked = true
}

const prev = () => {
  const curIndex = pageInfo.findIndex((i) => i.checked)
  if (curIndex === 0) return false
  pageInfo[curIndex].checked = false
  pageInfo[curIndex - 1].checked = true
}

const next = () => {
  const curIndex = pageInfo.findIndex((i) => i.checked)
  if (curIndex === pageInfo.length - 1) return false
  pageInfo[curIndex].checked = false
  pageInfo[curIndex + 1].checked = true
}

const activeTab = ref('全部')
const tabs = ref(['全部', '线上', '门店'])

const mutlCheck = reactive([
  { id: 1, text: '运销商品数' },
  { id: 2, text: '商品动销率' },
  { id: 3, text: '销售额' },
  { id: 4, text: '毛利额' },
])

const checkList = ref(['销售额', '毛利额'])

interface IData {
  [propName: string]: {
    yAxis: IYAxis
    series: ISerie
  }
}

const data: IData = {
  运销商品数: {
    yAxis: {
      type: 'value',
      min: 0,
      max: 250,
      axisLabel: {
        show: false,
      },
    },
    series: {
      name: '运销商品数',
      type: 'line',
      smooth: true,
      data: [
        23.2, 25.6, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        23.2, 25.6, 7.0, 23.2,
      ],
    },
  },
  商品动销率: {
    yAxis: {
      type: 'value',
      min: 0,
      max: 250,
      axisLabel: {
        show: false,
      },
    },
    series: {
      name: '商品动销率',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 48.7, 18.8, 6.0, 2.3, 125.6, 122.2,
        5.9, 9.0, 26.4, 28.7,
      ],
    },
  },
  销售额: {
    yAxis: {
      type: 'value',
      min: 0,
      max: 25,
      axisLabel: {
        show: false,
      },
    },
    series: {
      name: '销售额',
      type: 'line',
      smooth: true,
      yAxisIndex: 2,
      data: [
        2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 10.2,
        20.3, 23.4, 15.2,
      ],
    },
  },
  毛利额: {
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        show: false,
      },
    },
    series: {
      name: '毛利额',
      type: 'line',
      smooth: true,
      yAxisIndex: 3,
      data: [20, 22, 33, 45, 63, 51, 30, 24, 23, 16, 20, 62, 63, 51, 30, 24],
    },
  },
}

const mutilLineData = reactive<{ yAxis: IYAxis[]; series: ISerie[] }>({
  yAxis: [],
  series: [],
})

for (const k in data) {
  mutilLineData.yAxis.push(data[k].yAxis)
}

watch(
  checkList,
  () => {
    mutilLineData.series = []
    checkList.value.forEach((k) => {
      mutilLineData.series.push(data[k].series)
    })
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="monitor">
    <div class="card page">
      <div class="text">统计时间 2021-10-02 ~ 2021-10-08</div>
      <div class="btns">
        <div
          class="el-button el-button--small"
          :class="{ active: p.checked }"
          v-for="p in pageInfo"
          :key="p.id"
          @click="toggle(p)"
        >
          {{ p.text }}
        </div>
        <div class="el-button el-button--small" @click="prev">
          <el-icon>
            <ArrowLeftBold />
          </el-icon>
        </div>
        <div class="el-button el-button--small" @click="next">
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="card tabs">
      <div class="header">
        <span class="size-big">商品概况</span>
        <span class="size-small">在架商品总数：293424</span>
      </div>
      <div class="charts">
        <div class="line">
          <div class="title">商品销额</div>
          <div class="sum">
            <span class="color-gray">支付金额</span>
            <span>166,690.75</span>
          </div>
          <div class="rate">
            <span class="color-gray">较上周同期</span>
            <span class="color-gray">
              7.46%
              <el-icon class="color-red"><Top /></el-icon>
            </span>
          </div>
          <div class="e-image">
            <LineChart />
          </div>
        </div>
        <div class="line">
          <div class="title">中参商品毛利额</div>
          <div class="sum">
            <span class="color-gray">支付金额</span>
            <span>4,255</span>
          </div>
          <div class="rate">
            <span class="color-gray">较上周同期</span>
            <span class="color-gray">
              8.17%
              <el-icon class="color-red"><top /></el-icon>
            </span>
          </div>
          <div class="e-image">
            <LineChart />
          </div>
        </div>
        <div class="pie-chart">
          <PieChart />
          <el-radio-group v-model="activeTab" size="mini">
            <el-radio-button
              v-for="t in tabs"
              :key="t"
              :label="t"
            ></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="card mutli-line">
      <div class="checkbox">
        <div class="text">成交转化</div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="i in mutlCheck" :key="i.id" :label="i.text" />
        </el-checkbox-group>
      </div>
      <MultiLineChart
        :y-axis="mutilLineData.yAxis"
        :series="mutilLineData.series"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.monitor {
  padding-bottom: 50px;
  .page {
    display: flex;
    justify-content: space-between;
    .el-button {
      font-size: 12px;
      .el-icon {
        font-size: 12px;
      }
    }
    .el-button.active {
      background-color: #409eff;
      color: #ffffff;
      border-color: #409eff;
    }
    align-items: center;
  }

  .tabs {
    margin-top: 20px;
    .header {
      line-height: 60px;
      .size-small {
        padding-left: 20px;
      }
    }
  }
  .charts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      padding: 10px;
      flex: 1;
      border: 1px solid #f0f2f5;
      height: 185px;
    }
    > div:nth-child(2) {
      border-left: none;
      border-right: none;
    }
    .line {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 18px;
      }
      .sum,
      .rate {
        display: flex;
        justify-content: space-between;
      }
      .sum > span:nth-child(2) {
        font-size: 20px;
        font-weight: 600;
      }
      .e-image {
        height: 90px;
      }
    }
  }
  .pie-chart {
    position: relative;
    .el-radio-group {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
  .mutli-line {
    margin-top: 20px;
    .checkbox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .text {
        padding-left: 20px;
        padding-right: 20px;
        line-height: 40px;
        background-color: #f5f6f6;
        margin-right: 20px;
      }
    }
  }
}
</style>
