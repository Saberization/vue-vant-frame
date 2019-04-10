export default {
  /**
   * 是否开启代理
   */
  ajax: {
    // 是否默认处理错误返回信息
    // 如果开启，框架会处理一些默认的返回错误,并提示（非200情况下），处理的错误码如下
    // 400，401，403，404，500，503
    isAutoDealError: true,
    // 是否开启自动弹窗提示，isAutoDealError为true时才生效
    isAutoToast: true,
    // 每次 ajax时，也可以增加isAutoProxy:false，来让本次请求不代理
    // 是否自动代理，如果开启，所有的请求会默认带上用户相关信息，h5是cookie中，app是headers中
    // 如果非新点标准后台，请关闭，否则会影响正常请求
    // 登陆地址譬如：http://218.4.136.114:8089/oarest9V7/fui/pages/themes/dream/dream
    isAutoProxy: true
  },
  /**
   * 是否开启 调试面板， 开启可以在移动端捕获log
   * 仅在debug模式下有效
   */
  isDebugPanel: 0,
  /**
   * 业务接口相关的配置
   */
  serverUrl: (() => {
    // 是否是正式
    const isFormal = true

    return isFormal ? '//115.29.151.25:8012/' : '//192.168.114.35:8016/webUploaderServer/'
  })()
}
