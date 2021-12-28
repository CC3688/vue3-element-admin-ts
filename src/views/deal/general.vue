<script lang="ts">
export default { name: 'DealGeneral' }
</script>
<script setup lang="ts">
// eslint-disable-next-line import/first
import { ref } from 'vue'

const text = ref('')

console.log('DealGeneral ....')
</script>

<template>
  <div>
    <div><input type="text" v-model="text" /></div>
    <Two />
  </div>
</template>

<style lang="scss" scoped></style>
