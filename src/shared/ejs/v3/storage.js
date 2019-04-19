const localStorage = window.localStorage;

export default {
  getItem (options, { success, error, reject, resolve }) {
    const keys = options.key;
    const values = {};

    try {
      for (let i = 0, len = keys.length; i < len; i++) {
        values[keys[i]] = localStorage.getItem(keys[i]);
      }
    } catch (msg) {
      const err = {
        code: 0,
        msg: `localStorage值获取出错${JSON.stringify(keys)}`,
        result: msg
      };

      error && error(err);
      reject && reject(err);

      return;
    }

    success && success(values);
    resolve && resolve(values);
  },
  setItem (options, { success, error, reject, resolve }) {
    const keys = Object.keys(options);

    try {
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
  
        if (key !== 'success' && key !== 'error') {
          localStorage.setItem(key, options[key]);
        }
      }
    } catch (msg) {
      let errorMsg = '';

      if (msg.name === 'QuotaExceededError') {
        errorMsg = '超出本地存储限额，建议先清除一些无用空间!';
      } else {
        errorMsg = 'localStorage存储值出错';
      }

      error && error(errorMsg);
      reject && reject(errorMsg);

      return;
    }

    success && success({});
    resolve && resolve({});
  },
  removeItem (options, { success, error, resolve, reject }) {
    const keys = options.key;

    try {
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];

        console.log(key);
  
        localStorage.removeItem(key);
      }
    } catch (msg) {
      const err = {
        code: 0,
        msg: `localStorage值删除出错${keys}`,
        result: msg
      };

      error && error(err);
      reject && reject(err);
    }

    success && success({});
    resolve && resolve({});
  }
}