<script lang="ts">
export default { name: 'DealGeneral' }
</script>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div>
    <div><input type="text" v-model="text" /></div>
  </div>
</template>

<style lang="scss" scoped></style>
