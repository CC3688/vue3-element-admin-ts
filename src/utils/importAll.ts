import { toUpperCamelCase } from '@/utils'

/**
 * require.context 导入 文件夹
 * @param files  __WebpackModuleApi.RequireContext
 * @returns 默认导出的数组
 */
export function importAll(files: __WebpackModuleApi.RequireContext) {
  const allModulesRouter = files.keys().map((file) => {
    return files(file)
  })
  return allModulesRouter
}

/**
 * 路由文件夹的自动导入  默认导入
 * @param files
 * @returns 路由
 */
export function importRoute(files: __WebpackModuleApi.RequireContext) {
  return importAll(files).map((i) => i.default)
}

/**
 * Store文件夹的自动导入  具名导入
 * @param files
 * @returns 路由
 */
export function importStore(files: __WebpackModuleApi.RequireContext) {
  const temp: any = {}
  const stores = importAll(files)
  stores.forEach((store) => {
    const keys = Reflect.ownKeys(store).filter(
      (i) => typeof i === 'string' && i !== '__esModule' && i !== 'default'
    )
    keys.forEach((k) => {
      temp[k] = store[k]
    })
  })
  return temp
}

/**
 * 路由文件夹的components 组件  默认导入
 * 1  所有组件, 需要外层包一个文件夹
 * 2  只读取 组件文件里的文件, 不包含组件文件夹里的文件
 * 3  组件名默认是 组件文件下文件的 文件名(首字母大写)
 * 3  如果 组件文件夹下文件的 的文件名为 index 则以 组件文件夹 为 组件名
 * @param files
 * @returns 路由
 */
export function importComponent(files: __WebpackModuleApi.RequireContext) {
  const temp: any = {}
  const all = importAll(files)
    .filter((i) => i.default.__file?.split('/').length < 5)
    .sort((a, b) => {
      const aLength = a.default.__file
        .split('/')
        .filter((n: string) => n !== 'index.vue').length
      const bLength = b.default.__file
        .split('/')
        .filter((n: string) => n !== 'index.vue').length
      return aLength - bLength
    })

  all.forEach((i) => {
    const tempKeys = Reflect.ownKeys(temp)
    const nameOptions = i.default.__file
      .split('/')
      .filter(
        (n: string) => n !== 'index.vue' && n !== 'src' && n !== 'components'
      )
      .map((m: string) => {
        if (m.endsWith('.vue')) {
          return toUpperCamelCase(m.replace('.vue', ''))
        }
        return toUpperCamelCase(m)
      })
    if (nameOptions.length === 1) {
      if (!tempKeys.includes(nameOptions[0])) {
        temp[nameOptions[0]] = i.default
      }
    } else {
      if (!tempKeys.includes(nameOptions[1])) {
        temp[nameOptions[1]] = i.default
      } else {
        const key = nameOptions[0] + nameOptions[1]
        if (!tempKeys.includes(key)) {
          temp[key] = i.default
        }
      }
    }
  })
  return temp
}
