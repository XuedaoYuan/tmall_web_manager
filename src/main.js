import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "./styles/common.scss";

import "@/plugin/axios"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
