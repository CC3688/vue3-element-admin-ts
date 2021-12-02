/**
 * 判断一个值是正是假
 * @param {any} obj
 * @returns {boolean}
 */
export function isTruly(obj: any) {
  return obj === 0 ? true : !!obj
}
