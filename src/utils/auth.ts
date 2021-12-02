// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import Cookies from 'js-cookie'
import { TokenKey } from '@/utils/const'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getToken = () => Cookies.get(TokenKey)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setToken = (token: string) => Cookies.set(TokenKey, token)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeToken = () => Cookies.remove(TokenKey)
