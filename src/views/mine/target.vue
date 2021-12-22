<script setup lang="ts">
import { ref } from 'vue-demi'

const txt = ref('aaa')
</script>

<template>
  <div>views-mine-target <input type="text" v-model="txt" /></div>
</template>

<style lang="scss" scoped></style>
