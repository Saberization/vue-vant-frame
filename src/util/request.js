import axios from 'axios'
import Util from './index'
import store from '@/store.js'
import Config from '@shared/config'

const defaultSettings = {
  type: 'post',
  url: '',
  data: '',
  dataType: 'json',
  timeout: 10000,
  headers: {},
  contentType: 'application/x-www-form-urlencoded',
  withCredentials: false,
  isAutoProxy: Config.isAutoProxy
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

function request(options) {
  options = Util.extend(defaultSettings, options)
  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    responseType: options.dataType,
    withCredentials: options.withCredentials
  }

  const contentType = options.contentType,
    headers = options.headers,
    isAutoProxy = options.isAutoProxy

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

  return axios(params)
}

function requestAll() {
  return axios.all([].slice.call(arguments))
}

export {
  request,
  requestAll
}