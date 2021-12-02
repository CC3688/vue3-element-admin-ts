import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/one',
    component: () => import('@/views/one.vue'),
  },
  {
    path: '/two',
    component: () => import('@/views/Two.vue'),
  },
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
