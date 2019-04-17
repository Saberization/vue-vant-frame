/**
 * 验证码集合
 */
const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * 15位的身份验证
 */
const idcard15 = {

  /**
   * 验证身份证的出生日期是否合法日期
   * 可以去除一些  1098-13-23 等一些非法格式
   * @param {String} idcard 身份证号
   * @return {Boolean} 是否验证通过
   */
  birthValidate (idcard) {
    // 18位生日认证为  6, 10 10, 12  12, 14
    const year = idcard.substring(6, 8);
    const month = idcard.substring(8, 10);
    const day = idcard.substring(10, 12);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));

    if (tempDate.getYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
      return false;
    }

    return true;
  },

  /**
   * 获取身份证中的出生日期
   * 以 - 隔开
   * @param {String} idcard 身份证号
   * @return {String} 出生日期
   * @example 2017-07-03
   */
  birthExtract (idcard) {
    const year = idcard.substring(6, 8);
    const month = idcard.substring(8, 10);
    const day = idcard.substring(10, 12);

    return `19${year}-${month}-${day}`;
  }
};

/**
 * 18位的身份验证
 */
const idcard18 = {

  /**
   * 验证身份证是否合法
   * 采用了关键特征值进行校验
   * @param {String} idcard 身份证号
   * @return {Boolean} 是否验证通过
   */
  validate (idcard) {
    let sum = 0;
    const arr = idcard.split('');

    if (arr[17].toLowerCase() === 'x') {
      arr[17] = 10;
    }
    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * arr[i];
    }

    const valCodePosition = sum % 11;

    // be careful number and string
    if (+arr[17] === ValideCode[valCodePosition]) {
      return true;
    }

    return false;
  },

  /**
   * 获取身份证中的出生日期
   * 以 - 隔开
   * @param {String} idcard 身份证号
   * @return {String} 出生日期
   * @example 2017-07-03
   */
  birthExtract (idcard) {
    const year = idcard.substring(6, 10);
    const month = idcard.substring(10, 12);
    const day = idcard.substring(12, 14);

    return `${year}-${month}-${day}`;
  }
};

export default {
  /**
   * 判断一个字符串是否由纯数字组成
   * @param {String} str 要检验的字符串
   * @return {Boolean} true or false
   */
  isNum (str) {
    if (!str) {
      return str;
    }

    return /^\d+$/.test(str);
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
  isPhoneNum (str) {
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
  isTelNum (str) {
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
   * 判断一个字符串是否是合法的EMAIL
   * @param {String} str 要检验的字符串
   * @return {Boolean} true or false
   */
  isEmail (str) {
    if (!str) {
      return str;
    }

    return /^(\w)+([-.]\w+)*@(\w)+((\.\w{2,4}){1,3})$/.test(str);
  },

  /**
   * 判断是否为外部url
   * @param {String} str 需验证的字符串
   * @return {Boolean} true or false
   */
  isExternalUrl (str) {
    if (!str) {
      return str;
    }

    return /^(http|https|ftp|file|\/\/).*$/.test(str);
  },

  /**
   * 过滤非法字符，过滤特殊字符与转义字符
   * @param {string} str 需要过滤的字符串
   * @param {RegExp} reg 正值式
   * @return {String} 返回过滤后的结果
   */
  excludeSpecial (str, reg) {
    if (!str) {
      return str;
    }

    reg = reg || /[/\b\f\n\r\t`~!@#$^&%*()=|{}+《》':;',[\].<>?~！@#￥……&*（）——【】‘’；：”“'。，、？]/g;
    str = str.replace(reg, '');

    return str;
  },

  /**
   * 身份证验证相关
   */
  idcard: {

    /**
     * 验证身份证是否合法
     * @param {String} idcard 身份证号
     * @param {Boolean} isAllow15 是否支持15位验证，默认为false
     * @return {Boolean} 是否验证通过
     */
    validate (idcard, isAllow15) {
      idcard = idcard || '';
      idcard = idcard.replace(/\s*/g, '');
      isAllow15 = isAllow15 || false;

      if (isAllow15 && idcard.length === 15) {
        // 仅仅验证出生日期
        return idcard15.birthValidate(idcard);
      }
      if (idcard.length === 18) {
        // 18位进行关键之校验以及出生日期校验
        return idcard18.validate(idcard);
      }

      return false;
    },

    /**
     * 获取身份证中的出生日期
     * 以 - 隔开，如果身份证非法，返回 空字符串
     * @param {String} idcard 身份证号
     * @param {Boolean} isAllow15 是否支持15位验证，默认为false
     * @return {String} 出生日期
     * @example 2017-07-03
     */
    birthExtract (idcard, isAllow15) {
      if (!this.validate(idcard, isAllow15)) {
        console.error('Illegal IdCard');

        return '';
      }
      idcard = idcard.replace(/\s*/g, '');

      if (isAllow15 && idcard.length === 15) {
        return idcard15.birthExtract(idcard);
      }
      if (idcard.length === 18) {
        return idcard18.birthExtract(idcard);
      }

      return '';
    },

    /**
     * 处理身份证号,隐藏中间四位
     * @param {String} idcard 身份证号
     * @param {Boolean} isAllow15 是否支持15位验证，默认为false
     * @return {String} 隐藏关键信息后的身份证
     */
    birthEncode (idcard, isAllow15) {
      if (!this.validate(idcard, isAllow15)) {
        console.error('Illegal IdCard');

        return idcard;
      }
      idcard = idcard.replace(/\s*/g, '');
      let result = '';

      // 先判断是15为身份证还是1
      if (isAllow15 && idcard.length === 15) {
        result += idcard.substring(0, 6);
        // 隐藏日期格式 8位 7-12位为 日期
        for (let i = 6; i < 12; i++) {
          result += '*';
        }
        result += idcard.substring(12);
      } else if (idcard.length === 18) {
        // 隐藏日期格式 6位 10-14位为 年-月-日
        result += idcard.substring(0, 6);
        // 隐藏日期格式 8位 10-12位为 日期
        for (let j = 6; j < 14; j++) {
          result += '*';
        }
        result += idcard.substring(14);
      }

      return result;
    }
  }
};
