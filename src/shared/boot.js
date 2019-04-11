import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import Config from '@shared/config';

Vue.config.devtools = true;
Vue.config.productionTip = false;

/**
 * 插入 Library 库
 * @param {Object} options
 * inject 插入位置
 * src 路径
 * type 类型
 */
const insertLibrary = (...args) => {
  args.forEach((e) => {
    const inject = e.inject;
    const src = e.src;
    const type = e.type;
    let el = null;

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
  })
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
  }, {
    inject: 'head',
    src: './ejs/v3/ejs.native.js',
    type: 'js'
  });
} else {
  insertLibrary({
    inject: 'head',
    src: './ejs/v2/epoint.moapi.v2.js',
    type: 'js'
  });
}

export {
  Vue,
  Config
};
