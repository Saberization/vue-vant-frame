import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@router/router'
import Showcase from './showcase'
import '@assets/css/common.css'
import 'vant/lib/icon/local.css'
import '@assets/ejs/v3/ejs.js'
import '@assets/ejs/v3/ejs.native.js'
import { Lazyload } from 'vant'

Vue.use(VueRouter).use(Lazyload, {
  lazyComponent: true
})

Vue.config.devtools = true
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(Showcase)
}).$mount('#app')
