import {
  request,
  requestAll
} from './request'

/**
 * 打开页面
 * @param {String} url 要打开的地址
 */
const openPage = (url) => {
  const location = window.location
  const pathname = location.pathname

  if (typeof pathname === 'string') {
    if (url.indexOf('http') !== -1) {
      location.href = url
    } else {
      let pathArr = pathname.split('/')

      pathArr.length = pathArr.length - 1
      location.href = location.protocol + '//' + location.host + pathArr.join('/') + '/' + url
    }
  }
}

const extend = (...args) => {
  return Object.assign(...args)
}

export default {
  openPage,
  request,
  requestAll,
  extend
}
