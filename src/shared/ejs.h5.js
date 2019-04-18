import {
  Toast,
  Dialog
} from 'vant';

const uiToast = (options) => {
  if (typeof options !== 'object') {
    return;
  }
  Toast(options.message);
};

const uiAlert = (options) => {
  if (typeof options !== 'object') {
    return;
  }

  return Dialog.alert({
    title: options.title,
    message: options.message,
    confirmButtonText: options.buttonName
  });
};

const uiConfirm = (options) => {

};

function uiMixin(hybrid) {
  const innerUtil = hybrid.innerUtil;

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

      uiToast(options);
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

      uiAlert(options).then(() => {
        options.success && options.success();
        resolve && resolve({});
      });
    }
  }, {
    namespace: 'confirm',
    os: ['h5'],
    defaultParams: {
      
    }
  }]);
}

uiMixin(ejs);