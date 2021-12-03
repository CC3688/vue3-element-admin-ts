import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import { user, IUserState } from './modules/user'
import { app, IAppState } from './modules/app'
import { settings, ISettingsState } from './modules/settings'
import { tagsView, ITagsViewState } from './modules/tagsView'
export interface IRootState {
  user: IUserState
  app: IAppState
  settings: ISettingsState
  tagsView: ITagsViewState
}

export const key: InjectionKey<Store<IRootState>> = Symbol('InjectionKey')

export const store = createStore<IRootState>({
  modules: {
    user,
    app,
    settings,
    tagsView,
  },
  getters,
})

export function useStore(): Store<IRootState> {
  return baseUseStore(key)
}
