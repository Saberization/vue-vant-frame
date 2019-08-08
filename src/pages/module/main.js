import { Vue } from '@boot';
import Module from './module';

new Vue({
  render: (h) => {
    return h(Module);
  }
}).mount('#app');
