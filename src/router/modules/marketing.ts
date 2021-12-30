import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

export const marketingRouter: RouteRecordRaw = {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/index',
  name: 'marketing',
  meta: {
    title: '营销',
    icon: 'data',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/marketing/index.vue'),
      name: 'marketing_index',
      meta: {
        breadcrumb: false,
        title: '营销',
      },
    },
  ],
}

export default marketingRouter
