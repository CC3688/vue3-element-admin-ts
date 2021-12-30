import request from '@/utils/request'
import { IPostParams } from '@/interfaces/compass'

const api = {
  getPost: '/posts',
}

export function getPost<T>(params: IPostParams) {
  return request<T>({
    url: api.getPost,
    method: 'get',
    params,
  })
}
