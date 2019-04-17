/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: 对浮点数、或者整数的加减乘除
 */

/**
 * mathTools 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply / divide
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * mathTools.add(0.1, 0.2) >> 0.3
 * mathTools.multiply(19.9, 100) >> 1990
 *
 */
const innerUtil = {
  /**
   * 判断一个数是否为一个整数
   * @param {Number} num 要验证的数字
   * @return {boolean} true or false
   */
  isInteger (num) {
    return Math.floor(num) === num;
  },
  /**
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param {Number} floatNum 小数
   * @return {Object} 返回数据结果
   */
  toInteger (floatNum) {
    const self = this;
    const result = {
      times: 1,
      num: 0
    };

    if (self.isInteger(floatNum)) {
      result.num = floatNum;

      return result;
    }

    const str = `${floatNum}`;
    const dotIndex = str.indexOf('.');
    const len = str.substring(dotIndex + 1).length;
    const times = Math.pow(10, len);
    const intNum = parseInt(floatNum * times + 0.5, 10);

    result.times = times;
    result.num = intNum;

    return result;
  },
  /**
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param {Number} num1 运算数1
   * @param {Number} num2 运算数2
   * @param {String} op 运算类型，有加减乘除（add/subtract/multiply/divide）
   * @returns {Number} 运算结果
   */
  operation (num1, num2, op) {
    const self = this;
    const o1 = self.toInteger(num1);
    const o2 = self.toInteger(num2);
    const n1 = o1.num;
    const n2 = o2.num;
    const t1 = o1.times;
    const t2 = o2.times;
    const max = t1 > t2 ? t1 : t2;

    let result = null;

    switch (op) {
      case 'add':

        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2;
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2);
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2;
        }

        return result / max;

      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2;
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }

        return result / max;

      case 'multiply':
        result = (n1 * n2) / (t1 * t2);

        return result;

      case 'divide':
        const r1 = n1 / n2;
        const r2 = t2 / t1;

        return self.operation(r1, r2, 'multiply');

      default:
    }
  }
};

export default {
  /**
   * add two numbers
   * @param {Number} num1 The first number
   * @param {Number} num2 The second number
   * @return {Number} The sum of the two numbers.
   */
  add (num1, num2) {
    return innerUtil.operation(num1, num2, 'add');
  },
  /**
   * subtract two numbers
   * @param {Number} num1 The first number
   * @param {Number} num2 The second number
   * @return {Number} The subtract of the two numbers.
   */
  subtract (num1, num2) {
    return innerUtil.operation(num1, num2, 'subtract');
  },
  /**
   * multiply two numbers
   * @param {Number} num1 The first number
   * @param {Number} num2 The second number
   * @return {Number} The multiply of the two numbers.
   */
  multiply (num1, num2) {
    return innerUtil.operation(num1, num2, 'multiply');
  },
  /**
   * divide two numbers
   * @param {Number} num1 The first number
   * @param {Number} num2 The second number
   * @return {Number} The divide of the two numbers.
   */
  divide (num1, num2) {
    return innerUtil.operation(num1, num2, 'divide');
  }
};
