<script lang="ts">
export default { name: 'DealMake' }
</script>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div><input type="text" v-model="text" /></div>
</template>

<style lang="scss" scoped></style>
