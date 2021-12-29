<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useStore } from '@/store'
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
const redirect = route.query.redirect as RouteLocationRaw
const formData = reactive({ username: '', password: '' })

// 这个获取 ref ,  变量名, 要和 template ref="varname"   的值 一致
const form = ref()
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const onSubmit = async () => {
  form.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await store.dispatch('user/login', formData)
      if (res) {
        router.push(redirect)
      }
    } else {
      return false
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    console.log('登录页router.getRoutes()::router:', router.getRoutes())
  }, 2000)
})
</script>

<template>
  <div class="login">
    <el-form ref="form" :model="formData" :rules="rules" label-width="4em">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-button {
    width: 100%;
  }
}
</style>
