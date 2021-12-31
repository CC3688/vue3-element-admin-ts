<script setup lang="ts">
import { withDefaults, defineProps, computed, defineEmits } from 'vue'
import { scrollTo } from '@/utils/scroll-to'

// 自定义事件
const emits = defineEmits(['update:page', 'update:limit', 'pagination'])

// 自定义props
interface IProps {
  total: number
  page: number
  limit: number
  pageSizes?: number[]
  layout?: string
  background?: boolean
  autoScroll?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  page: 1,
  limit: 10,
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
})

// 计算属性
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emits('update:page', val)
  },
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val) {
    emits('update:limit', val)
  },
})

// 方法
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  emits('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  emits('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<template>
  <el-pagination
    :background="background"
    v-model:currentPage="currentPage"
    :page-sizes="pageSizes"
    :layout="layout"
    :page-size="pageSize"
    :total="total"
    :pager-count="5"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style lang="scss" scoped>
.el-pagination {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
