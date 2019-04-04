/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: 关于 base64 的一些操作
 * 比如 base64 转换为 blob 对象
 * 或者 blob 对象转换成 base64
 * 去除 base64 url 部分
 * 获取 base64 url 部分
 * 获取 base64 的 mime 类型
 */

export default {
  /**
   * base64 转换成 blob 对象
   * @param {String} b64 base64值
   * returns {Object} blob对象
   */
  base64ToBlob (b64) {
    let arr = b64.split(',')

    // 解码 b64 并且转换成 btype
    let btypes = window.atob(arr[1])
    let mime = this.getMime(arr[0])

    // 处理异常，将 ascii 码小于 0 的转换为大于 0 的
    let ab = new ArrayBuffer(btypes.length)
    // 生成识图（直接针对内存）：8位无符号整数，长度1个字节
    let ia = new Uint8Array(ab)

    for (let i = 0, len = btypes.length; i < len; i++) {
      ia[i] = btypes.charCodeAt(i)
    }

    return new Blob([ab], {
      type: mime
    })
  },
  /*
   * blob 转换成 base64 对象
   * @param {object} blob 文件对象
   * @param {Function} callback 回调函数
   * returns {String} 该文件的base64值
   */
  blobToBase64 (blob, callback) {
    const fileReader = new FileReader()
    const that = this

    fileReader.readAsDataURL(blob)
    fileReader.onload = function (e) {
      callback && callback.call(that, e.target.result)
    }
  },
  /**
   * 获取 base64 的类型
   * @param {String} b64 base64值
   * @returns {String} mime 类型
   */
  getMime (b64) {
    return b64.match(/:(.*);/)[1]
  },
  /**
   * 获取 base64 的 url 部分
   * @param {String} b64 base64值
   * @returns {String} 该 base64 的 url 部分
   */
  getBase64Url (b64) {
    return b64.match(/(.*),/)[1]
  },
  /**
   * 获取 base64 去除 url 部分
   * @param {String} b64 base64值
   * @returns {String} 该 base64 去除 url 后的值
   */
  getBase64NotUrl (b64) {
    return b64.replace(/^data.*,/, '')
  }
}
