import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@router/router'
import Showcase from './showcase'
import '@assets/css/common.css'
import 'vant/lib/icon/local.css'

Vue.use(VueRouter)

Vue.config.devtools = true
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(Showcase)
}).$mount('#app')
