import {
  ajax,
  ajaxAll
} from './request';

/**
 * 打开页面
 * @param {String} url 要打开的地址
 */
const openPage = (url) => {
  const {
    location
  } = window;
  const {
    pathname
  } = location;

  if (typeof pathname === 'string') {
    if (url.indexOf('http') !== -1) {
      location.href = url;
    } else {
      const pathArr = pathname.split('/');

      pathArr.length -= 1;
      location.href = `${location.protocol}//${location.host}${pathArr.join('/')}/${url}`;
    }
  }
};

/**
 * 插入 Library 库
 * @param {Array} gather 集合
 * inject 插入位置
 * src 路径
 * type 类型
 * @return {Promise} Promise event
 */
const loaderLibrary = (...args) => {
  const promiseAssembly = [];

  args.forEach((e) => {
    const inject = e.inject;
    const src = e.src;
    const type = e.type;
    let el = null;
    let promise = new Promise((resolve) => {
      if (type === 'css') {
        el = document.createElement('link');
        el.link = src;
        el.ref = 'stylesheet';
      } else {
        el = document.createElement('script');
        el.src = src;
      }

      if (inject === 'head') {
        document.head.appendChild(el);
      } else {
        document.body.appendChild(el);
      }

      el.onload = function () {
        resolve();
      };
    });

    promiseAssembly.push(promise);
  });

  return Promise.all(promiseAssembly);
};

const extend = (...args) => Object.assign(...args);

const uuid = (options) => {
  options = options || {};

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  let radix = options.radix || chars.length;
  let len = options.len || 32;
  const type = options.type || 'default';

  len = Math.min(len, 36);
  len = Math.max(len, 4);
  radix = Math.min(radix, 62);
  radix = Math.max(radix, 2);

  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }

    if (type === 'default') {
      len > 23 && (uuid[23] = '-');
      len > 18 && (uuid[18] = '-');
      len > 13 && (uuid[13] = '-');
      len > 8 && (uuid[8] = '-');
    }
  }

  return uuid.join('');
};

/**
 * 从 URL 截取参数
 * @param {String} key 关键字
 * @returns {String} 返回参数
 */
const getExtraDataByKey = (key) => {
  let uri = decodeURIComponent(window.location.href);
  let regExp = new RegExp(`\\??${key}=([^&]*)`);
  let result = uri.match(regExp);

  return (Array.isArray(result) && result[1]) || '';
};

const os = (() => {
  const {
    userAgent,
    appVersion
  } = window.navigator;

  let version = null;
  let isBadAndroid = false;
  let ios = false;

  let android = (() => {
    const result = userAgent.match(/(Android);?[\s/]+([\d.]+)?/);

    if (result) {
      version = result[2];
      isBadAndroid = !/Chrome\/\d/.test(appVersion);

      return true;
    }

    return false;
  })();

  let iphone = (() => {
    const result = userAgent.match(/(iPhone\sOS)\s([\d_]+)/);

    if (result) {
      ios = true;
      version = result[2].replace(/_/g, '.');

      return true;
    }

    return false;
  })();

  let ipad = (() => {
    const result = userAgent.match(/(iPad).*OS\s([\d_]+)/);

    if (result) {
      ios = true;
      version = result[2].replace(/_/g, '.');

      return true;
    }

    return false;
  })();

  let ejs = (() => {
    return userAgent.match(/EpointEJS/i) || false;
  })();

  let dd = (() => {
    return userAgent.match(/DingTalk/i) || false;
  })();

  let h5 = (() => {
    return (!ejs && !dd) || false;
  })();

  return {
    android,
    version,
    isBadAndroid,
    ios,
    iphone,
    ipad,
    ejs,
    dd,
    h5
  };
})();

/**
 * 数据处理
 * @param {Object} response 处理数据
 * @param {Object} options 配置项
 * @returns {Boolean} data or true
 */
const dataProcess = (response, options) => {
  if (typeof response !== 'object') {
    console.error(`response的类型为 ${typeof response}`);

    return false;
  }

  let dataPath = options.dataPath;
  let data = null;

  const handler = (pathAssembly) => {
    let result = null;

    pathAssembly.forEach((path, index) => {
      let resolvePathData = result ? result[path] : response[path];

      if (resolvePathData) {
        result = resolvePathData;
      } else if (index === (pathAssembly.length - 1)) {
        result = undefined;
      }
    });

    return result;
  };

  if (dataPath) {
    if (Array.isArray(dataPath)) {
      dataPath.forEach((e) => {
        data = handler(e.split('.'));
      });

      return data;
    } else {
      return handler(dataPath.split('.'));
    }
  }

  return undefined;
};

export default {
  openPage,
  ajax,
  ajaxAll,
  extend,
  uuid,
  getExtraDataByKey,
  os,
  dataProcess,
  loaderLibrary
};
