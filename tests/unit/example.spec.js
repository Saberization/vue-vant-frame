import {
  expect
} from 'chai';
import Util from '@utils';
import string from '@utils/string'

describe('测试 dataProcess', () => {
  const response = {
    'custom': {
      'infolist': [{
        'title': '测试的title',
        'date': '2017-01-22',
        'guid': '131830'
      }]
    },
    'status': {
      'code': 200,
      'text': '成功',
      'url': ''
    }
  };

  expect(JSON.stringify(Util.dataProcess(response, {
    dataPath: 'custom.infolist'
  }))).to.be.equal(JSON.stringify(response.custom.infolist));
});

describe('测试 ajax', () => {
  let url;
  let data;

  before(() => {
    url = 'http://yapi.demo.qunar.com/mock/43176/mock/gallery';
    data = {
      token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
      params: {
        guid: '1'
      }
    };
  });

  it('sucess 返回数据正确', function (done) {
    Util.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: (data, response) => {
        expect(response.status).to.be.equal(200);
        expect(data).to.be.an('object');
        done();
      }
    });
  });
});

describe('字符串正则校验', () => {
  it('isNum（是否是纯数字）', () => {
    expect(string.isNum('1234')).to.be.equal(true);
    expect(string.isNum('12s4')).to.be.equal(false);
  });

  it('isPhoneNum（是否是手机号码）', () => {
    expect(string.isPhoneNum('18267890876')).to.be.equal(true);
    expect(string.isPhoneNum('8618267890876')).to.be.equal(true);
    expect(string.isPhoneNum('11267890876')).to.be.equal(false);
    expect(string.isPhoneNum('05062322683')).to.be.equal(false);
  });

  it('isTelNum（是否是座机号码）', () => {
    expect(string.isTelNum('18267890876')).to.be.equal(true);
    expect(string.isTelNum('8618267890876')).to.be.equal(true);
    expect(string.isTelNum('11267890876')).to.be.equal(false);
    expect(string.isTelNum('05062322683')).to.be.equal(true);
    expect(string.isTelNum('050-62322-683')).to.be.equal(true);
  });

  it('isEmail（是否是合法的email）', () => {
    expect(string.isEmail('abcd_s.ddf.ff-sss@vip.qq.com')).to.be.equal(true);
    expect(string.isEmail('abc@qq.com')).to.be.equal(true);
    expect(string.isEmail('abc@.com')).to.be.equal(false);
    expect(string.isEmail('-abc@qq.com')).to.be.equal(false);
    expect(string.isEmail('abc.@qq.com')).to.be.equal(false);
    expect(string.isEmail('ab-.c@qq.com')).to.be.equal(false);
    expect(string.isEmail('abc@qq.com1')).to.be.equal(true);
    expect(string.isEmail('abc@qq.com11')).to.be.equal(false);
    expect(string.isEmail('abc@qq11111.com')).to.be.equal(true);
  });

  it('isExternalUrl（是否是外部url）', () => {
    expect(string.isExternalUrl('http://app.epoint.com.cn/ejs/')).to.be.equal(true);
    expect(string.isExternalUrl('https://app.epoint.com.cn/ejs/')).to.be.equal(true);
    expect(string.isExternalUrl('ftp://app.epoint.com.cn/')).to.be.equal(true);
    expect(string.isExternalUrl('//app.epoint.com.cn/')).to.be.equal(true);

    expect(string.isExternalUrl('page/html/api.html')).to.be.equal(false);
    expect(string.isExternalUrl('./page/html/api.html')).to.be.equal(false);
    expect(string.isExternalUrl('../page/html/api.html')).to.be.equal(false);
  });

  it('excludeSpecial（过滤特殊字符）', () => {
    var test = "sdfffjh@s#sk%jn";
    var result = 'sdfffjhssk%jn';

    expect(string.excludeSpecial(test, /[@#]/g)).to.be.equal(result);
  });
});

describe('身份证相关校验', () => {
  it('validate（身份证是否合法）', () => {
    expect(string.idcard.validate('440901197502108337')).to.be.equal(true);
    // 篡改了一位
    expect(string.idcard.validate('440901196502108337')).to.be.equal(false);

    expect(string.idcard.validate('320311770706001')).to.be.equal(false);
    // 允许15位
    expect(string.idcard.validate('320311770706001', true)).to.be.equal(true);
  });

  it('birthExtract（出生日期提取）', () => {
    expect(string.idcard.birthExtract('440901197502108337')).to.be.equal('1975-02-10');
    expect(string.idcard.birthExtract('320311770706001')).to.be.equal('');
    // 允许15位
    expect(string.idcard.birthExtract('320311770706001', true)).to.be.equal('1977-07-06');
  });

  it('birthEncode（出生日期隐藏）', () => {
    expect(string.idcard.birthEncode('440901197502108337')).to.be.equal('440901********8337');
    expect(string.idcard.birthEncode('320311770706001')).to.be.equal('320311770706001');
    // 允许15位
    expect(string.idcard.birthEncode('320311770706001', true)).to.be.equal('320311******001');
  });
});
