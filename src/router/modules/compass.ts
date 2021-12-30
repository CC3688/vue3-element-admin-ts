import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
import RouterView from '@/layout/routerView.vue'

export const compassRouter: RouteRecordRaw = {
  path: '/compass',
  component: Layout,
  redirect: '/compass/monitor',
  name: 'compass',
  meta: {
    title: '品类罗盘',
    icon: 'card',
  },
  children: [
    {
      path: 'monitor',
      component: () => import('@/views/compass/monitor.vue'),
      name: 'compass_monitor',
      meta: {
        title: '宏观监控',
      },
    },
    {
      path: 'list',
      component: () => import('@/views/compass/list.vue'),
      name: 'compass_list',
      meta: {
        title: '商品榜单',
      },
    },
    {
      path: 'brand',
      component: RouterView,
      name: 'compass_brand',
      redirect: '/compass/brand/index',
      meta: {
        title: '品类分析',
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/compass/brand/index.vue'),
          name: 'compass_brand_index',
          meta: {
            title: '品类分析',
            breadcrumb: false,
            activeMenu: '/compass/brand',
            hidden: true,
          },
        },
        {
          path: 'insight',
          component: () => import('@/views/compass/brand/insight.vue'),
          name: 'compass_brand_insight',
          meta: {
            title: '品类洞察',
          },
        },
        {
          path: 'analysis',
          component: () => import('@/views/compass/brand/analysis.vue'),
          name: 'compass_brand_analysis',
          meta: {
            title: '价格带分析',
          },
        },
        {
          path: 'group',
          component: () => import('@/views/compass/brand/group.vue'),
          name: 'compass_brand_group',
          meta: {
            title: '品类客群',
          },
        },
        {
          path: 'ngroupv12',
          component: () => import('@/views/compass/brand/group12.vue'),
          name: 'compass_brand_groupv12',
          meta: {
            title: '客群_V1.2',
          },
        },
      ],
    },
    {
      path: 'single',
      component: () => import('@/views/compass/single.vue'),
      name: 'compass_single',
      meta: {
        title: '单品分析',
      },
    },
    {
      path: 'latest',
      component: () => import('@/views/compass/latest.vue'),
      name: 'compass_latest',
      meta: {
        title: '新品跟踪',
      },
    },
  ],
}

export default compassRouter
