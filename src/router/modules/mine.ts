import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

export const mineRouter: RouteRecordRaw = {
  path: '/mine',
  component: Layout,
  redirect: '/mine/target',
  name: 'mine',
  meta: {
    hidden: true,
    title: '个人中心',
    icon: 'dorm',
  },
  children: [
    {
      path: 'target',
      component: () => import('@/views/mine/target.vue'),
      name: 'mine_target',
      meta: {
        title: '目标设置',
      },
    },
  ],
}

export default mineRouter
