/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: 移值 M7 框架中的 Util.storage
 */

if (!('localStorage' in window)) {
  throw new Error('你的浏览器不支持 storage api')
}

const localStorage = window.localStorage

export default {
  /**
   * 存储键值对
   * @param {String} key 键
   * @param {String} value 值
   */
  setItem (key, value) {
    if (!key) {
      return
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    localStorage.setItem(key, value)
  },
  /**
   * 读取键值对
   * @param {String} key 键
   * @param {Boolean} isJson 是否自动转为JSONObject对象
   */
  getItem (key, isJson) {
    let value = localStorage.getItem(key)
    let result = value

    if (typeof result === 'string' && isJson) {
      try {
        result = JSON.parse(value)
      } catch {
        result = value
      }
    }

    return result
  },
  /**
   * 移除键值对
   * @param {String} key 键
   */
  removeItem (key) {
    localStorage.removeItem(key)
  },
  /**
   * 清空所有键值对
   */
  clear () {
    localStorage.clear()
  },
  /**
   * 遍历键值对
   * @param {Function} callback 回调函数
   * @param {Boolean} isJson 是否转换为 JSONObject 对象
   */
  each (callback, isJson) {
    const keys = Object.keys(localStorage)

    keys.forEach((e, i) => {
      callback(e, this.getItem(e, isJson))
    })
  }
}
