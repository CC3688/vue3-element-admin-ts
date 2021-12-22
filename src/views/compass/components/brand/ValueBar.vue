<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="value-bar">
    <div class="inner" :style="{ width: props.value + '%' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.value-bar {
  display: inline-block;
  width: 100%;
  // background-color: red;
  .inner {
    background-color: #2363e6;
    min-height: 12px;
  }
}
</style>
