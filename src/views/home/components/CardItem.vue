<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: 'orange',
    validator: function (value: string) {
      return ['orange', 'gray'].indexOf(value) !== -1
    },
  },
})
</script>

<template>
  <div class="card-item" v-if="props.info">
    <div class="top flex">
      <div>
        <span
          class="dot"
          :class="{
            orange: props.color === 'orange',
            gray: props.color === 'gray',
          }"
        ></span>
        <span class="text">{{ props.info.title }}</span>
        <span class="img-wrap">
          <img src="@/assets/icons/question.png" alt="" />
        </span>
        <span class="img-wrap">
          <img src="@/assets/icons/trend.png" alt="" />
        </span>
      </div>
      <div class="size-big">
        {{ props.info.sum }}
      </div>
    </div>
    <div class="bottom flex color-gray">
      <div>{{ props.info.subtitle }}</div>
      <div>{{ props.info.avg }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-item {
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  font-size: 13px;
  .flex {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &.orange {
      background-color: #ff9b07;
    }
    &.gray {
      background-color: #05e2cb;
    }
  }

  .text {
    padding-left: 5px;
    padding-right: 5px;
  }
  .img-wrap {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
  .size-big {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
