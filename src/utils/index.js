import {
  ajax,
  ajaxAll
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

const loaderExternals = (...args) => {
  if (args.length >= 2) {
    for (let i = 0, len = args.length; i < len; i++) {
      let el
      let item = args[i]
      let type = item.type || 'js'
      let url = item.url
      let position = item.position || 'body'

      if (type === 'js') {
        el = document.createElement('script')
        el.src = url
      } else if (type === 'css') {
        el = document.createElement('link')
        el.href = url
        el.rel = 'stylesheet'
      }

      if (position === 'head') {
        document.head.appendChild(el)
      } else if (position === 'body') {
        document.body.appendChild(el)
      }

      el.onload = item.onload
    }
  }

  if (args.length === 1) {
    let item = args[0]
    let url = item.url
    let position = item.position || 'body'
    let type = item.type || 'js'
    let onload = item.onload
    let el
    const promiseArr = []

    if (Array.isArray(url)) {
      for (let i = 0, len = url.length; i < len; i++) {
        let _url = url[i]
        let _type = Array.isArray(type) ? type[i] : type
        let _position = Array.isArray(position) ? position[i] : position

        if (_type === 'js') {
          el = document.createElement('script')
          el.src = _url
        } else if (_type === 'css') {
          el = document.createElement('link')
          el.href = url
          el.rel = 'stylesheet'
        }

        _position === 'head' ? document.head.appendChild(el) : document.body.appendChild(el)
        promiseArr.push(new Promise((resolve) => {
          el.onload = resolve
        }))
      }

      Promise.all(promiseArr).then(() => {
        if (onload && typeof onload === 'function') {
          onload()
        }
      })
    } else {
      if (type === 'js') {
        el = document.createElement('script')
        el.src = url
      } else if (type === 'css') {
        el = document.createElement('link')
        el.href = url
        el.rel = 'stylesheet'
      }

      position === 'head' ? document.head.appendChild(el) : document.body.appendChild(el)
      el.onload = onload
    }
  }
}

const extend = (...args) => {
  return Object.assign(...args)
}

export default {
  openPage,
  ajax,
  ajaxAll,
  extend,
  loaderExternals
}
