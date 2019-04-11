import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import Config from '@shared/config';

Vue.config.devtools = true;
Vue.config.productionTip = false;

if (Config.isDebugPanel) {
  let script = document.createElement('script');
  script.src = './lib/vconsole.min.js';
  document.head.appendChild(script);
  script = null;
}

export {
  Vue,
  Config
};
