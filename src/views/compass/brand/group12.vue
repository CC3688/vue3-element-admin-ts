<script lang="ts">
export default { name: 'CompassBrandGroup12' }
</script>
<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold, CloseBold } from '@element-plus/icons'
import { reactive, ref } from 'vue'
import NOPieChart from '../components/brand/NOPieChart.vue'
import AgePieChart from '../components/brand/AgePieChart.vue'
import SexPieChart from '../components/brand/SexPieChart.vue'
import SexAgePieChart from '../components/brand/SexAgePieChart.vue'
import ValueBar from '../components/brand/ValueBar.vue'

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

// 数据诊断
const visible = ref(true)
const close = () => {
  visible.value = false
}
// 数据诊断end

// 地域
const cp = reactive({
  city: [
    { id: 1, name: '广州市', value: 75 },
    { id: 2, name: '深圳市', value: 70 },
    { id: 3, name: '佛山市', value: 65 },
    { id: 4, name: '东莞市', value: 60 },
    { id: 5, name: '中山市', value: 55 },
    { id: 6, name: '上海市', value: 50 },
    { id: 7, name: '惠州市', value: 45 },
    { id: 8, name: '江门市', value: 40 },
    { id: 9, name: '汕头市', value: 35 },
    { id: 10, name: '北京市', value: 30 },
  ],
  privice: [
    { id: 1, name: '广东省', value: 75 },
    { id: 2, name: '河南省', value: 70 },
    { id: 3, name: '山东省', value: 65 },
    { id: 4, name: '浙江省', value: 60 },
    { id: 5, name: '广西壮族自治区', value: 55 },
    { id: 6, name: '江苏省', value: 50 },
    { id: 7, name: '湖北省', value: 45 },
    { id: 8, name: '福建省', value: 40 },
    { id: 9, name: '湖南省', value: 35 },
    { id: 10, name: '河北省', value: 30 },
  ],
  region: [
    { id: 1, name: '广一', value: 75 },
    { id: 2, name: '广二', value: 70 },
    { id: 3, name: '东莞', value: 65 },
    { id: 4, name: '深圳', value: 60 },
    { id: 5, name: '广三', value: 55 },
    { id: 6, name: '广四', value: 50 },
    { id: 7, name: '汕头', value: 45 },
    { id: 8, name: '揭阳', value: 40 },
    { id: 9, name: '清远', value: 35 },
    { id: 10, name: '肇庆', value: 30 },
  ],
  store: [
    { id: 1, name: '02288店江门台山明珠', value: 75 },
    { id: 2, name: '05009店河北定兴迎宾路', value: 70 },
    { id: 3, name: '03903店河池春园市场', value: 65 },
    { id: 4, name: '01643店清远连山金丰', value: 60 },
    { id: 5, name: '04689店茂名电白麻岗新街', value: 55 },
    { id: 6, name: '04689店茂名电白麻岗新街', value: 50 },
    { id: 7, name: '04689店茂名电白麻岗新街', value: 45 },
    { id: 8, name: '01643店清远连山金丰', value: 40 },
    { id: 9, name: '01643店清远连山金丰', value: 35 },
    { id: 10, name: '03903店河池春园市场', value: 30 },
  ],
})

// 地域 end
</script>

