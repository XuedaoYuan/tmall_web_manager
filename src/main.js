import Vue from 'vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

import store from "./store/index"

Vue.config.productionTip = false

Vue.use(ElementUI);

import "./styles/common.scss";

import "@/plugin/axios"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
