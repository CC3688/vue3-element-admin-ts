<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { compile } from 'path-to-regexp'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref()

const isDashboard = (route: RouteLocationMatched) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return (
    (name as string).trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
  )
}

const getBreadcrumb = () => {
  let matched: RouteLocationMatched[] = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  const first = matched[0]

  if (!isDashboard(first)) {
    const homeMatched = {
      path: '/home',
      meta: { title: '首页' },
    } as unknown as RouteLocationMatched
    matched = [homeMatched].concat(matched)
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const pathCompile = (path: string) => {
  const { params } = route
  var toPath = compile(path)
  return toPath(params)
}

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

watchEffect(() => {
  if (!route.path.startsWith('/redirect/')) {
    getBreadcrumb()
  }
})
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  font-weight: normal;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
}
</style>
