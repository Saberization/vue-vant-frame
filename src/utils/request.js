import axios from 'axios';
import Config from '@shared/config';
import { Toast } from 'vant';
import Util from './index';

const defaultSettings = {
  type: 'post',
  url: '',
  data: '',
  dataType: 'json',
  timeout: 10000,
  headers: {},
  contentType: 'application/x-www-form-urlencoded',
  withCredentials: false,
  delay: 0,
  isAutoProxy: Config.ajax.isAutoProxy,
  error: () => {},
  complete: () => {}
};

let params = {};
const ejsVer = Config.ejsVer;
const setHeader = function (key, value) {
  const { headers } = params;

  headers[key] = value;
};
const createInterceptors = function () {
  axios.interceptors.request.use((config) => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (ejsVer === 3 && Util.os.ejs) {
      ejs.auth.getToken({
        success: (result) => {
          config.headers.Authorization = `Bearer ${result.access_token}`;
        }
      });
    } else if (ejsVer === 3) {
      config.withCredentials = true;
    }

    return config;
  }, (error) => Promise.reject(error));
};

function ajax (options) {
  options = Util.extend(defaultSettings, options);
  params = {
    url: options.url,
    method: options.type,
    data: options.data,
    headers: options.headers,
    responseType: options.dataType,
    withCredentials: options.withCredentials
  };

  const { delay, contentType, headers, isAutoProxy, error, success, complete, beforeSend } = options;

  // 设置重试延迟
  axios.defaults.retryDelay = delay;

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

  if (typeof beforeSend === 'function') {
    beforeSend(axios);
  }

  if (typeof success !== 'function') {
    return axios(params);
  } else {
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
    }).then(() => {
      complete();
    });
  }
}

function ajaxAll (...args) {
  return axios.all(args);
}

export {
  ajax,
  ajaxAll
};
