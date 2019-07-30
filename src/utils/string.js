export default {

  /**
   * 2019-06-13 14:05:46
   * 验证是否是整数
   * @param {String} v 要验证的数字
   * @returns {Boolean} 是否是整数
   */
  isInt(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    const isInteger = function (s) {
      if (s < 0) {
        s = -s;
      }
      const n = String(s);

      return n.length > 0 && !(/[^0-9]/).test(n);
    };

    return isInteger(v);
  },

  /**
   * 2019-06-13 14:05:46
   * 验证是否是数字
   * @param {String} v 要验证的数字或字符串数字
   * @returns {Boolean} 是否是数字或者字符串数字
   */
  isFloat(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    const n = String(v);

    if (n.indexOf('-') !== -1 && n.indexOf('-') !== 0) {
      return false;
    }

    n = n.replace('-', '');

    if (n.split('.').length > 2) {
      return false;
    }

    return n.length > 0 && !(/[^0-9.]/).test(n) && !(n.charAt(n.length - 1) === '.');
  },

  /**
   * 2019-06-13 14:05:46
   * 验证是否是邮箱
   * @param {String} v 要验证的邮箱
   * @returns {Boolean} 是否是邮箱
   */
  isEmail(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    if (v.search(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 2019-06-13 14:05:46
   * 验证是否是 url
   * @param {String} v url
   * @returns {Boolean} 是否是url
   */
  isUrl(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    var IsURL = function (strurl) {
      strurl = strurl.toLowerCase().split('?')[0];

      var strRegex = '^((https|http|ftp|rtsp|mms)?://)?' +
        '(([0-9]{1,3}.){3}[0-9]{1,3}' +
        '|' +
        "([0-9a-z_!~*'()-]+.)*" +
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' +
        '[a-z]{2,6})' +
        '(:[0-9]{1,5})?' +
        '((/?)|' +
        "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

      var re = new RegExp(strRegex);

      if (re.test(strurl)) {
        return (true);
      } else {
        return (false);
      }
    };

    return IsURL(v);
  },

  /**
   * 2019-06-13 14:05:46
   * 验证是否是数字
   * @param {String} v 要验证的数字或字符串数字
   * @returns {Boolean} 是否是数字或者字符串数字
   */
  isFloat(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    var n = String(v);

    if (n.indexOf('-') !== -1 && n.indexOf('-') !== 0) {
      return false;
    }

    n = n.replace('-', '');

    if (n.split('.').length > 2) {
      return false;
    }

    return n.length > 0 && !(/[^0-9.]/).test(n) && !(n.charAt(n.length - 1) === '.');
  },

  /**
   * 2019-06-13 14:06:59
   * 手机号码格式验证
   * @param {String} v 手机号码
   * @returns {Boolean} 是否是手机号码
   */
  isMobile(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    return (/^1[3456789]\d{9}$/).test(v);
  },

  /**
   * 2019-06-13 14:09:51
   * 固定电话号码验证
   * @param {String} v 固定电话号码
   * @returns {Boolean} 是否是固定电话号码
   */
  isTel(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    return (/^0\d{2,3}-?\d{7,8}$/).test(v) || (/^\(0\d{2,3}\)\d{7,8}$/).test(v);
  },

  /**
   * 2019-06-13 14:15:29
   * 电话号码格式验证
   * @param {String} v 电话号码
   * @returns {Boolean} 是否是电话号码
   */
  isPhone(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    return (/^1[3456789]\d{9}$/).test(v) || (/^0\d{2,3}-?\d{7,8}$/).test(v) || (/^\(0\d{2,3}\)\d{7,8}$/).test(v);
  },

  /**
   * 2019-06-13 14:15:29
   * 邮政编码格式验证
   * @param {String} v 邮政编码
   * @returns {Boolean} 是否是邮政编码
   */
  isPostCode(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    return (/^\d{6}$/).test(v);
  },

  /**
   * 2019-06-13 14:15:29
   * 组织机构代码
   * @param {String} v 组织机构代码
   * @returns {Boolean} 是否是组织机构代码
   */
  isOrgCode(v) {
    if (Util.isNull(v) || v === '') {
      return true;
    }

    // 组织机构代码
    if ((/^[A-Z0-9]{8}-[A-Z0-9]$/).test(v)) {
      return true;
    }

    // 统一社会信用代码
    var reg = /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]{10})$/;

    if (!reg.test(v)) {
      return false;
    }

    return true;
  },

  /**
   * 身份证验证
   * @param {String} v 身份证
   * @returns {Boolean} 是否是身份证
   */
  isIdCard(v) {
    if (Util.isNull(v) || v === "")
      return true;

    function validateIdCard(idCard) {
      // 15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

      // 如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          const idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
          const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
          let idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }

          const idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
          const idCardLast = idCard.substring(17); // 得到最后一位身份证号码

          // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast === "X" || idCardLast === "x") {
              return true;
            } else {
              return false;
            }
          } else {
            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else {
        return false;
      }
    }

    return validateIdCard(v);
  },

  /**
   * 过滤非法字符，过滤特殊字符与转义字符
   * @param {string} str 需要过滤的字符串
   * @param {RegExp} reg 正值式
   * @return {String} 返回过滤后的结果
   */
  excludeSpecial(str, reg) {
    if (!str) {
      return str;
    }

    reg = reg || /[/\b\f\n\r\t`~!@#$^&%*()=|{}+《》':;',[\].<>?~！@#￥……&*（）——【】‘’；：”“'。，、？]/g;
    str = str.replace(reg, '');

    return str;
  }
};