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
    isAutoProxy: true
  },
  /**
   * v6中针对ejs.oauth.getToken接口的定制
   * 可以修改getToken返回的值，方便v6中调试
   * v7中开发人员无需关注token（通过ajax自动代理进行设置）
   */
  token: {
    // token的过期时间，防止页面的token过期，单位为秒
    // H5下动态获取时才会有缓存
    duration: 7200,
    // 可以是字符串，也可以是方法
    // 字符串的话直接可以使用，函数的话 通过success回调返回
    // 只是H5下有效，ejs下默认就是容器的token，不容改变
    getToken: (success) => {
      success('RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=');
    }
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

    return isFormal ? 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/' : '//192.168.114.35:8016/webUploaderServer/';
  })(),
  /**
   * 当ejs前框架使用的版本
   * 2 代表 2.x 版本的 ejs
   * 3 代表 3.x
   */
  ejsVer: 3,
  /**
   * 开发环境常量，ejs、dingtalk
   */
  env: (() => {
    const ENV_H5 = 'h5';
    const ENV_EJS = 'ejs';
    const ENV_DD = 'dd';
    const ENV_EJS_H5 = 'ejs_h5';
    const ENV_DD_H5 = 'dd_h5';
    const ENV_ALL = 'ejs_dd_h5';

    return ENV_EJS_H5;
  })()
};
