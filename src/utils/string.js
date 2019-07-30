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
   * 判断一个字符串是否是手机号码
   * @param {String} str 要检验的字符串
   * 正则：手机号（精确）
   * <p>移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198</p>
   * <p>联通：130、131、132、145、155、156、175、176、185、186、166</p>
   * <p>电信：133、153、173、177、180、181、189、199</p>
   * <p>全球星：1349</p>
   * <p>虚拟运营商：170</p>
   * @return {Boolean} true or false
   */
  isPhoneNum(str) {
    if (!str) {
      return str;
    }

    return /^(86)?1(3|4|5|6|7|8|9)\d{9}$/.test(str);
  },

  /**
   * 判断一个字符串是否是手机号码或者是座机号码
   * @param {String} str 要检验的字符串
   * @return {Boolean} true or false
   */
  isTelNum(str) {
    if (!str) {
      return str;
    }

    /**
     * 这是固定电话的正则
     * 区号 前面一个0，后面跟2-3位数字，区号后面可以加 - 也可以不加
     * 电话号 5-8位数字，不以0开头
     * 分机号 一般都是3位数字，我们认为大于等于3位，小于8位
     */
    return this.isPhoneNum(str) || /^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{3,8})?$/.test(str);
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