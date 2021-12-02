import request from '@/utils/request'
import { ILogin } from '@/interfaces/user'

const api = {
  login: 'login',
}

export function login<T>(data: ILogin) {
  return request<T>({
    loading: false,
    repeat: false,
    url: api.login,
    method: 'post',
    data,
  })
}
