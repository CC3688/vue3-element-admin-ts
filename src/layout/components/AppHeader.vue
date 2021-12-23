<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { Avatar, ArrowDown, Fold, Expand } from '@element-plus/icons'
import Breadcrumb from './Breadcrumb.vue'

const store = useStore()
const route = useRoute()
const routers = store.getters.routers as RouteRecordRaw[]
const activeIndex = ref('')

// 监听路由的变化

const closeSilder = () => {
  store.dispatch('app/toggleSideBar')
}

const isOpened = computed(() => {
  return store.state.app.sidebar.opened
})
</script>

<template>
  <section class="app-header">
    <div class="left">
      <el-icon @click="closeSilder">
        <Fold v-show="!isOpened" />
        <Expand v-show="isOpened" />
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="avatar" :size="18">
            <avatar />
          </el-icon>
          <span class="name">陈俊武</span>
          <el-icon class="arrow-down" :size="20">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~@/style/variables.scss';
.app-header {
  height: 55px;
  line-height: 55px;
  grid-area: app-navbar;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    height: 55px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-icon {
      font-size: 22px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-right: 5px;
      box-sizing: content-box;
    }
  }
  .right {
    .avatar {
      position: relative;
      top: 3px;
    }
    .name {
      padding-right: 5px;
      padding-left: 5px;
    }
    .arrow-down {
      position: relative;
      top: 5px;
    }
  }
}
</style>
