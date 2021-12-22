import { Module } from 'vuex'
// import { ILogin, IUser } from '@/interfaces/user'
import { ILogin } from '@/interfaces/user'
import { IRootState } from '../index'
// import { login } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
// import router from '@/router'

export interface IUserState {
  token: string
}

export const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
  }),
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
    },
  },
  actions: {
    async login({ commit }, playload: ILogin) {
      const loginRes = await new Promise((resolve) => {
        setTimeout(async () => {
          if (playload.username === 'admin' && playload.password === '123456') {
            const token = 'dsl-token-xxadfadflsdfa1225daf'
            setToken(token)
            commit('SET_TOKEN', token)
            resolve(true)
          } else {
            resolve(false)
          }
        }, 1500)
      })
      return loginRes
      // const data = await login<IUser[]>(playload)
      // if (data.length === 1) {
      //   const token = data[0].token
      //   setToken(token)
      //   commit('SET_TOKEN', token)
      //   return true
      // }
    },
    async resetToken({ commit, dispatch }) {
      return new Promise((resolve) => {
        removeToken()
        dispatch('permission/restRouters', null, { root: true })
        commit('SET_TOKEN', '')
        resolve(true)
      })
    },
  },
}
