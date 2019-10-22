
//此為Vuex的模組product 所以不用使用Vuex.Store 在主模組載入此模組即可


import axios from 'axios'
export default {
    strict: true, //嚴警模式啟動 如vuex語法有問題會有提示

    namespaced: true, //當下此語法時 actions mutations getters會變成模組的區域變數，如要取得模組區域變數用法 在元件的...mapActions 及 ...mapgetters 前面加個模組名稱


    // state屬於模組區域變數 
    // actions mutations getters 屬於全域變數
    state: {
        products: [],
    },
    actions: {
        getProducts(context) {
            //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
            const api = `${process.env.VUE_APP_APIPATH}/api/${
                process.env.VUE_APP_COUSTOMPATH
                }/products/all`;
            context.commit('LOADING', true, { root: true });   //如果使用模組區域變數 要加上root true讓模組知道讀取isloading 是global資料
            console.log(api);
            axios.get(api).then(response => {
                console.log(response.data);
                context.commit('PRODUCTS', response.data.products) //呼叫 PRODUCTS 並傳值進去 讓 mutations去做資料的變更
                context.commit('LOADING', false, { root: true });  //直接使用store函式庫裡面資料 去顯示讀取效果
            });
        },
    },
    mutations: {
        PRODUCTS(state, payload) {
            state.products = payload;
        }
    },
    getters: {             //getter for 元件的computed
        products(state) {  //會把state資料全部傳進來 之後看要取state資料裡面的什麼資料 就使用return
            return state.products;
        }
    },
}