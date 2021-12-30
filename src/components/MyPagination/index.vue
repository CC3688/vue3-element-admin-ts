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
  pageSizes: number[]
  layout: string
  background: boolean
  autoScroll: boolean
  hidden: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  page: 1,
  limit: 10,
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false,
})

// 计算属性
const currentPage = computed({
  get() {
    return props.page
  },
  set() {
    emits('update:page')
  },
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set() {
    emits('update:limit')
  },
})

// 方法
const handleSizeChange = (val: number) => {
  emits('pagination', { page: currentPage, limit: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

const handleCurrentChange = (val: number) => {
  emits('pagination', { page: val, limit: pageSize })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
