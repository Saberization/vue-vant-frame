import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import './ejs/ejsloader';
import Config from './config';
import Util from '@utils';

Vue.config.devtools = true;
Vue.config.productionTip = false;

if (Config.isDebugPanel) {
  Util.loaderLibrary({
    inject: 'head',
    src: './lib/vconsole.min.js',
    type: 'js'
  });
}

if (Config.isTestPerformance) {
  Util.loaderLibrary({
    inject: 'body',
    src: './lib/performance.js',
    type: 'js'
  });
}

export {
  Vue,
  Config
};
