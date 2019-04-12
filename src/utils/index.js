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

const loaderExternals = (...args) => {
  if (args.length >= 2) {
    for (let i = 0, len = args.length; i < len; i++) {
      let el;
      const item = args[i];
      const type = item.type || 'js';
      const {
        url
      } = item;
      const position = item.position || 'body';

      if (type === 'js') {
        el = document.createElement('script');
        el.src = url;
      } else if (type === 'css') {
        el = document.createElement('link');
        el.href = url;
        el.rel = 'stylesheet';
      }

      if (position === 'head') {
        document.head.appendChild(el);
      } else if (position === 'body') {
        document.body.appendChild(el);
      }

      el.onload = item.onload;
    }
  }

  if (args.length === 1) {
    const item = args[0];
    const {
      url
    } = item;
    const position = item.position || 'body';
    const type = item.type || 'js';
    const {
      onload
    } = item;
    let el;
    const promiseArr = [];

    if (Array.isArray(url)) {
      for (let i = 0, len = url.length; i < len; i++) {
        const _url = url[i];
        const _type = Array.isArray(type) ? type[i] : type;
        const _position = Array.isArray(position) ? position[i] : position;

        if (_type === 'js') {
          el = document.createElement('script');
          el.src = _url;
        } else if (_type === 'css') {
          el = document.createElement('link');
          el.href = url;
          el.rel = 'stylesheet';
        }

        _position === 'head' ? document.head.appendChild(el) : document.body.appendChild(el);
        promiseArr.push(new Promise((resolve) => {
          el.onload = resolve;
        }));
      }

      Promise.all(promiseArr).then(() => {
        if (onload && typeof onload === 'function') {
          onload();
        }
      });
    } else {
      if (type === 'js') {
        el = document.createElement('script');
        el.src = url;
      } else if (type === 'css') {
        el = document.createElement('link');
        el.href = url;
        el.rel = 'stylesheet';
      }

      position === 'head' ? document.head.appendChild(el) : document.body.appendChild(el);
      el.onload = onload;
    }
  }
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

export default {
  openPage,
  ajax,
  ajaxAll,
  extend,
  loaderExternals,
  uuid,
  getExtraDataByKey,
  os
};