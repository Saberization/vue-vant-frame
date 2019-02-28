'use strict';
module.exports = {
  // 是否强制打开浏览器
  open: true,
  // 设置服务器的主机号，默认是 localhost
  host: '0.0.0.0',
  // 端口号，被占用的话会自动选择别的端口
  port: '8080',
  // 是否实施刷新
  inline: true,
  // 是否启用webpack的热模块替换功能
  hot: true,
  // 是否启用 gzip 压缩
  compress: true,
  overlay: true,
  // 是否现实捆绑包中的错误
  stats: 'errors-only',

  // 代理，支持 http-proxy-middleware 所有配置
  proxy: null
};