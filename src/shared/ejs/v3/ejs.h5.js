import ui from './ui';
import storage from './storage.js';

const hybrid = ejs;
const innerUtil = hybrid.innerUtil;

function uiMixin() {
  hybrid.extendModule('ui', [{
    namespace: 'toast',
    os: ['h5'],
    defaultParams: {
      message: ''
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');
      const options = args[0];
      const resolve = args[1];

      ui.toast(options);
      options.success && options.success();
      resolve && resolve();
    }
  }, {
    namespace: 'alert',
    os: ['h5'],
    defaultParams: {
      title: '',
      message: '',
      buttonName: '确定',
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title', 'message', 'buttonName');
      const options = args[0];
      const resolve = args[1];

      ui.alert(options).then(() => {
        options.success && options.success();
        resolve && resolve({});
      });
    }
  }, {
    namespace: 'confirm',
    os: ['h5'],
    defaultParams: {
      title: '',
      message: '',
      buttonLabels: ['取消', '确定']
    },
    runCode(...rest) {
      const args = rest;
      const options = args[0];
      const resolve = args[1];

      ui.confirm(options).then(() => {
        options.success && options.success(1);
        resolve && resolve(1);
      }).catch(() => {
        options.success && options.success(0);
        resolve && resolve(0);
      });
    }
  }]);
}

function storageMixin() {
  hybrid.extendModule('storage', [{
    namespace: 'getItem',
    os: ['h5'],
    runCode(params, resolve, reject) {
      const options = params;
      const success = options.success;
      const error = options.error;

      if (typeof options.key === 'string') {
        options.key = [options.key];
      }

      storage.getItem(options, {
        success,
        error,
        resolve,
        reject
      });
    }
  }, {
    namespace: 'setItem',
    os: ['h5'],
    runCode(params, resolve, reject) {
      const options = params;
      const success = options.success;
      const error = options.error;

      storage.setItem(options, { resolve, reject, success, error });
    }
  }, {
    namespace: 'removeItem',
    os: ['h5'],
    runCode(params, resolve, reject) {
      const options = params;
      const success = options.success;
      const error = options.error;

      if (typeof options.key === 'string') {
        options.key = [options.key];
      }

      storage.removeItem(options, { resolve, reject, success, error });
    }
  }]);
}

function pageMixin() {
  hybrid.extendModule('page', [{
    namespace: 'open',
    os: ['h5'],
    defaultParams: {
      pageUrl: '',
      data: {}
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
      const options = args[0];

      options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
      window.location.href = options.pageUrl;
    }
  }, {
    namespace: 'close',
    os: ['h5'],
    runCode() {
      if (window.history.length > 1) {
        window.history.back();
      }
    }
  }, {
    namespace: 'reload',
    os: ['h5'],
    runCode() {
      window.location.reload();
    }
  }]);
}

function deviceMixin() {
  hybrid.extendModule('device', [{
    namespace: 'callPhone',
    os: ['h5'],
    defaultParams: {
      phoneNum: ''
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');
      const phoneNum = args[0].phoneNum;

      window.location.href = `tel:${phoneNum}`;
    }
  }, {
    namespace: 'sendMsg',
    os: ['h5'],
    defaultParams: {
      phoneNum: '',
      message: ''
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');
      const options = args[0];

      window.location.href = `sms:${options.phoneNum}?body=${options.message}`;
    }
  }, {
    namespace: 'sendMail',
    os: ['h5'],
    defaultParams: {
      mail: '',
      subject: '',
      cc: ''
    },
    runCode(...rest) {
      const args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'mail', 'subject', 'cc');
      const options = args[0];

      window.location.href = `mailto:${options.mail}?subject=${options.subject}&cc=${options.cc}`;
    }
  }]);
}

uiMixin();
storageMixin();
pageMixin();
deviceMixin();