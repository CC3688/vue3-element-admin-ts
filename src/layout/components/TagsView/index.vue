<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watch,
  getCurrentInstance,
  nextTick,
  watchEffect,
  Events,
} from 'vue'
import { useStore } from '@/store'
import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from 'vue-router'
import ScrollPane from './ScrollPane.vue'
import { Close } from '@element-plus/icons'
import path from 'path'

const store = useStore()
const route = useRoute()
const router = useRouter()

const affixTags = ref<RouteRecordRaw[]>([])
const selectedTag = ref({})
const visible = ref(false)
const left = ref(0)
const top = ref(0)

const app = ref()
const tag = ref()

const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})

const routes = computed<RouteRecordRaw[]>(() => {
  return store.getters.routers
})

const isActive = (tag: RouteLocationNormalizedLoaded) => {
  return tag.path === route.path
}

const isAffix = (tag: RouteLocationNormalizedLoaded | any) => {
  return tag.meta && tag.meta.affix
}

const toLastView = (visitedViews: any, view: any) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Home') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

const closeSelectedTag = (view: any) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: any[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTageTemp = (affixTags.value = filterAffixTags(routes.value))
  for (const tag of affixTageTemp) {
    // Must have tag name
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}

const openMenu = (tag: any, e: any) => {
  const $el = app.value?.ctx?.$el
  const menuMinWidth = 105
  const offsetLeft = $el.getBoundingClientRect().left // container margin left
  const offsetWidth = $el.offsetWidth // container width
  const maxLeft = offsetWidth + offsetLeft - menuMinWidth // left boundary
  const leftValue = e.clientX + 15 // 15: margin right

  if (leftValue > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = leftValue
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const refreshSelectedTag = (view: any) => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  })
}

const moveToCurrentTag = () => {
  const tags = tag.value
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        //   this.$refs.scrollPane.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
        break
      }
    }
  })
}

const closeOthersTags = () => {
  router.push(selectedTag.value)
  store.dispatch('tagsView/delOthersViews', selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view: any) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const closeMenu = () => {
  visible.value = false
}

const addTags = () => {
  const { name } = route
  if (name) {
    store.dispatch('tagsView/addView', route)
  }
  return false
}

watch(
  route,
  () => {
    addTags()
  },
  {
    deep: true,
    immediate: false,
  }
)

watchEffect(() => {
  if (visible.value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  app.value = getCurrentInstance()
  initTags()
  addTags()
})
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <el-icon
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    :deep(.el-scrollbar__view) {
      white-space: nowrap;
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        position: relative;
        top: 5px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
