import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import systemRouter from './modules/system'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/one',
    component: () => import('@/views/one.vue'),
  },
  {
    path: '/two',
    component: () => import('@/views/Two.vue'),
  },
  systemRouter,
]

export const asnycRoutes = []

const createRoutes = () =>
  createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({ top: 0 }),
  })

const router = createRoutes()

export default router
