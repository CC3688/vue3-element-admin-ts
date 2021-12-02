import { IRootState } from './index'
import { GetterTree } from 'vuex'

const getters: GetterTree<IRootState, IRootState> = {
  token: (state: IRootState) => state.user.token,
}

export default getters
