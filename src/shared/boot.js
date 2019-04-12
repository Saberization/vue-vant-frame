import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import Config from '@shared/config';

Vue.config.devtools = true;
Vue.config.productionTip = false;

const env = Config.env;

/**
 * 插入 Library 库
 * @param {Array} gather 集合
 * inject 插入位置
 * src 路径
 * type 类型
 */
const insertLibrary = (...args) => {
  const promiseAssembly = [];

  args.forEach((e) => {
    const inject = e.inject;
    const src = e.src;
    const type = e.type;
    let el = null;

    let promise = new Promise((resolve) => {
      if (type === 'css') {
        el = document.createElement('link');
        el.link = src;
        el.ref = 'stylesheet';
      } else {
        el = document.createElement('script');
        el.src = src;
      }

      if (inject === 'head') {
        document.head.appendChild(el);
      } else {
        document.body.appendChild(el);
      }

      el.onload = function() {
        resolve();
      };
    });

    promiseAssembly.push(promise);
  });

  return Promise.all(promiseAssembly);
};

if (Config.isDebugPanel) {
  insertLibrary({
    inject: 'head',
    src: './lib/vconsole.min.js',
    type: 'js'
  });
}

if (Config.ejsVer === 3) {
  insertLibrary({
    inject: 'head',
    src: './ejs/v3/ejs.js',
    type: 'js'
  }).then(() => {
    if (env === 'ejs') {
      insertLibrary({
        inject: 'head',
        src: './ejs/v3/ejs.native.js',
        type: 'js'
      });
    } else if (env === 'dd') {
      insertLibrary({
        inject: 'head',
        src: './ejs/dingtalk.js',
        type: 'js'
      }).then(() => {
        insertLibrary({
          inject: 'head',
          src: './ejs/v3/ejs.dd.js',
          type: 'js'
        });
      });
    }
  });
} else {
  insertLibrary({
    inject: 'head',
    src: './ejs/v2/epoint.moapi.v2.js',
    type: 'js'
  });

  if (env === 'dd') {
    insertLibrary({
      inject: 'head',
      src: './ejs/v2/epoint.moapi.v2.dd.js',
      type: 'js'
    });
  }
}

export {
  Vue,
  Config
};
