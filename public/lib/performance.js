(function () {
  'use strict';

  const performance = window.performance;
  const Console = console;

  if (!performance || typeof performance !== 'object') {
    Console.error('你的浏览器不支持 performance API');
    return;
  }

  const getTiming = () => {
    const timing = performance.timing;

    if (timing.loadEventEnd - timing.loadEventStart < 0) {
      setTimeout(() => {
        getTiming();
      }, 200);

      return;
    }

    Console.log('统计模块性能时间：');
    Console.log(`准备新页面时间耗时: ${timing.fetchStart - timing.navigationStart}ms`);
    Console.log(`Appcache 耗时: ${timing.domainLookupStart - timing.fetchStart}ms`);
    Console.log(`DNS 查询耗时: ${timing.domainLookupEnd - timing.domainLookupStart}ms`);
    Console.log(`TCP连接耗时: ${timing.connectEnd - timing.connectStart}ms`);
    Console.log(`request请求耗时: ${timing.responseEnd - timing.requestStart}ms`);
    Console.log(`请求完毕至DOM加载: ${timing.domInteractive - timing.responseEnd}ms`);
    Console.log(`解释dom树耗时: ${timing.domComplete - timing.domInteractive}ms`);
    Console.log(`load事件耗时: ${timing.loadEventEnd - timing.loadEventStart}ms`);
    Console.log(`从开始至load完成: ${timing.loadEventEnd - timing.navigationStart}ms`);
    Console.log(`页面加载耗时: ${timing.loadEventStart - timing.navigationStart}ms`);
  };

  window.addEventListener('load', getTiming);
}());