/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: 移值 M7 框架中的 util.sha1
 */

const hexcase = 0;
const chrsz = 8;

const safeAdd = (x, y) => {
  const lsw = (x & 0xFFFF) + (y & 0xFFFF);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);

  return (msw << 16) | (lsw & 0xFFFF);
};

const rol = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));

const sha1Ft = (t, b, c, d) => {
  if (t < 20) {
    return (b & c) | ((~b) & d);
  }
  if (t < 40) {
    return b ^ c ^ d;
  }
  if (t < 60) {
    return (b & c) | (b & d) | (c & d);
  }

  return b ^ c ^ d;
};

const str2binb = (str) => {
  const bin = [];
  const mask = (1 << chrsz) - 1;

  for (let i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
  }

  return bin;
};

const sha1Kt = t => ((t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514);

const Utf8Encode = (string) => {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';

  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
};

const binb2hex = (binarray) => {
  const hexTab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
  let str = '';

  for (let i = 0; i < binarray.length * 4; i++) {
    str += hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
  }

  return str;
};

const coreSha1 = (x, len) => {
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  const w = Array(80);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  let e = -1009589776;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    const olde = e;

    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = x[i + j];
      } else {
        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      const t = safeAdd(safeAdd(rol(a, 5), sha1Ft(j, b, c, d)), safeAdd(safeAdd(e, w[j]), sha1Kt(j)));

      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
    e = safeAdd(e, olde);
  }

  return [a, b, c, d, e];
};

export default {
  /**
   * sha1_hex散列，16进制字符串形式
   * @param {String} s 内容
   * @return {String} 返回密文,hex字符串
   */
  hex (s) {
    s = Utf8Encode(s);

    return binb2hex(coreSha1(str2binb(s), s.length * chrsz));
  }
};
