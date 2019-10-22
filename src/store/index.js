import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import porductModules from './product'
Vue.use(Vuex);       //此為建立完成的Vuex用法 最後 在main js載入整個資料夾 然後 放在 new vue的應用程式下

export default new Vuex.Store({
    strict: true, //嚴警模式啟動 如vuex語法有問題會有提示
    state: {
        isLoading: false,
    },
    actions: {
        //context式固定的 , status原本式payload
        updateLoadgin(context, status) {       // 不要再actions操作state的資料狀態 或更改
            context.commit('LOADING', status); // 啟用mutations裡面的資料狀態 使用context.commit('方法名稱',帶入的參數)
            // 非同步行為在actions裡面執行 例如ajax settimeout
        },

    },
    mutations: {  //使用mutations 改變state裡面的狀態
        //此state等於上面的state 傳進來的值
        LOADING(state, status) {
            state.isLoading = status;     // 不要再mutations執行非同步行為
        },
    },

    modules: {
        porductModules
    }
})