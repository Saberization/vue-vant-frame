import ui from './ui';

function uiMixin() {
  const hybrid = ejs;
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

}

uiMixin();
storageMixin();