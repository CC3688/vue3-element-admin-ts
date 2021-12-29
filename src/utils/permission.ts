import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { store } from '@/store'
import { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/test', '/two']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    const routers: RouteRecordRaw[] = store.getters.permissionRouters
    if (routers.length === 0) {
      try {
        const asyncRouters = await store.dispatch('permission/getRouters')
        asyncRouters.forEach(async (item: RouteRecordRaw) => {
          await router.addRoute(item)
        })
        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        ElNotification({
          type: 'error',
          message: (error as string) || 'Has Error',
        })

        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
        NProgress.done()
      }
    } else {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
