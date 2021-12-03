import Layout from '@/layout/index.vue'
import routerViwe from '@/layout/routerView.vue'

import { RouteRecordRaw } from 'vue-router'

const systemRouter: RouteRecordRaw = {
  path: '/system',
  component: Layout,
  redirect: '/system/permission',
  name: 'system',
  meta: {
    alwaysShow: true,
    title: '系统设置',
    icon: 'system',
    permission: ['system'],
  },
  children: [
    {
      path: 'permission',
      component: routerViwe,
      name: 'system_permission',
      redirect: '/system/permission/index',
      meta: {
        title: '权限管理',
        permission: ['system_permission'],
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/system/permission.vue'),
          name: 'system_permission_index',
          meta: {
            title: '权限管理',
            permission: ['system_permission'],
            breadcrumb: false,
          },
        },
        {
          path: 'role-add',
          component: () => import('@/views/system/permission/role.vue'),
          name: 'system_permission_add',
          meta: {
            hidden: true,
            title: '添加角色',
            activeMenu: '/system/permission',
            permission: ['system_permission_add'],
          },
        },
        {
          path: 'role-edit',
          component: () => import('@/views/system/permission/role.vue'),
          name: 'system_permission_edit',
          meta: {
            hidden: true,
            title: '修改角色',
            activeMenu: '/system/permission',
            permission: ['system_permission_edit'],
          },
        },
      ],
    },
    {
      path: 'account',
      component: () => import('@/views/system/account.vue'),
      name: 'system_account',
      meta: {
        title: '账号管理',
        permission: ['system_account'],
      },
    },
    {
      path: 'log',
      component: () => import('@/views/system/log.vue'),
      name: 'system_log',
      meta: {
        title: '系统日志',
        permission: ['system_log'],
      },
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu.vue'),
      name: 'system_menu',
      meta: {
        title: '菜单管理',
        permission: ['system_menu'],
      },
    },
  ],
}

export default systemRouter
