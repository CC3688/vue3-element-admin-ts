import { Module } from 'vuex'
import { IRootState } from '../index'
import { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { constantRoutes, asnycRoutes, resetRouter } from '@/router'

function getPermissRouteName(permissRoutes: RouteRecordRaw[]) {
  const nameArr: RouteRecordName[] = []

  function getRouteName(routes: RouteRecordRaw[]) {
    routes.forEach((item: RouteRecordRaw) => {
      if (item.name) {
        nameArr.push(item.name)
      }
      if (item.children) {
        getRouteName(item.children)
      }
    })
  }
  getRouteName(permissRoutes)
  return nameArr
}

export interface IPermissionState {
  routers: RouteRecordRaw[] // 常量路由 + 有权限路由
  permissionRouters: RouteRecordRaw[] // 这里是 有权限的路由
  removeRoutes: RouteRecordName[]
  curRoute: RouteRecordName | null
}

export const permission: Module<IPermissionState, IRootState> = {
  namespaced: true,
  state: () => ({
    routers: [],
    permissionRouters: [],
    removeRoutes: [],
    curRoute: null,
  }),
  mutations: {
    SET_ROUTERS(state, routers: RouteRecordRaw[]) {
      state.permissionRouters = routers
      state.routers = constantRoutes.concat(routers)
      state.removeRoutes = getPermissRouteName(routers)
    },
    REST_ROUTERS(state) {
      state.permissionRouters = []
      state.routers = []
      state.removeRoutes = []
    },
    SET_REMOVE_ROUTERS(state, removeRoutes) {
      state.removeRoutes = removeRoutes
    },
    SET_CUR_ROUTE: (state, route) => {
      state.curRoute = route
    },
  },
  actions: {
    getRouters({ commit }) {
      return new Promise((resolve) => {
        resolve(asnycRoutes)
        commit('SET_ROUTERS', asnycRoutes)
      })
    },
    async restRouters({ commit, state }) {
      await resetRouter(state.removeRoutes)
      commit('REST_ROUTERS')
    },
    setCurRoute({ commit }, route) {
      commit('SET_CUR_ROUTE', route)
    },
  },
}
