import Layout from '@/layout/index.vue'

import { RouteRecordRaw } from 'vue-router'

export const retailRouter: RouteRecordRaw = {
  path: '/retail',
  component: Layout,
  redirect: '/retail/o2o',
  name: 'retail',
  meta: {
    title: '新零售',
    icon: 'dorm',
  },
  children: [
    {
      path: 'o2o',
      component: () => import('@/views/retail/o2o.vue'),
      name: 'retail_o2o',
      meta: {
        breadcrumb: false,
        title: 'O2O驾驶舱',
      },
    },
  ],
}

export default retailRouter
