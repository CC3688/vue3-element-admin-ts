<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue'
import {
  ArrowRight,
  Clock,
  Aim,
  CaretBottom,
  CaretTop,
  ArrowDownBold,
  ArrowUpBold,
} from '@element-plus/icons'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import CardItem from './components/CardItem.vue'

const app = getCurrentInstance()

const barData = reactive({
  salesVolume: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
  rateOfMargin: [20, 36, 10, 10, 5, 36, 10, 10, 20, 5, 20, 20],
})

const itemData = reactive({
  increase: [
    {
      title: '支付金额',
      subtitle: '较日常平均',
      sum: '166,690.75',
      avg: '-15.23%',
      color: 'orange',
    },
    {
      title: '成功退款金额',
      subtitle: '较日常平均',
      sum: '16,332.21',
      avg: '-26.89%',
      color: 'gray',
    },
  ],
  customer: [
    {
      title: '访客数',
      subtitle: '较日常平均',
      sum: '169,658',
      avg: '+0.22%',
      color: 'gray',
    },
    {
      title: '支付买家数',
      subtitle: '较日常平均',
      sum: '1,784',
      avg: '+0.45%',
      color: 'gray',
    },
  ],
  price: [
    {
      title: '客单价',
      subtitle: '较日常平均',
      sum: '93.44',
      avg: '-15.61%',
      color: 'orange',
    },
    {
      title: '人均购买商品件数',
      subtitle: '较日常平均',
      sum: '2.03',
      avg: '-13.79%',
      color: 'orange',
    },
    {
      title: '件单价',
      subtitle: '较日常平均',
      sum: '46.05',
      avg: '-2.11%',
      color: 'gray',
    },
  ],
  again: [
    {
      title: '30天复购率',
      subtitle: '较日常平均',
      sum: '7.06%',
      avg: '-8.62%',
      color: 'gray',
    },
    {
      title: '30天人均购买次数',
      subtitle: '较日常平均',
      sum: '1.29%',
      avg: '+3.32%',
      color: 'gray',
    },
    {
      title: '90天复购率',
      subtitle: '较日常平均',
      sum: '9.55%',
      avg: '+7.68%',
      color: 'gray',
    },
  ],
  struct: [
    {
      title: '高效商品数',
      subtitle: '较日常平均',
      sum: '56',
      avg: '-37.43%',
      color: 'orange',
    },
    {
      title: '高效商品率',
      subtitle: '较日常平均',
      sum: '9.86%',
      avg: '-34.10%',
      color: 'orange',
    },
    {
      title: '动销商品数',
      subtitle: '较日常平均',
      sum: '15.04%',
      avg: '-1.29%',
      color: 'gray',
    },
  ],
})

const tableData = reactive([
  {
    id: '1',
    name: '内分泌系统',
    pay: 20448.75,
    inc: 999,
    change: 8778.04,
    rate: 75.21,
  },
  {
    id: '2',
    name: '洗鼻器/吸鼻器',
    pay: 1220.88,
    inc: 999,
    change: 883.57,
    rate: 261.95,
  },
  {
    id: '3',
    name: '避孕套',
    pay: 1102.1,
    inc: 999,
    change: 581.28,
    rate: 111.61,
  },
  {
    id: '4',
    name: '消化系统',
    pay: 5940.2,
    inc: 999,
    change: 514.7,
    rate: 9.49,
  },
  {
    id: '5',
    name: '补益安神',
    pay: 690.8,
    inc: 999,
    change: 470.81,
    rate: 214.02,
  },
])

const activeName = ref('first')
const showTable = ref(true)

const toggleTable = () => {
  showTable.value = !showTable.value
}

