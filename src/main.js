import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //使用載入時 讀取的效果 轉圈圈
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import currencyFilter from './filter/filter';
import time from './filter/transformdate'
import normaltime from './filter/filterstime';
import store from './store';
import App from './App.vue';
import router from './router';


import zhTWValidate from 'vee-validate/dist/locale/zh_TW'; //VeeValidate設定中文回饋設定用法
import VeeValidate, { Validator } from 'vee-validate';     //VeeValidate設定中文回饋設定用法
Validator.localize('zh_TW', zhTWValidate);                 //VeeValidate設定中文回饋設定用法

Vue.use(VeeValidate, { locale: 'zh_TW', });
Vue.use(Vuex);
axios.defaults.withCredentials = true; //跨站登入api使用此方法
Vue.config.productionTip = false
Vue.component('Loading', Loading);
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter); //在所有價錢前面加上錢字符
Vue.filter('time', time);               //因後端傳的是timestapm 把timestamp轉成一般時間格式
Vue.filter('normaltime', normaltime);   //把timestapm轉成時間格式 但是這是不同的轉換方式
import './bus';   //載入全域的bus 可以給每個元件做溝通使用


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check` // 檢查用戶是否仍持續登入
    axios.post(api).then((response) => {
      // console.log(response.data)
      if (response.data.success) { // 如果驗證成功，便前往頁面
        next()
      } else { // 否則便前往登入頁面
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})