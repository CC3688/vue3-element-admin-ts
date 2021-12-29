<script lang="ts">
export default { name: 'CompassBrandIndex' }
</script>
<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold, Search } from '@element-plus/icons'
import { reactive, ref } from 'vue'
import LineChart from '../components/LineChart.vue'

// 顶部 分页
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
// 顶部 分页 end

// 表格
const sourceData = [
  { id: 1, name: '特殊商品', a: 2, b: 0, c: 0, d: 0, f: 0 },
  { id: 2, name: '养生茶饮', a: 1, b: 0, c: 0, d: 0, f: 0 },
  { id: 3, name: '滋补贵细', a: 1, b: 0, c: 0, d: 0, f: 0 },
  { id: 4, name: '非处方药', a: 1229, b: 285, c: 285, d: 285, f: 900.74 },
  { id: 5, name: '中药饮片', a: 1, b: 0, c: 0, d: 0, f: 0 },
  { id: 6, name: '血液系统用药', a: 7, b: 2, c: 2, d: 2, f: 46.6 },
  { id: 7, name: '解热镇痛', a: 12, b: 5, c: 5, d: 5, f: 157.0 },
  { id: 8, name: '补益安神', a: 16, b: 1, c: 1, d: 1, f: 9 },
  { id: 9, name: '儿科专科用药', a: 10, b: 4, c: 4, d: 4, f: 116.9 },
  { id: 1, name: '抗感染用药', a: 68, b: 7, c: 7, d: 7, f: 842.7 },
]

const tableData = ref(sourceData)
const formInline = reactive({
  keywork: '',
})

const onSubmit = () => {
  if (formInline.keywork.length === 0) {
    tableData.value = sourceData
  } else {
    tableData.value = sourceData.filter((i) =>
      i.name.includes(formInline.keywork)
    )
  }
}
// 表格 end
</script>

<template>
  <div class="brand-index">
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
    <div class="card table-zone">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品类分析">
          <el-input
            v-model="formInline.keywork"
            placeholder="输入类目名称进行搜索"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <el-icon><Search /></el-icon>
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="行业类目" />
        <el-table-column prop="a" label="在售商品数(SKU)" />
        <el-table-column prop="b" label="订单客流" />
        <el-table-column prop="c" label="销量" />
        <el-table-column prop="d" label="毛利额" />
        <el-table-column prop="f" label="销售额" />
        <el-table-column label="">
          <template #default>
            <div>
              <LineChart :height="40" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.brand-index {
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

  .table-zone {
    margin-top: 20px;
  }
}
</style>
