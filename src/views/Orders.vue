<template>
  <div>
    <div class="container mb-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <th width="120">購買時間</th>
            <th width="250">購買人資訊</th>
            <th width="200">購買物品</th>
            <th width="100">備註</th>
            <th width="80">金額</th>
            <th width="100">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{item.create_at |time}}</td>
            <td>
              <ul>
                <li>訂單編號:{{item.id}}</li>
                <li>姓名:{{item.user.name}}</li>
                <li>住址:{{item.user.address}}</li>
                <li>Email:{{item.user.email}}</li>
                <li>電話:{{item.user.tel}}</li>
              </ul>
            </td>
            <td>
              <p
                v-for="product in item.products"
                :key="product.id"
              >{{product.product.title}} {{product.qty}}/{{product.product.unit}}</p>
            </td>
            <td>{{item.message}}</td>
            <td class="text-right">{{item.total |currency}}</td>
            <td class="text-success" v-if="item.is_paid">
              <div class="mb-2">已付款</div>
              <div>{{item.paid_date |time}}</div>
            </td>
            <td class="text-danger" v-if="!item.is_paid">
              <span class="mr-2">未付款</span>
              <button class="btn btn-outline-primary btn-sm" @click="gopay(item)">付款去</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @returnPageData="getorders"></Pagination>
    </div>
  </div>
</template>


<script>
import $ from "jquery";
import Pagination from "./Pagination";
export default {
  data() {
    return {
      pagination: {},
      orders: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getorders(page = 1) {
      //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/orders?page=${page}`;
      const vm = this;
       vm.$store.dispatch('updateLoadgin', true);  //直接使用store函式庫裡面資料 去顯示讀取效果
      //console.log(api);
      this.$http.get(api).then(response => {
        vm.orders = response.data.orders;
        //console.log(vm.orders);
        vm.pagination = response.data.pagination;
         vm.$store.dispatch('updateLoadgin', false);
      });
    },
    gopay(item) {
      const vm = this;
      vm.$router.push(`/setordercheck/${item.id}`);
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    this.getorders();
  }
};
</script>
