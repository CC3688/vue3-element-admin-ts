import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

export const test: RouteRecordRaw = {
  path: '/test',
  component: Layout,
  redirect: '/test/index',
  name: 'test',
  meta: {
    title: 'test',
    icon: 'test',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/test/index.vue'),
      name: 'test_index',
      meta: {
        title: 'test',
      },
    },
  ],
}

export default test
