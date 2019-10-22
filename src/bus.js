import Vue from 'vue'; //載入vue元件

Vue.prototype.$bus = new Vue(); //在此就直接將 Vue 的實體建立在 $bus 原型內所以在此也就是直接將 data 存放在 $bus 這個實體 跟 內層要把資料傳去外層一樣 使用方法去觸發一個方法

//Message
// vm.$bus.$emit('message:push',message ,status)
// message(String):訊息內容
//status(String):Alert的樣式
