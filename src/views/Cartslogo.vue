<template>
  <div>
    <div class="container">
      <div class="normal-size d-flex align-items-center">
        <div class="burger-box">
          <div class="burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <router-link to="/" class="header-logo mr-3">
          <img src="../assets/happy.png" width="200" height="100">
        </router-link>
        <nav class="mr-auto header-list">
          <ul style="font-size:20px;">
            <li class="mr-3 d-inline hover-border">
              <router-link to="/product" @click.prevent>全部商品</router-link>
            </li>
            <li class="d-inline hover-border">
              <router-link to="/orders" @click.prevent>訂單資訊</router-link>
            </li>
          </ul>
        </nav>
        <div class="login member-area">
          <router-link to="/login" @click.prevent>
            <span data-hover="後臺登入" style="width:90px;">Admin</span>
          </router-link>
        </div>

        <div class="cart">
          <div class="dropdown">
            <router-link class="btn btn-sm btn-cart" to="/checkorder">
              <i class="fas fa-cart-arrow-down fa-2x"></i>
              <span class="badge badge-pill badge-danger cart-length">{{arraylangth.length}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

$("document").ready(function() {
  $(".burger-box").click(function() {
    $(".header-list").toggleClass("open");
    $(".burger").toggleClass("change-icon");
  });
});

export default {
  data() {
    return {
      arraylangth: []
    };
  },
  props: {
    carts: Object
  },
  methods: {
    getcarts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        vm.arraylangth = response.data.data.carts;
        console.log("length", vm.arraylangth);
        vm.$store.dispatch("updateLoadgin", false);
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    const vm = this;
    this.getcarts();
    //註冊全域事件 當加入購物車 或移除時 同時更新購物車資訊
    vm.$bus.$on("updatecart", () => {
      vm.getcarts();
    });
  }
};
</script>
