<template>
  <div class="home">
    <h1>{{ baseApiUrl }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const baseApiUrl = process.env.VUE_APP_BASE_API

export default defineComponent({
  name: 'Home',
  data() {
    return {
      baseApiUrl,
    }
  },
})
</script>
