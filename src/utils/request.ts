import axios, { AxiosRequestConfig } from 'axios'
import md5 from 'md5'
import { ElNotification, ElLoading } from 'element-plus'
import { store } from '@/store'
import { getToken } from '@/utils/auth'
import { apiCacheTime } from '@/utils/config'
import { isTruly } from '@/utils'

const cacheResult: { [propName: string]: any } = {} // eslint-disable-line
let requestQueue: string[] = []

let globalLoading: { close: () => void }

/**
 *
 * @param {config}  请求配置信息
 * @return {*}      请求签名加密后字符串
 */
function getKey(config: AxiosRequestConfig): string {
  const data = JSON.parse(JSON.stringify(config))
  if (data.baseURL) {
    data.url = data.url.split(data.baseURL).pop()
  }
  data.url = data.url.startsWith('/') ? data.url : '/' + data.url
  if (!data.data) {
    data.data = {}
  }
  if (!data.params) {
    data.params = {}
  }
  data.method = data.method.toLocaleLowerCase()
  data.url = data.url.toLocaleLowerCase()
  try {
    data.data =
      typeof data.data === 'string'
        ? JSON.stringify(JSON.parse(data.data))
        : JSON.stringify(data.data)
  } catch (err) {
    console.log('err:', err)
  }
  try {
    data.params =
      typeof data.params === 'string'
        ? JSON.stringify(JSON.parse(data.params))
        : JSON.stringify(data.params)
  } catch (err) {
    console.log('err:', err)
  }
  return md5(data.method + data.url + data.data + data.params)
}

/**
 * 关闭loading
 * @param {timestamp}  缓存结果的时间戳
 * @param {interval}   缓存有效时间
 * @return {*}         true: 过期失效     false: 有效
 */
function closeLoading() {
  requestQueue.length === 0 && globalLoading && globalLoading.close()
}

/**
 * 判断缓存是否有效
 * @param {timestamp}  缓存结果的时间戳
 * @param {interval}   缓存有效时间
 * @return {*}         true: 过期失效     false: 有效
 */
function isExpires(timestamp: number, interval = apiCacheTime): boolean {
  const now = new Date().getTime()
  return now > timestamp + interval * 1000
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API as string,
  timeout: 1000 * 30, // request timeout
  method: 'POST',
})

// request interceptor
service.interceptors.request.use(
  async (config) => {
    // do something before request is sent
    if (store.getters.token) {
      Reflect.set(config, 'headers', { Authorization: `Bearer ${getToken()}` })
    }

    return config
  },
  (error) => {
    // 重置请求队列
    requestQueue = []
    closeLoading()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 获取 请求的签名
    const key = getKey(response.config)
    const res = response.data as any // eslint-disable-line
    // 从请求队列中移除
    const index = requestQueue.findIndex((i) => i === key)
    if (index !== -1) {
      requestQueue.splice(index, 1)
    }
    closeLoading()

    // 处理 非请求错误的 错误
    if (Reflect.has(res, 'meta') && res.meta.status > 300) {
      if (!Reflect.has(response.config, 'notice') || response.config.notice) {
        ElNotification({
          type: 'error',
          title: '错误信息',
          message: res.meta.msg,
        })
      }
      return Promise.reject(res)
    }

    // 缓存请求数据
    if (Reflect.has(cacheResult, key)) {
      cacheResult[key] = {
        data: response,
        timestamp: new Date().getTime(),
      }
    }

    // const result = Object.prototype.hasOwnProperty.call(res, 'data') ? (res.data !== null ? res.data : res) : res
    return Promise.resolve(response)
  },
  (error) => {
    console.log('request error:', error)
    // 重置请求队列
    requestQueue = []
    closeLoading()
    // 登录错误
    let message = null
    if (
      error.response &&
      error.response.data &&
      Reflect.has(error.response.data, 'error_description') &&
      error.response.data.error_description
    ) {
      message = error.response.data.error_description
    }

    ElNotification({
      type: 'error',
      title: '错误信息',
      message: message || error.message,
    })

    if (error?.response?.status === 401) {
      // removeToken()
      location.href = '/'
    }

    return Promise.reject(error)
  }
)

/**
 * 缓存及去重复请求
 * @param {boolean} cache    true 缓存    false 不缓存   不传默认 不缓存   失败的请求不进行缓存
 * @param {boolean} loading  true 添加    false 不添加   不传默认 添加
 * @param {boolean} repeat   true 可以    false 不可以   不传默认 不可以
 * @param {boolean} notice   true 通知    false 不通知   不传默认 通知   请求成功, 后台的报错处理
 * @returns axios service
 *
 */

// interface Base<T> {
//   data: T
//   meta: {
//     status: number
//     msg: string
//   }
// }

async function http<T>(config: AxiosRequestConfig): Promise<T> {
  const key = getKey(config)
  // 默认不添加cache  cache: true 缓存   false 不缓存
  if (Reflect.has(config, 'cache') && config.cache) {
    if (
      Reflect.has(cacheResult, key) &&
      isTruly(cacheResult[key]) &&
      !isExpires(cacheResult[key].timestamp)
    ) {
      closeLoading()
      return Promise.resolve(cacheResult[key].data.data)
    } else {
      cacheResult[key] = null
    }
  }

  // 默认添加 loading,  loading: true 添加    false 不添加
  if (!Reflect.has(config, 'loading') || config.loading) {
    globalLoading = ElLoading.service({
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.2)',
    })
  }
  // 默认不可以重复请求   repeat: true 可以    false 不可以
  if (!Reflect.has(config, 'repeat') || !config.repeat) {
    if (requestQueue.includes(key)) {
      closeLoading()
      return Promise.reject(
        new Error(
          'axios 封装了防止重复请求, 如果需要重复请求,请添加repeat: true'
        )
      )
    }
    requestQueue.push(key)
  }
  const res = await service.request<T>(config)
  return Promise.resolve(res.data)
}

export default http
