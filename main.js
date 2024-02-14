import App from './App';
import * as Pinia from 'pinia';
import './permission.js'
import modal from '@/plugins/modal' // 弹窗
import tab from '@/plugins/tab'
import auth from '@/plugins/auth'
import config from '@/config' // 配置

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$modal = modal;
  app.config.globalProperties.$tab = tab;
  app.config.globalProperties.$auth = auth;
  app.config.globalProperties.config = config;
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia,
  }
}
// #endif