import Vue from 'vue';
import '@assets/css/common.css';
import 'vant/lib/icon/local.css';
import Config from './config';
import Util from '@utils';

const loaderLibrary = Util.loaderLibrary;
const ejsVer = Config.ejsVer;
const env = Config.env;

Vue.config.devtools = true;
Vue.config.productionTip = false;

if (ejsVer === 3) {
  require('../../public/ejs/v3/ejs.js');
  require('../../public/ejs/v3/ejs.native.js');

  if (env === 'dd') {
    require('../../public/ejs/v3/ejs.dd.js');
  }
} else if (ejsVer === 2) {
  require('../../public/ejs/v2/epoint.moapi.v2.js');

  if (env === 'dd') {
    require('../../public/ejs/v2/epoint.moapi.v2.dd.js');
  }
}

require('./compatibility.js');

if (Config.isDebugPanel) {
  loaderLibrary({
    inject: 'head',
    src: './lib/vconsole.min.js',
    type: 'js'
  });
}

export {
  Vue,
  Config
};
