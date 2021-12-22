<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute, RouteRecordName } from 'vue-router'
import { Avatar, ArrowDown, Fold } from '@element-plus/icons'

const store = useStore()
const route = useRoute()
const routers = store.getters.routers as RouteRecordRaw[]
const activeIndex = ref('')

// 当前要渲染的路由组
const navRoute = computed(() => {
  return routers.filter((i: RouteRecordRaw) => !i.meta?.hidden)
})

// 获取当前路径 需要 激活的 路由
const getActiveRoute = (name: RouteRecordName) => {
  return routers.find((i) =>
    name.toString().startsWith(i.name?.toString() as string)
  )
}

// 监听路由的变化
watchEffect(() => {
  const name = route.name as string
  const activeRoute = getActiveRoute(name)
  store.dispatch('permission/setCurRoute', activeRoute)
  activeIndex.value = activeRoute?.name as string
})

const closeSilder = () => {
  console.log('object')
  store.dispatch('app/toggleSideBar')
}
</script>

<template>
  <section class="app-navbar">
    <header class="header">
      <el-icon @click="closeSilder">
        <Fold />
      </el-icon>
      <div class="left">
        <div class="title" @click="closeSilder">
          大参林<span class="text">参透</span>
        </div>
        <div class="gutter"></div>
        <div class="sub-title">商业经营决策</div>
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
    </header>
  </section>
</template>

<style lang="scss" scoped>
@import '~@/style/variables.scss';
.app-navbar {
  height: 55px;
  grid-area: app-navbar;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    .left {
      line-height: 50px;
      padding-left: 15px;
      display: flex;
      align-items: center;
      color: #20a635;
      .title {
        font-size: 20px;
        .text {
          font-size: 22px;
          padding-left: 2px;
          color: $--color-primary;
        }
      }
      .gutter {
        height: 18px;
        width: 1px;
        margin-left: 10px;
        margin-right: 10px;
        background: $--color-primary;
      }
      .sub-title {
        font-size: 18px;
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
  .nav {
    height: 50px;
    line-height: 50px;
    .el-menu--horizontal > .el-menu-item {
      height: 50px;
      padding-left: 0;
      padding-right: 0;
      a {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}
</style>
