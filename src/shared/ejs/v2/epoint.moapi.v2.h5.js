import { Toast, Dialog } from 'vant';

function nativeUIMixin() {
  ejs.extendFucObj('nativeUI', {
    toast (options) {
      if (!ejs.os.h5) {
        return;
      }

      let msg = '';

      if (typeof options === 'string') {
        msg = options;
      } else {
        msg = options.message;
      }

      Toast(msg);
    },
    alert (...rest) {
      if (!ejs.os.h5) {
        return;
      }

      const args = rest;
      const values = {
        title: '',
        message: ''
      };

      if (args.length > 1) {
        values.title = args[1];
        values.message = args[0];
      } else {
        let { message, title } = args[0];

        values.title = title;
        values.message = message;
      }

      Dialog.alert(values);
    },
    confirm (...rest) {
      const args = rest;
      const params = args[0];
      let confirmParams = {
        title: '',
        message: '',
        btn1: '确认',
        btn2: '取消',
        cancelable: 0
      };
      let callback;

      if (typeof params === 'object') {
        confirmParams = Object.assign(confirmParams, params);
        callback = args[1];
      } else if (args.length === 3) {
        confirmParams.message = args[0];
        confirmParams.title = args[1];
        callback = args[2];
      } else {
        confirmParams.message = args[0];
        callback = args[1];
      }

      Dialog.confirm({
        title: confirmParams.title,
        message: confirmParams.message,
        cancelButtonText: confirmParams.btn1,
        confirmButtonText: confirmParams.btn2,
        cancelable: confirmParams.cancelable
      }).then(() => {
        callback && callback(-2, confirmParams.btn2, {
          code: 1,
          result: {
            which: -2
          }
        });
      }).catch(() => {
        callback && callback(-1, confirmParams.btn1, {
          code: 1,
          result: {
            which: -1
          }
        });
      });
    }
  });
}

function tokenMixin() {
  ejs.extendFucObj('token', {
    getToken (callback, defaultValue) {
      if (ejs.os.ejs) {
        return;
      }


    }
  });
}

nativeUIMixin();
tokenMixin();