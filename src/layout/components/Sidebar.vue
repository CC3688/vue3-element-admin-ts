<script setup lang="ts">
import { computed, ref, watchEffect, nextTick } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const activeIndex = ref('')

// 所有路由
const routers = computed(() => {
  return store.getters.routers.filter((i: RouteRecordRaw) => !i.meta?.hidden)
})

// 监听路由的变化
watchEffect(() => {
  const path = route.fullPath
  const activeMenu = route.meta?.activeMenu as string
  nextTick(() => {
    activeIndex.value = activeMenu || path
  })
})

// 侧导航折叠与否
const isCollapse = computed(() => {
  return store.getters.sidebar.opened
})
</script>

<template>
  <aside class="app-sidebar">
    <el-menu
      :defaultActive="activeIndex"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <template v-for="r in routers" :key="r.name">
        <el-menu-item
          v-if="r.children.length === 1"
          :index="r.path + '/' + r.children[0].path"
        >
          <svg-icon :iconClass="r.meta?.icon" />
          <template #title>{{ r.meta.title }}</template>
        </el-menu-item>
        <el-sub-menu v-if="r.children.length > 1" :index="r.path">
          <template #title>
            <svg-icon :iconClass="r.meta?.icon" />
            <span>{{ r.meta.title }}</span>
          </template>
          <template v-for="i in r.children" :key="i.name">
            <el-menu-item v-if="!i.meta?.hidden" :index="r.path + '/' + i.path">
              <svg-icon v-if="i.meta?.icon" :iconClass="i.meta?.icon" />
              <template #title>{{ i.meta.title }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </aside>
</template>

<style lang="scss" scoped>
.app-sidebar {
  min-height: 100vh;
  background: #304156;
  padding: 0;
  .el-menu {
    width: 200px;
    background: #304156;
    border: none;
    svg {
      margin-right: 10px;
    }
    &.el-menu--collapse {
      width: 60px;
      svg {
        margin-right: 0;
      }
    }
    .el-menu-item {
      color: #bfcbd9;
      &:hover {
        background: #263445;
      }
      &.is-active {
        color: var(--el-menu-active-color);
      }
    }
    :deep(.el-sub-menu) {
      .el-menu {
        background-color: #1f2d3d;
        .el-menu-item {
          color: #bfcbd9;
          &:hover {
            background: #011629;
          }
          &.is-active {
            color: var(--el-menu-active-color);
          }
        }
      }
      .el-sub-menu__title {
        &:hover {
          background-color: #263445;
        }
        color: #bfcbd9;
      }
    }
  }

  // 收缩菜单时, 让文字不可以见
  .horizontal-collapse-transition .el-sub-menu {
    span {
      color: transparent;
    }
    i.el-sub-menu__icon-arrow {
      color: transparent;
    }
  }
}
</style>
<style lang="scss">
.el-menu--popup {
  background: #1f2d3d;
  .el-menu-item {
    color: #bfcbd9;
    &:hover {
      background: #263445;
    }
    &.is-active {
      color: var(--el-menu-active-color);
    }
  }
  .el-sub-menu {
    .el-menu {
      background-color: #1f2d3d;
      .el-menu-item {
        color: #bfcbd9;
        &:hover {
          background: #011629;
        }
        &.is-active {
          color: var(--el-menu-active-color);
        }
      }
    }
    .el-sub-menu__title {
      &:hover {
        background-color: #263445;
      }
      color: #bfcbd9;
    }
  }
}
</style>
