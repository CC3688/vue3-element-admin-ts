<script setup lang="ts">
import { AppMain, Navbar, TagsView, Sidebar } from './components'
</script>

<template>
  <!-- <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div> -->

  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
