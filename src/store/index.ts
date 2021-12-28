import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import { IUserState } from './modules/user'
import { IAppState } from './modules/app'
import { ISettingsState } from './modules/settings'
import { ITagsViewState } from './modules/tagsView'
import { IPermissionState } from './modules/permission'
import { importStore } from '@/utils/importAll'

const files = importStore(require.context('./modules', false, /\.ts$/))

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
    ...files,
  },
  getters,
})

export function useStore(): Store<IRootState> {
  return baseUseStore(key)
}
