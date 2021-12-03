<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue'
import Hamburger from '@/components/Hamburger.vue'
import { ref, computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const name = ref('yycu')
const roles = ref('超级管理员')
const sidebar = computed(() => store.getters.sidebar)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}
</script>

<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown
        szie="medium"
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="name">
          <span>{{ name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span
                style="display: block; text-align: center; cursor: default"
                v-html="roles"
              />
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display: block; text-align: center">重置密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span style="display: block; text-align: center">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;

    &:focus {
      outline: none;
    }
    .message {
      padding-right: 20px;
      cursor: pointer;
      i {
        font-size: 18px;
      }
      &.dot {
        position: relative;
        &::after {
          content: ' ';
          position: absolute;
          top: 13px;
          right: 14px;
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
        }
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 15px;

      .name {
        i {
          font-size: 20px;
        }
        span {
          padding-left: 5px;
          font-size: 14px;
        }
      }
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
