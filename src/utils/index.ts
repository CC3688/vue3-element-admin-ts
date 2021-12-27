import { RouteRecordRaw } from 'vue-router'

// 延迟函数
export const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

// 防抖函数
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

/**
 * 判断一个值是正是假
 * @param {any} obj
 * @returns {boolean}
 */
export function isTruly(obj: any) {
  return obj === 0 ? true : !!obj
}

/**
 * @parmas routes: RouteRecordRaw[]
 * @return RouteRecordRaw[]
 */
export function flateRoute(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const arr: RouteRecordRaw[] = []
  function flat(routes: RouteRecordRaw[]) {
    routes.forEach((i) => {
      arr.push(i)
      if (i.children) {
        flat(i.children)
      }
    })
  }
  flat(routes)
  return arr
}

/**
 *
 * @param target
 * @param source
 * @returns target
 */
export function mergeOptions<T extends { [propName: string]: any }>(
  target: T,
  source: T
): T {
  type KT = keyof T

  const keys = Reflect.ownKeys(source) as KT[]
  keys.forEach((k) => {
    if (!Reflect.has(target, k)) {
      target[k] = source[k]
    } else {
      if (typeof target[k] === 'object') {
        if (Array.isArray(target[k]) || target[k] === null) {
          target[k] = source[k]
        } else {
          return mergeOptions(target[k], source[k])
        }
      } else {
        target[k] = source[k]
      }
    }
  })

  return target
}


/**
 *  router name to Upper Camel Case
 * @param str: string
 * @param flag: string
 * @retunr string
 */
 export function toUpperCamelCase(str: string, flag = '_') {
  let temp = ''
  const arr = str.split(flag)
  arr.forEach((item) => {
    temp += `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`
  })
  return temp
}