const addCent = (row, column, key) => {
  return row[key] + '%'
}
</script>
<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header flex-between">
              <span class="title">
                <el-icon class="size-big color-gray">
                  <clock />
                </el-icon>
                <span class="size-big p-r">核心指标</span>
                <span class="size-small p-t color-gray">
                  更新时间: 2021-10-08 11:59:15
                </span>
              </span>
              <el-button class="button" type="text">
                了解更多
                <el-icon>
                  <arrow-right />
                </el-icon>
              </el-button>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="18">
              <line-chart title="销售额" sum="¥19289" />
            </el-col>
            <el-col class="retail color-gray" :span="6">
              <div>
                <bar-chart
                  title="销售量"
                  sum="6560"
                  :data="barData.salesVolume"
                />
                <div>
                  <span>周同比</span>
                  <el-icon>
                    <caret-top />
                  </el-icon>
                  <span class="color-black">12%</span>
                  <span>日环比</span>
                  <el-icon class="color-red">
                    <caret-bottom />
                  </el-icon>
                  <span class="color-black">11%</span>
                </div>
              </div>
              <div>
                <bar-chart
                  title="毛利率"
                  sum="10.35%"
                  :data="barData.rateOfMargin"
                />
                <div>
                  <span>周同比</span>
                  <el-icon>
                    <caret-top />
                  </el-icon>
                  <span class="color-black">12%</span>
                  <span>日环比</span>
                  <el-icon class="color-red">
                    <caret-bottom />
                  </el-icon>
                  <span class="color-black">11%</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header flex-between">
              <span class="title">
                <el-icon class="size-big color-gray">
                  <aim />
                </el-icon>
                <span class="size-big">销售目标</span>
              </span>
              <el-button class="button" type="text">
                设置目标
                <el-icon>
                  <arrow-right />
                </el-icon>
              </el-button>
            </div>
          </template>
          <div class="target">
            <div class="item">
              <pie-chart :total="100" :sum="29" />
              <div class="text">
                <div class="color-black">本月累计成交金额（元）</div>
                <div>￥499 139</div>
                <div class="color-gray">本月目标 ￥1 722 841</div>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="item">
              <pie-chart :total="100" :sum="69" />
              <div class="text">
                <div class="color-black">本年累计成交金额（元）</div>
                <div>￥19 448 270</div>
                <div class="color-gray">本月目标 ￥28 032 599</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="diagnose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="User1" name="first">
          <div class="tips">
            客单价 较日常平均 -16% ｜ 人均购买商品件数 较日常平均 -14%
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="card-list">
      <div class="el-card is-always-shadow box-card">
        <div class="title">
          <span><img src="@/assets/icons/mark.png" alt="" /></span>
          <span>生意增长</span>
        </div>
        <card-item
          v-for="i in itemData.increase"
          :info="i"
          :key="i.title"
          :color="i.color"
        />
      </div>
      <div class="el-card is-always-shadow box-card">
        <div class="title">
          <span><img src="@/assets/icons/tick.png" alt="" /></span>
          <span>客户规模</span>
        </div>
        <card-item
          v-for="i in itemData.customer"
          :info="i"
          :key="i.title"
          :color="i.color"
        />
      </div>
      <div class="el-card is-always-shadow box-card">
        <div class="title">
          <span><img src="@/assets/icons/mark.png" alt="" /></span>
          <span>单客价值</span>
        </div>
        <card-item
          v-for="i in itemData.price"
          :info="i"
          :key="i.title"
          :color="i.color"
        />
      </div>
      <div class="el-card is-always-shadow box-card">
        <div class="title">
          <span><img src="@/assets/icons/tick.png" alt="" /></span>
          <span>复购留存</span>
        </div>
        <card-item
          v-for="i in itemData.again"
          :info="i"
          :key="i.title"
          :color="i.color"
        />
      </div>
      <div class="el-card is-always-shadow box-card">
        <div class="title">
          <span><img src="@/assets/icons/tree.png" alt="" /></span>
          <span>商品结构</span>
        </div>
        <card-item
          v-for="i in itemData.struct"
          :info="i"
          :key="i.title"
          :color="i.color"
        />
      </div>
    </div>
    <el-card class="table">
      <template #header>
        <div class="table-header">
          <span>以下品类带动支付金额上升,可以展开查看(5条件记录)</span>
          <el-icon @click="toggleTable">
            <arrow-up-bold v-if="showTable" />
            <arrow-down-bold v-else />
          </el-icon>
        </div>
      </template>
      <el-table
        v-if="showTable"
        :data="tableData"
        style="width: 100%"
        class="table"
        :default-sort="{ prop: 'pay', order: 'descending' }"
      >
        <el-table-column
          prop="name"
          label="贡献支付金额上升TOP类目"
          width="350"
        />
        <el-table-column prop="pay" sortable label="支付金额" />
        <el-table-column prop="inc" sortable label="增长贡献">
          <template #default="scope">
            {{ scope.row.inc + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="change" sortable label="较日常变化量" />
        <el-table-column prop="rate" sortable label="较日常变化率">
          <template #default="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
}
.card-header {
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-icon {
      margin-right: 4px;
    }
  }
}

.retail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.target {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item {
    display: flex;
    height: 185px;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > div:nth-child(2) {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
}

.diagnose {
  margin-top: 20px;
  ::v-deep .el-tabs .el-tabs__nav-wrap::after {
    display: none;
  }
  .tips {
    background-color: #f8ebda;
    padding: 20px;
  }
}

.card-list {
  margin-top: 20px;
  // height: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  .title {
    display: flex;
    height: 50px;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f9ff;
    font-size: 18px;

    > span:nth-child(1) {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
      }
    }
    > span:nth-child(2) {
      padding-left: 10px;
    }
  }
}

.table {
  margin-top: 20px;
  ::v-deep .el-card__body {
    padding: 0;
  }
  ::v-deep .el-card__header {
    padding: 0;
  }
  .table-header {
    display: flex;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 50px;
    justify-content: space-between;
    align-items: center;
    background-color: #eef6f6;
  }
}
</style>
