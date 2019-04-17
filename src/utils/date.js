/**
 * 将字符串多余的长度补齐0
 * @param {String} s 需补齐的字符串
 * @param {Number} len 补齐长度
 * @return {String} 补齐后的字符串
 */
const paddingFillWith0 = (s, len) => {
  len -= (`${s}`).length;

  for (let i = 0; i < len; i++) {
    s = `0${s}`;
  }

  return s;
};

/**
 * 日期匹配的正则表达式
 * Y:年
 * M:月
 * D:日
 * h:小时
 * m:分钟
 * s:秒
 * i:毫秒
 * w:星期(小写的)
 * W:星期(大写的)
 */
const SIGN_DATE_REG = /([YyMDdHhmsiWw])(\1*)/g;

/**
 * 默认的pattern
 * 'YYYY-MM-DD hh:mm:ss:iii'
 */
const DEFAULT_PATTERN = 'YYYY-MM-DD hh:mm:ss:iii';

class MyDate extends Date {
  /**
   * 定义静态方法，解析成拓展的日期对象
   * @param {String} dateString 日期字符串
   * @param {String} pattern 匹配字符串,可以手动传入,或者采取默认
   * @return {MyDate} 返回一个MyDate对象
   */
  parseDate (dateString, pattern) {
    try {
      dateString = dateString || '';
      // 判断需要的匹配模式
      pattern = pattern || DEFAULT_PATTERN;

      // 格式的正则匹配式，譬如YYYY-MM-DD hh:mm:ss:iii
      const matchs1 = pattern.match(SIGN_DATE_REG);
      // 值的正则匹配式，将实际的时间数据提取出来，和前面一一对应
      // 譬如 2018-01-01 01:01:01:000
      // 当然，前提是数字间有分隔符，否则无法
      const matchs2 = dateString.match(/(\d)+/g);

      if (matchs1.length > 0) {
        // 必须第一个匹配式匹配到（否则就是格式错误了）
        // 先生成一个最原始的时间-1970-01-01年的
        const myDate = new MyDate(1970, 0, 1);

        // 遍历,分别设置年月日,分秒等等
        for (let i = 0, len = matchs1.length; i < len; i++) {
          // 这个分别是  年,月,日  时,分,秒等等
          // 增加默认值0,防止当没有数据时出错
          const mTarget = parseInt(matchs2[i], 10) || 0;

          // 判断YMDhmsiw等等关键字
          // 这个matchs1[i]有可能是YYYY，MM之类，所以只需取第一个字符
          switch (matchs1[i].charAt(0) || '') {
            case 'Y':
              myDate.setFullYear(mTarget);
              break;
            case 'M':
              myDate.setMonth(mTarget - 1);
              break;
            case 'D':
              myDate.setDate(mTarget);
              break;
            case 'h':
              myDate.setHours(mTarget);
              break;
            case 'm':
              myDate.setMinutes(mTarget);
              break;
            case 's':
              myDate.setSeconds(mTarget);
              break;
            case 'i':
              myDate.setMilliseconds(mTarget);
              break;
            default:
              // 默认不操作
              break;
          }
        }

        return myDate;
      }
    } catch (e) {
    }

    throw new Error('解析成MyDate失败，请检查传入格式！');
  }

  /**
   * 写自己的原型方法，这里实现一个按任何格式的输出方法
   * @param {String} fmt 自己需要输出的格式，经典的yyyyMMddhhmmssiiww系列
   * @return {String} 返回一个字符串
   */
  format (fmt) {
    const pattern = fmt || DEFAULT_PATTERN;
    const value = this;

    return pattern.replace(SIGN_DATE_REG, ($0) => {
      // 如果传入一个yyyy-MM-dd 的表达式
      // 实际上这个函数会分别回调多次 没符合一次匹配就回调一次
      // $0:yyyy  $0:MM $0:dd  依次类推
      switch ($0.charAt(0)) {
        case 'Y':
        case 'y':
          return paddingFillWith0(value.getFullYear(), $0.length);
        case 'M':
          return paddingFillWith0(value.getMonth() + 1, $0.length);
        case 'D':
        case 'd':
          return paddingFillWith0(value.getDate(), $0.length);
        case 'H':
        case 'h':
          return paddingFillWith0(value.getHours(), $0.length);
        case 'm':
          return paddingFillWith0(value.getMinutes(), $0.length);
        case 's':
          return paddingFillWith0(value.getSeconds(), $0.length);
        case 'i':
          return paddingFillWith0(value.getMilliseconds(), $0.length);
        case 'w':
          return value.getDay();
        case 'W':
          // 自动将星期转为了大写
          var week = ['日', '一', '二', '三', '四', '五', '六'];

          return paddingFillWith0(week[value.getDay()], $0.length);
        default:
          return '';
      }
    });
  }

