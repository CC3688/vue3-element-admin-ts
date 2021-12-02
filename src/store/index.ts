import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import user, { IUserState } from './modules/user'

export interface IRootState {
  user: IUserState
}

export const key: InjectionKey<Store<IRootState>> = Symbol('InjectionKey')

export const store = createStore<IRootState>({
  modules: {
    user,
  },
  getters,
})

export function useStore(): Store<IRootState> {
  return baseUseStore(key)
}
