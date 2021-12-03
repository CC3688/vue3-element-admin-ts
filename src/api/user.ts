import request from '@/utils/request'
import { ILogin } from '@/interfaces/user'

const api = {
  login: 'user',
}

export function login<T>(params: ILogin) {
  return request<T>({
    loading: false,
    repeat: false,
    url: api.login,
    method: 'get',
    params,
  })
}