<template>
  <div class="group12">
    <div class="top-zone">
      <div>非处方药 > 止痛镇痛用药</div>
      <div class="list">
        <div>销售分析</div>
        <div>价格带分析</div>
        <div class="active">客群洞察</div>
      </div>
    </div>
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
    <div class="diagnose" v-if="visible">
      <div class="title">数据诊断</div>
      <div>
        <span>21-30岁女性人群贡献了40%销售额</span>
        <span class="blue">前往查看</span>
      </div>
      <div>
        <span>广州金穗路门店比日常增加了50%的销售量</span>
        <span class="blue">前往查看</span>
      </div>
      <div>
        <span>广州江门门店比日常连续7天的0销量</span>
        <span class="blue">前往查看</span>
      </div>
      <el-icon @click="close"><close-bold /></el-icon>
    </div>
    <div class="card basic">
      <div class="first">基础特征</div>
      <div>
        <NOPieChart />
      </div>
      <AgePieChart />
      <div>
        <SexPieChart />
      </div>
      <div>
        <SexAgePieChart />
      </div>
    </div>
    <div class="card district">
      <div class="title">地域</div>
      <div class="item">
        <div class="subtitle">预测地域(市)</div>
        <div class="line">
          <span>排名</span>
          <span>城市</span>
          <span>占比</span>
          <span></span>
        </div>
        <div class="line" v-for="c in cp.city" :key="c.id">
          <span>{{ c.id }}</span>
          <span>{{ c.name }}</span>
          <span>{{ c.value }}%</span>
          <span><ValueBar :value="c.value" /></span>
        </div>
      </div>
      <div class="item">
        <div class="subtitle">预测地域(省)</div>
        <div class="line">
          <span>排名</span>
          <span>省份</span>
          <span>占比</span>
          <span></span>
        </div>
        <div class="line" v-for="c in cp.privice" :key="c.id">
          <span>{{ c.id }}</span>
          <span>{{ c.name }}</span>
          <span>{{ c.value }}%</span>
          <span><ValueBar :value="c.value" /></span>
        </div>
      </div>
    </div>
    <div class="card district">
      <div class="title">营运分布</div>
      <div class="item">
        <div class="subtitle">营运区</div>
        <div class="line">
          <span>排名</span>
          <span>城市</span>
          <span>占比</span>
          <span></span>
        </div>
        <div class="line" v-for="c in cp.region" :key="c.id">
          <span>{{ c.id }}</span>
          <span>{{ c.name }}</span>
          <span>{{ c.value }}%</span>
          <span><ValueBar :value="c.value" /></span>
        </div>
      </div>
      <div class="item">
        <div class="subtitle">门店</div>
        <div class="line">
          <span>排名</span>
          <span>城市</span>
          <span>占比</span>
          <span></span>
        </div>
        <div class="line" v-for="c in cp.store" :key="c.id">
          <span>{{ c.id }}</span>
          <span>{{ c.name }}</span>
          <span>{{ c.value }}%</span>
          <span><ValueBar :value="c.value" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group12 {
  padding-bottom: 50px;
  .top-zone {
    height: 130px;
    background-color: #dbe8f4;
    line-height: 90px;
    font-size: 24px;
    padding-left: 20px;
    .list {
      display: flex;
      line-height: 40px;
      font-size: 14px;
      > div {
        padding-left: 20px;
        padding-right: 20px;
      }
      .active {
        background-color: #ffffff;
        color: #409eff;
      }
    }
  }
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

  .diagnose {
    position: relative;
    height: 130px;
    margin-top: 20px;
    background-color: #dbe8f4;
    border: 1px solid #91d5ff;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 15px;
    padding-bottom: 10px;
    justify-content: space-around;
    > div {
      padding: 0;
      font-size: 12px;
      line-height: 12px;
    }
    .title {
      font-size: 18px;
      color: #409eff;
    }
    .blue {
      color: #409eff;
      cursor: pointer;
      padding-left: 10px;
    }
    .el-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }

  .basic {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50px 380px 380px;
    .first {
      grid-column-start: 1;
      grid-column-end: 3;
      border-bottom: 1px solid #dbe8f4;
      line-height: 50px;
      font-size: 18px;
    }
  }

  .district {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50px auto;
    .title {
      grid-column-start: 1;
      grid-column-end: 3;
      border-bottom: 1px solid #dbe8f4;
      line-height: 50px;
      font-size: 18px;
    }
    .item {
      .subtitle {
        font-size: 14px;
        line-height: 50px;
      }
      .line {
        display: flex;
        justify-content: flex-start;
        height: 30px;
        line-height: 30px;
        > span:first-child {
          min-width: 50px;
        }
        > span:nth-child(2) {
          min-width: 150px;
          text-align: center;
          font-size: 12px;
        }
        > span:nth-child(3) {
          min-width: 80px;
          text-align: center;
          font-size: 12px;
        }
        > span:last-child {
          flex: 1;
        }
      }
    }
  }
}
</style>
