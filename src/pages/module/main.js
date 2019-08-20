import { Vue } from '@boot';
import Module from './module';

const vm = new Vue({
  render: h => h(Module)
}).$mount('#app');

Vue.use({
  vm
});
