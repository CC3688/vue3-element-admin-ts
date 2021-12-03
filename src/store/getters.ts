import { IRootState } from './index'
import { GetterTree } from 'vuex'

const getters: GetterTree<IRootState, IRootState> = {
  token: (state) => state.user.token,
  sidebar: (state) => state.app.sidebar,
}

export default getters
