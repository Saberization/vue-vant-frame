import { Toast } from 'vant';

const toast = (msg) => {
  if (typeof msg !== 'string') {
    return;
  }

  ejs.extendModule('ui', [{
    namespace: 'toast',
    os: ['h5'],
    defaultParams: {
      message: ''
    },
    runCode() {
      
    }
  }]);
};

const alert = () => {

};

const confirm = () => {

};