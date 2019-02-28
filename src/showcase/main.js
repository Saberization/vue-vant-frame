import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from '../router/router';
import Navigation from './navigation';

console.log(Router);

new Vue({
  render(h) {
    h(Navigation);
  }
}).$mount('#app');