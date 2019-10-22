<template>
  <div>
  
    <div class="d-flex justify-content-center">
      <div class="col-md-6">
        <form action @submit.prevent="payorder">
          <table class="table">
            <thead>
              <tr>
                <th>品名</th>
                <th></th>
                <th width="100" scope="col">數量</th>
                <th width="150" scope="col">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>{{item.product.title}}</td>
                <td></td>
                <td>{{item.qty}}/{{item.product.unit}}</td>
                <td class="text-right">{{item.final_total}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{order.total}}</td>
              </tr>
            </tbody>
          </table>

          <table class="table">
            <tr>
              <th width="150">Email</th>
              <td>{{order.user.email}}</td>
            </tr>
            <tr>
              <th width="150">姓名</th>
              <td>{{order.user.name}}</td>
            </tr>
            <tr>
              <th width="150">收件人電話</th>
              <td>{{order.user.tel}}</td>
            </tr>
            <tr>
              <th width="150">收件人地址</th>
              <td>{{order.user.address}}</td>
            </tr>
            <tr>
              <th width="150">付款狀態</th>
              <td class="text-success" v-if="order.is_paid">付款完成</td>
              <td class="text-success" v-if="!order.is_paid">尚未付款</td>
            </tr>
          </table>
          <div class="d-flex justify-content-end" v-if="!order.is_paid">
            <button class="btn btn-primary">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import $ from "jquery";
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/order/${vm.orderId}`;
      //vm.$store.state.isLoading = true;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        //  console.log(vm.order);
        //vm.$store.state.isLoading = false;
        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    payorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.post(api).then(response => {
        if (response.data.success) {
          //  console.log(response);
          this.getorder();
          vm.$store.dispatch("updateLoadgin", false);
        }
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態
    }
  },
  created() {
    this.orderId = this.$route.params.orderId; //取得路由裡面資料的方法 對應元件的路徑 最後的名稱要一致
    // console.log(this.orderId);
    this.getorder();
  }
};
</script>
