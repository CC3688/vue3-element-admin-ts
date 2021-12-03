import { Module } from 'vuex'
import { ILogin, IUser } from '@/interfaces/user'
import { IRootState } from '../index'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'

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
      const data = await login<IUser[]>(playload)
      if (data.length === 1) {
        const token = data[0].token
        setToken(token)
        commit('SET_TOKEN', token)
        return true
      }
      return false
    },
  },
}
