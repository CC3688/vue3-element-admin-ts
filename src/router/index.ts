import {
  createRouter,
  createWebHashHistory,
  RouteRecordName,
  RouteRecordRaw,
} from 'vue-router'
import Layout from '@/layout/index.vue'
import { importRoute } from '@/utils/importAll'

/**
 *  路由需要排序, 可以跟由名,用数字开头来排序
 */
const files = importRoute(require.context('./modules', false, /\.ts$/))

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    meta: {
      hidden: true,
      title: '首页',
      icon: 'dorm',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home_index',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'login_index',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录',
    },
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
    meta: {
      hidden: true,
    },
  },
]

export const asnycRoutes: RouteRecordRaw[] = [
  ...files,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      hidden: true,
    },
  },
]

const createRoutes = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({ top: 0 }),
  })
}

const router = createRoutes()

export const resetRouter = (removeRouters: RouteRecordName[]) => {
  removeRouters.forEach(async (item: RouteRecordName) => {
    await router.removeRoute(item)
  })
}

export default router
