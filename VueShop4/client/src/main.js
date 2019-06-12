// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import "./mock/mockServer"  /*无需引入名 因为没有暴露 直接加载路径*/
import loading from "../src/common/imgs/loading.gif"
import "./filter/index"
Vue.use(VueLazyload, {
  loading
})
Vue.config.productionTip = false
Vue.component(Button.name,Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
