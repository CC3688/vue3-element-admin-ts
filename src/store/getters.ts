import { IRootState } from './index'
import { GetterTree } from 'vuex'

const getters: GetterTree<IRootState, IRootState> = {
  token: (state) => state.user.token,
  sidebar: (state) => state.app.sidebar,
  routers: (state) => state.permission.routers,
  permissionRouters: (state) => state.permission.permissionRouters,
  curRoute: (state) => state.permission.curRoute,
}

export default getters
