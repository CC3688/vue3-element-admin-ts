export {}
declare module 'axios' {
  interface AxiosRequestConfig {
    cache?: boolean
    repeat?: boolean
    loading?: boolean
    notice?: boolean
  }
}
