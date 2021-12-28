<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const cachedViews = computed(() => {
  return store.state.tagsView.cachedViews
})

const key = computed(() => {
  return route.fullPath
})
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 100px - 20px);
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
