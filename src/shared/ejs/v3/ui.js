import { Toast, Dialog } from 'vant';

export default {
  toast (options) {
    if (typeof options !== 'object') {
      return;
    }
    Toast(options.message);
  },
  alert (options) {
    if (typeof options !== 'object') {
      return;
    }
  
    return Dialog.alert({
      title: options.title,
      message: options.message,
      confirmButtonText: options.buttonName
    });
  },
  confirm (options) {
    if (typeof options !== 'object') {
      return;
    }
  
    const buttonLabels = options.buttonLabels;
  
    return Dialog.confirm({
      title: options.title,
      message: options.message,
      cancelButtonText: buttonLabels[0],
      confirmButtonText: buttonLabels[1]
    });
  }
};