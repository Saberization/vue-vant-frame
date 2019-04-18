import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import Config from './config';
import './ejsloader';
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

export {
  Vue,
  Config
};
