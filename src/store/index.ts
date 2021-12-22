import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import { user, IUserState } from './modules/user'
import { app, IAppState } from './modules/app'
import { settings, ISettingsState } from './modules/settings'
import { tagsView, ITagsViewState } from './modules/tagsView'
import { permission, IPermissionState } from './modules/permission'

export interface IRootState {
  user: IUserState
  app: IAppState
  settings: ISettingsState
  tagsView: ITagsViewState
  permission: IPermissionState
}

export const key: InjectionKey<Store<IRootState>> = Symbol('InjectionKey')

export const store = createStore<IRootState>({
  modules: {
    user,
    app,
    settings,
    tagsView,
    permission,
  },
  getters,
})

export function useStore(): Store<IRootState> {
  return baseUseStore(key)
}
