/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: 解析生成二维码 (包含了 qrcode.js 部分代码 [https://github.com/davidshimjs/qrcodejs])
 */

import '@public/lib/qrcode.js';

let qrcode = null;
const QRCode = window.QRCode;

if (QRCode && typeof QRCode === 'function') {
  const defaultSettings = {
    width: 128,
    height: 128,
    colorDark: '#000',
    colorLight: 'fff',
    correctLevel: QRCode.CorrectLevel.H
  };
  const getElement = function (el) {
    if (el) {
      if (el.nodeType && el.nodeType === 1) {
        return el;
      } else {
        return document.querySelector(el);
      }
    }
  };
  const extend = function () {
    const args = [].slice.call(arguments);
    const result = args[0];

    for (let i = 1, len = args.length; i < len; i++) {
      const item = args[i];

      for (let key in item) {
        if (result[key] === undefined) {
          result[key] = item[key];
        }
      }
    }

    return result;
  };

  qrcode = function (el, options) {
    el = getElement(el);
    options = extend(options, defaultSettings);

    return new QRCode(el, options);
  };
}

export default qrcode || {};
