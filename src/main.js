// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import VueAxios from 'vue-axios';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store.js';
import './common/css/iconfont.css';
import '../static/css/reset.css';

Vue.config.productionTip = false;
// 使用 axios 进行 ajax 请求
Vue.use(VueAxios, Axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
