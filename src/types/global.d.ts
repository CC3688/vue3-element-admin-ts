type TimeoutHandle = ReturnType<typeof setTimeout>
type IntervalHandle = ReturnType<typeof setInterval>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

interface Math {
  easeInOutQuad: function
}

interface Window {
  webkitRequestAnimationFrame: function
  mozRequestAnimationFrame: function
}

interface Document {
  body: HTMLElement
}
