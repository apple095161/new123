<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="content pt-3">
      <div class="container">
        <div class="row">
          <div class="col-md-3 detail-side mt-2">
            <div class="list-group">
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = 'all'"
                :class="{'active':filter==='all'}"
              >全部商品</button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = '極致'"
                :class="{'active':filter==='極致'}"
              >極致系列</button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = '衣服'"
                :class="{'active':filter==='衣服'}"
              >衣服</button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = '褲子'"
                :class="{'active':filter==='褲子'}"
              >超時尚之褲子</button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = '外套'"
                :class="{'active':filter==='外套'}"
              >外套</button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                @click="filter = '骨折'"
                :class="{'active':filter==='骨折'}"
              >打到骨折區</button>
            </div>
          </div>
          <div class="col-md-9 mt-2 detail-product">
            <div class="row">
              <div class="col-md-4 mb-4 col-sm-6" v-for="item in filterproduct" :key="item.id">
                <div class="card border-0 shadow-sm" style="height:100%">
                  <a href="#" @click.prevent="getSinglePorduct(item.id)">
                    <div
                      style="height: 250px; background-size: cover; background-position: center"
                      :style="{backgroundImage:`url(${item.imageUrl})`}"
                    >
                      <!-- backgroundImage -->
                    </div>
                  </a>

                  <div class="card-body">
                    <div class="card-title h5 font-weight-bold">{{item.title}}</div>
                    <div class="mt-3">
                      <del class="h6 mr-3" style="color:gray;">原價 {{item.origin_price}} 元</del>
                      <strong class="item-price text-danger">NT.{{item.price}}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapActions } from "vuex"; //載入整個vuex資料 給mapGetters使用
export default {
  data() {
    return {
      productid: "",
      size: "",
      filter: "all",
      product: {},
      status: {
        loadItem: ""
      }
    };
  },
  methods: {
    /* getProducts() {
      //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/products/all`;
      const vm = this;
      vm.$store.dispatch('updateLoadgin', true);  //直接使用store函式庫裡面資料 去顯示讀取效果
      console.log(api);
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        //vm.pagination = response.data.pagination;
       vm.$store.dispatch('updateLoadgin', false);  //直接使用store函式庫裡面資料 去顯示讀取效果
      }); 
      this.$store.dispatch("getProducts");
    }, */
    ...mapActions('porductModules',["getProducts"]), //porductModules為模組區域變數的使用方法 在前面加上要取的模組名稱
    getSinglePorduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/product/${id}`;
      const vm = this;
      //console.log(api);
      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.product = response.data.product;
        vm.productid = response.data.product.id;
        this.$router.push(`/singleproductdetail/${id}`);
      });
    }
  },
  computed: {
    filterproduct() {
      const vm = this;
      const newPorduct = [];
      if (this.filter === "" || this.filter === "all") {
        return vm.products;
      } else {
        vm.products.forEach(function(item, key) {
          if (vm.filter === item.category) {
            newPorduct.push(item);
          }
        });
      }
      return newPorduct;
    },
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態
    },
    ...mapGetters('porductModules',["products"]) //要取得的vuex裡面 getter資料 porductModules為模組區域變數的使用方法 在前面加上要取的模組名稱
  },
  created() {
    this.getProducts();
  }
};
</script>
