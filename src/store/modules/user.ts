import { Module } from 'vuex'
import { ILogin } from '@/interfaces/user'
import { IRootState } from '../index'

export interface IUserState {
  token: string
  num: number
}

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    num: 0,
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
    },
  },
  actions: {
    login({ commit }, playload: ILogin) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', 'aaaa')
        console.log('resolve', resolve)
        console.log('reject', reject)
        console.log('playload', playload)
      })
    },
  },
}

export default user
