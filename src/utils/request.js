import axios from 'axios'
import Util from './index'
import store from '@/store.js'
import Config from '@shared/config'
import { Toast } from 'vant'

const defaultSettings = {
  type: 'post',
  url: '',
  data: '',
  dataType: 'json',
  timeout: 10000,
  headers: {},
  contentType: 'application/x-www-form-urlencoded',
  withCredentials: false,
  isAutoProxy: Config.ajax.isAutoProxy,
  success: () => {},
  error: () => {}
}

let params = {}
let setHeader = function (key, value) {
  const headers = params.headers
  headers[key] = value
}
let createInterceptors = function () {
  axios.interceptors.request.use(config => {
    let token = store.state.token

    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }

    return config
  }, error => {
    return Promise.reject(error)
  })
}

function ajax (options) {
  options = Util.extend(defaultSettings, options)
  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    responseType: options.dataType,
    withCredentials: options.withCredentials
  }

  const contentType = options.contentType
  const headers = options.headers
  const isAutoProxy = options.isAutoProxy
  const error = options.error
  const success = options.success

  for (let key in headers) {
    setHeader(key, headers[key])
  }

  if (contentType) {
    setHeader('Content-Type', contentType)
  }

  if (isAutoProxy) {
    // 创建拦截器
    createInterceptors()
  }

  axios(params).then(response => {
    let { status, statusText, data } = response

    if ((status !== 200 && statusText !== 'OK') || typeof data.errcode === 'number') {
      error(data)

      if (Config.ajax.isAutoErrToast) {
        Toast(data.errmsg)
      }
    } else {
      success(data, response)
    }
  }).catch(err => {
    error(err)
  })
}

function ajaxAll () {
  return axios.all([].slice.call(arguments))
}

export {
  ajax,
  ajaxAll
}