  /**
   * 获取绝对毫秒数，这里补上了getTime造成的时区差
   * @param {Boolean} isTimezoneOffsetFixed 是否补齐时区误差
   * @return {Number} 返回绝对时间戳
   */
  getAbsoluteMillonsTime (isTimezoneOffsetFixed) {
    // 要补上与GMT时区的误差，时区差以分钟为单位，所以要换成毫秒
    const offset = isTimezoneOffsetFixed ? this.getTimezoneOffset() * 60 * 1000 : 0;

    return this.getTime() + offset;
  }

  /**
   * 返回字符串时间戳
   * @param {Boolean} isTimezoneOffsetFixed 是否补齐时区误差
   * @return {String} 返回绝对时间戳，19700101到现在的
   */
  toTimeStap (isTimezoneOffsetFixed) {
    return `${this.getAbsoluteMillonsTime(isTimezoneOffsetFixed)}`;
  }

  /**
   * 返回往后n秒的时间
   * @param {Number} num 往后几秒小时，默认为0
   * @return {MyDate} 返回一个计算后的MyDate对象
   */
  nextSeconds (num) {
    num = num || 1;

    // 通过毫秒计算，加上一个小时的毫秒数
    // 构建时传入的时间是，和GMT时间1970年1月1日之间相差的毫秒数
    return new MyDate(this.getTime() + num * 1000);
  }

  nextMinutes (num) {
    num = num || 1;

    return this.nextSeconds(60 * num);
  }

  nextHours (num) {
    num = num || 1;

    return this.nextMinutes(60 * num);
  }

  nextDays (num) {
    num = num || 1;

    return this.nextHours(24 * num);
  }

  /**
   * 返回往后n月的时间，这里会自动计算每月的天数，1月后面就是2月，紧接着3月
   * @param {Number} num 往后几秒小时，默认为0
   * @return {MyDate} 返回一个计算后的MyDate对象
   */
  nextMonths (num) {
    num = num || 0;

    // 月份，0-11，所以补上1，凑成12进制
    const originMonth = this.getMonth() + 1;
    const originYear = this.getFullYear();
    // 二月份要单独计算并赋值
    const daysPerMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days = 0;

    for (let i = 0; i < num; i++) {
      let currMonth = originMonth + i;
      const currYear = originYear + ~~(currMonth / 12);
      const isLeapYear = (currYear % 4 === 0) && (currYear % 100 !== 0 || currYear % 400 !== 0);

      if (isLeapYear) {
        daysPerMonth[1] = 29;
      } else {
        daysPerMonth[1] = 28;
      }
      // 最多保留 1-12，13需要换算成1，然后重新开始
      currMonth %= 12;
      if (currMonth === 0) {
        // 12, 24, 36这种，需要换成11，这点特殊处理（因为按上面计算会变为0）
        currMonth = 11;
      } else {
        currMonth -= 1;
      }
      days += daysPerMonth[currMonth];
    }

    return this.nextDays(days);
  }

  nextYears (num) {
    num = num || 0;

    return this.nextMonths(12 * num);
  }

  /**
   * 和另一个时间比较，必须也是MyDate类型
   * @param {MyDate} another 另一个日期对象，也可以是一个普通的日期对象
   * @param {String} pattern 模式字符串，需要比较到何等程度
   * @return {Number} 返回一个便宜数字，大于0代表当前时间大于比较时间，小于0就是小于，否则等于
   */
  compare (another, pattern) {
    if (!(another instanceof MyDate)) {
      throw new Error('比较类型错误，必须是MyDate型');
    }
    // 默认精确到秒
    pattern = pattern || 's';

    let formatPattern = '';

    switch (pattern.charAt(0)) {
      case 'Y':
      case 'y':
        formatPattern = 'YYYY';
        break;
      case 'M':
        formatPattern = 'YYYYMM';
        break;
      case 'D':
      case 'd':
        formatPattern = 'YYYYMMDD';
        break;
      case 'H':
      case 'h':
        formatPattern = 'YYYYMMDDhh';
        break;
      case 'm':
        formatPattern = 'YYYYMMDDhhmm';
        break;
      case 'S':
      case 's':
        formatPattern = 'YYYYMMDDhhmmss';
        break;
      case 'I':
      case 'i':
        formatPattern = 'YYYYMMDDhhmmssiii';
        break;
      default:
        break;
    }

    const now = +this.format(formatPattern);
    const anotherTime = +another.format(formatPattern);

    return now - anotherTime;
  }
}

export default MyDate;
