// import { AxiosRequestConfig } from 'axios'
export {}

declare module 'axios' {
  interface AxiosRequestConfig {
    cache?: boolean
    repeat?: boolean
    loading?: boolean
    notice?: boolean
  }
}
