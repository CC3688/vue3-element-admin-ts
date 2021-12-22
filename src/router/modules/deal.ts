import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

export const dealRouter: RouteRecordRaw = {
  path: '/deal',
  component: Layout,
  redirect: '/deal/general',
  name: 'deal',
  meta: {
    title: '交易',
    icon: 'check',
  },
  children: [
    {
      path: 'general',
      component: () => import('@/views/deal/general.vue'),
      name: 'deal_general',
      meta: {
        title: '交易概况',
      },
    },
    {
      path: 'make',
      component: () => import('@/views/deal/make.vue'),
      name: 'deal_make',
      meta: {
        title: '交易构成',
      },
    },
  ],
}

export default dealRouter
