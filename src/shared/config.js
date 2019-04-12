export default {
  /**
   * 是否开启代理
   */
  ajax: {
    // 是否开启错误状态码自动弹窗提示
    isAutoErrToast: true,
    // 每次 ajax时，也可以增加isAutoProxy:false，来让本次请求不代理
    // 是否自动代理，如果开启，所有的请求会默认带上用户相关信息，h5是cookie中，app是headers中
    // 如果非新点标准后台，请关闭，否则会影响正常请求
    // 登陆地址譬如：http://218.4.136.114:8089/oarest9V7/fui/pages/themes/dream/dream
    isAutoProxy: false
  },
  /**
   * 是否开启 调试面板， 开启可以在移动端捕获log
   * 仅在debug模式下有效
   */
  isDebugPanel: 1,
  /**
   * 业务接口相关的配置
   */
  serverUrl: (() => {
    // 是否是正式
    const isFormal = true;

    return isFormal ? '//115.29.151.25:8012/' : '//192.168.114.35:8016/webUploaderServer/';
  })(),
  /**
   * 当ejs前框架使用的版本
   * 2 代表 2.x 版本的 ejs
   * 3 代表 3.x
   */
  ejsVer: 3,
  /**
   * 开发环境常量，分别为：h5（wechat）、ejs、dingtalk
   */
  env: (() => {
    const ENV_H5 = 'h5';
    const ENV_EJS = 'ejs';
    const ENV_DD = 'dd';

    return ENV_EJS;
  })()
};
