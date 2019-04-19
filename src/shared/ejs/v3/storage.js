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
  setItem (options) {

  },
  removeItem (options) {

  }
}