import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

export const test2: RouteRecordRaw = {
  path: '/test2',
  component: Layout,
  redirect: '/test2/index',
  name: 'test2',
  meta: {
    title: 'test2',
    icon: 'test2',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/test2/index.vue'),
      name: 'test2_index',
      meta: {
        title: 'test2',
      },
    },
  ],
}

export default test2
