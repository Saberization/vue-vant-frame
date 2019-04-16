import axios from 'axios';
import Config from '@shared/config';
import { Toast } from 'vant';
import Util from './index';
import Token from './token';

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
};

let params = {};
const setHeader = function (key, value) {
  const { headers } = params;

  headers[key] = value;
};
const createInterceptors = function () {
  axios.interceptors.request.use((config) => {
    const token = '';

    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  }, (error) => Promise.reject(error));
};

function ajax(options) {
  options = Util.extend(defaultSettings, options);
  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    responseType: options.dataType,
    withCredentials: options.withCredentials
  };

  const { contentType, headers, isAutoProxy, error, success} = options;

  for (const key in headers) {
    setHeader(key, headers[key]);
  }

  if (contentType) {
    setHeader('Content-Type', contentType);
  }

  if (isAutoProxy) {
    // 创建拦截器
    createInterceptors();
  }

  axios(params).then((response) => {
    const { status, statusText, data } = response;

    if ((status !== 200 && statusText !== 'OK') || typeof data.errcode === 'number') {
      error(data);

      if (Config.ajax.isAutoErrToast) {
        Toast(data.errmsg);
      }
    } else {
      success(data, response);
    }
  }).catch((err) => {
    error(err);
  });
}

function ajaxAll(...args) {
  return axios.all(args);
}

export {
  ajax,
  ajaxAll
};
