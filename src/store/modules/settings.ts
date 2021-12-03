import { Module } from 'vuex'
import { IRootState } from '../index'
import { settings as setting } from '@/utils/settings'
import variables from '@/style/element-variables.scss'

export interface ISettingsState {
  theme: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
}

type keys = keyof ISettingsState

export const settings: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state: () => ({
    theme: variables.theme,
    showSettings: setting.showSettings,
    tagsView: setting.tagsView,
    fixedHeader: setting.fixedHeader,
    sidebarLogo: setting.sidebarLogo,
  }),
  mutations: {
    CHANGE_SETTING: (
      state: ISettingsState,
      { key, value }: { key: keys; value: string | boolean }
    ) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        if (key === 'theme') {
          state[key] = value as string
        } else {
          state[key] = value as boolean
        }
      }
    },
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    },
  },
}
