/* eslint-disable */
<script setup lang="ts">
import {
  ref,
  defineEmits,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
} from 'vue'

const app = getCurrentInstance()
const scrollContainer = ref()

defineEmits<{ (e: 'scroll'): void }>()

// const left = ref(0)
const tagAndTagSpacing = 4

const scrollWrapper = computed<any>(() => {
  return scrollContainer.value
})

const emitScroll = () => {
  app && app.emit('scroll')
}

const handleScroll = (
  e: Record<keyof WheelEvent | keyof { wheelDelta: number }, any>
) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value.wrap$
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

// const moveToTarget = (currentTag) => {
//   const $container = app.$refs.scrollContainer.$el
//   const $containerWidth = $container.offsetWidth
//   const $scrollWrapper = scrollWrapper
//   const tagList = app.$parent.$refs.tag

//   let firstTag = null
//   let lastTag = null

//   // find first tag and last tag
//   if (tagList.length > 0) {
//     firstTag = tagList[0]
//     lastTag = tagList[tagList.length - 1]
//   }

//   if (firstTag === currentTag) {
//     $scrollWrapper.scrollLeft = 0
//   } else if (lastTag === currentTag) {
//     $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
//   } else {
//     // find preTag and nextTag
//     const currentIndex = tagList.findIndex((item) => item === currentTag)
//     const prevTag = tagList[currentIndex - 1]
//     const nextTag = tagList[currentIndex + 1]

//     // the tag's offsetLeft after of nextTag
//     const afterNextTagOffsetLeft =
//       nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

//     // the tag's offsetLeft before of prevTag
//     const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

//     if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
//       $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
//     } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
//       $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
//     }
//   }
// }

onMounted(() => {
  scrollContainer.value.wrap$.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  scrollContainer.value.wrap$.removeEventListener('scroll', emitScroll, true)
})
</script>

<template>
  <el-scrollbar
    ref="scrollContainer"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
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
