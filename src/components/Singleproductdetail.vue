<template>
  <div>
   <!--  <loading :active.sync="isLoading"></loading> -->

    <div class="content">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-md-10 mt-2" style="position:relative">
            <div class="alert alert-primary alert-dismissible fade" role="alert">
              <div class="text-center" style="background-color">提示訊息!</div>
              <br>
              <div class="text-center" style="background-color:while">
                <span>你尚未選擇尺寸</span>
                <a href="#" @click.prevent class="close-alert">
                  <i class="fas fa-window-close"></i>
                </a>
              </div>
            </div>
            <div class="container moblie-mb">
              <div class="row">
                <a
                  class="col-md-6"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                  href="#"
                  v-for="(item,index) in product"
                  :key="index"
                  style="height: 450px; width:100%; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"
                  v-if="item.title"
                  @click.prevent="openmodal(item)"
                ></a>
                <div class="col-md-6" v-for="item in product" :key="item.id" v-if="item.title">
                  <div class="row product-title">
                    <div class="col-md-8 product-title-area mr-auto">
                      <div class="mb-2 text-success" style="font-size:25px;">
                        {{item.title}}
                        <span v-if="current">- {{current}}</span>
                      </div>
                      <div class="mt-2">商品編號:{{item.id}}</div>
                    </div>

                    <div class="col-md-4 text-right product-price-area">
                      <del class="h5 font-weight-bold">{{item.origin_price}}</del>
                      <div class="text-center text-danger font-weight-bold mr-5 moblie-mb-text">NT$</div>
                      <div class="h2 font-weight-bold text-danger text-right">{{item.price}}</div>
                    </div>
                  </div>
                  <div class="product-line mt-2"></div>
                  <div class="product-size-area mt-3 d-flex justify-content-around">
                    <button
                      class="btn btn-outline-success"
                      :class="{'active':size === 'S'}"
                      @click="size = 'S' "
                    >S</button>
                    <button
                      class="btn btn-outline-success"
                      :class="{'active':size === 'M'}"
                      @click="size = 'M' "
                    >M</button>
                    <button
                      class="btn btn-outline-success"
                      :class="{'active':size === 'L'}"
                      @click="size = 'L' "
                    >L</button>
                    <button
                      class="btn btn-outline-success"
                      :class="{'active':size === 'XL'}"
                      @click="size = 'XL' "
                    >XL</button>
                    <button
                      class="btn btn-outline-success"
                      :class="{'active':size === 'XXL'}"
                      @click="size = 'XXL' "
                    >XXL</button>
                  </div>
                  <div class="product-line my-4"></div>
                  <div class="addcart">
                    <label class="mr-3">數量</label>

                    <a class @click="counter -= 1">
                      <i class="fas fa-minus"></i>
                    </a>
                    <input type="text" v-model="counter">
                    <a class @click="counter += 1">
                      <i class="fas fa-plus"></i>
                    </a>

                    <button class="btn btn-success ml-3" @click="addtocart(item.id,counter)">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="alert">
      <div class="alert-title text-center mb-3">提示訊息</div>
      <div class="alert-content text-center">你尚未選擇尺寸!!</div>
      <a href="#" @click.prevent class="close-alert">
        <i class="fas fa-window-close"></i>
      </a>
    </div>-->

    <!-- modal -->

    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" style="width:800px">
        <div class="modal-content">
          <div class="modal-header text-right">
            <div class="mr-auto"></div>
            <button type="button" class="btn btn-outline btn-sm" data-dismiss="modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <img :src="modalData.imageUrl" alt width="100%" height="700">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

$(document).ready(() => {
  $(".close-alert").click(() => {
    $(".alert").removeClass("show");
  });
});

export default {
  data() {
    return {
      modalData: {},
      cartproduct: {},
      counter: 1,
      productid: "",
      product: {},
      current: "",
      size: "",
      getcartproduct: {},
      status: {
        loadItem: {}
      }
    };
  },

  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/product/${vm.productid}`;
      //vm.$store.state.isLoading = true;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        vm.product = response.data;
       vm.$store.dispatch("updateLoadgin", false);
      });
    },
    addtocart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      const cart = {
        product_id: id,
        qty: vm.counter,
        size: vm.size,
        product: vm.getcartproduct.product

        //傳送資料到購物車時 傳產品ID 及數量 就好 不然使用者可以更改價錢
      };
      if (vm.size === "") {
        $(".alert").addClass("show");
      } else {
        this.$http.post(api, { data: cart }).then(response => {
          //console.log(response);
          vm.status.loadItem = "";
          this.cartproduct = Object.assign({}, this.product);
          vm.$store.dispatch("updateLoadgin", false);
          vm.$bus.$emit("updatecart");
        });
      }
    },
    getcart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/cart`;
      const vm = this;
     vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        vm.getcartproduct = response.data.data;
        //console.log(vm.getcartproduct);
        vm.$store.dispatch("updateLoadgin", false);
        //vm.hideTable = response.data.data.total;
      });
    },
    openmodal(item) {
      const vm = this;
      $("#myModal").modal("show");
      vm.modalData = item;
      //console.log(item);
    }
    /* getMyEvent() {
      this.$refs.cart.emitEvent(this.getcartproduct);
      //呼叫子元件的方法，child是上邊ref起的名字，emitEvent是子元件的方法。
    } */
  },
  watch: {
    counter(value) {
      if (value < 1) {
        this.counter = 1; //單獨監控counter的值 如果小於1的話修改為1
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    this.productid = this.$route.params.productid;
    this.getorder();
  }
};
</script>
<style>
</style>
