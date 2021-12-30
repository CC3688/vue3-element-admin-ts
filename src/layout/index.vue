<script setup lang="ts">
import { AppMain, Sidebar, AppHeader } from './components'
import { computed } from 'vue-demi'
import { useStore } from '@/store'

const store = useStore()

const isCollapse = computed(() => {
  return store.getters.sidebar.opened
})
</script>

<template>
  <div class="app-container" :class="{ isCollapse }">
    <AppHeader />
    <el-scrollbar class="app-sidebar">
      <Sidebar />
    </el-scrollbar>
    <el-scrollbar class="app-main">
      <AppMain></AppMain>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 90px 1fr;
  grid-template-areas:
    'app-sidebar app-navbar'
    'app-sidebar app-main';
  background-color: #ffffff;
  // background-color: #f0f2f5;
  font-size: 14px;
  color: #303133;
  transition: all ease-in-out 1s;
  // &.isCollapse {
  //   grid-template-columns: 63px 1fr;
  //   transition: all ease-in-out 1s;
  // }

  .app-sidebar {
    grid-area: app-sidebar;
  }
  .app-main {
    grid-area: app-main;
  }
}
</style>
