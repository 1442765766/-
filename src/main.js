//The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router"//引入路由
import store from './store'//引入vuex
import {Button} from 'mint-ui'

import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'
Vue.use(VueLazyload, {
  loading
  })
import './mock/mockServer'//直接加载mockServer即可

Vue.component(Button.name, Button)  // <mt-button>
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,        //使用路由
  store
})
