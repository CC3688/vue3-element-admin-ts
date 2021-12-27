import {
  createRouter,
  createWebHashHistory,
  RouteRecordName,
  RouteRecordRaw,
} from 'vue-router'
import Layout from '@/layout/index.vue'
import { compassRouter } from './modules/compass'
import { dealRouter } from './modules/deal'
import { retailRouter } from './modules/retail'
import { marketingRouter } from './modules/marketing'
import { mineRouter } from './modules/mine'


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
        component: () => import('@/views/redirect/index.vue')
      }
    ],
    meta: {
      hidden: true,

    }
  },
]

export const asnycRoutes: RouteRecordRaw[] = [
  compassRouter,
  dealRouter,
  retailRouter,
  marketingRouter,
  mineRouter,
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

  console.log('resetRouter 执行了')
}

export default router
