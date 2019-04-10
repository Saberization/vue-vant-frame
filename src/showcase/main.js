import { Vue } from '@shared/boot'
import VueRouter from 'vue-router'
import routes from '@router/router'
import Showcase from './showcase'
import { Lazyload } from 'vant'

Vue.use(VueRouter).use(Lazyload, {
  lazyComponent: true
})

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(Showcase)
}).$mount('#app')
