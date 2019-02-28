import Util from '@util/'

const serverUrl = 'http://yapi.demo.qunar.com/mock/43176/mock/';

const getRefreshList = function(params) {
  return Util.request({
    url: serverUrl + 'getlist',
    type: 'post',
    data: {
      token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
      params: params
    },
    dataType: 'json',
    isAutoProxy: false
  })
}

export {
  getRefreshList
}