import Config from './config';

const ejsVer = Config.ejsVer;
const env = Config.env;

if (ejsVer === 3) {
  require('../../public/ejs/v3/ejs.js');

  switch (env) {
    case 'h5':
      require('./ejs.h5.js');
      break;

    case 'ejs':
      require('../../public/ejs/v3/ejs.native.js');
      break;

    case 'dd':
      require('../../public/ejs/dingtalk.js');
      require('../../public/ejs/v3/ejs.dd.js');
      break;

    case 'ejs_h5':
      require('../../public/ejs/v3/ejs.native.js');
      require('./ejs.h5.js');
      break;

    case 'dd_h5':
      require('../../public/ejs/v3/ejs.dd.js');
      require('./ejs.h5.js');
      break;

    default:
      require('../../public/ejs/v3/ejs.native.js');
      require('../../public/ejs/dingtalk.js');
      require('../../public/ejs/v3/ejs.dd.js');
      require('./ejs.h5.js');
      break;
  }
} else if (ejsVer === 2) {
  require('../../public/ejs/v2/epoint.moapi.v2.js');

  switch (env) {
    case 'h5':
    case 'ejs_h5':
      require('./epoint.moapi.v2.h5.js');
      break;

    case 'dd':
      require('../../public/ejs/dingtalk.js');
      require('../../public/ejs/v2/epoint.moapi.v2.dd.js');
      break;

    case 'dd_h5':
    case 'ejs_dd_h5':
      require('../../public/ejs/dingtalk.js');
      require('../../public/ejs/v2/epoint.moapi.v2.dd.js');
      require('./epoint.moapi.v2.h5.js');
      break;

    default:
      break;
  }
}
