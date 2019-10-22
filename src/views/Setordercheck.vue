<template>
  <div>
    <div class="container">
      <main class="carts">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-9">
              <div class="step d-flex align-items-center">
                <div class="col-md-4">
                  <div class="box box1 text-center active">填寫訂單資料</div>
                </div>

                <div class="col-md-4">
                  <div class="box box2 text-center active">金流付款</div>
                </div>

                <div class="col-md-4">
                  <div class="box box3 text-center">完成</div>
                </div>
              </div>
              <div class="h2 text-center py-3">選購的產品</div>
              <table class="table">
                <thead>
                  <tr>
                    <th width="100"></th>
                    <th width class="text-left">品名</th>
                    <th width="70" class="text-left">數量</th>
                    <th width="70" class="text-left">尺寸</th>
                    <th width="140">價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.title">
                    <td>
                      <img :src="item.product.imageUrl" alt width="100" height="80">
                    </td>
                    <td>{{item.product.title }}</td>
                    <td class="text-left">{{item.qty}}</td>
                    <td class="text-left">{{item.size}}</td>
                    <td class="text-right">{{item.product.price |currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right">總計</td>
                    <td class="text-right">{{order.total |currency}}</td>
                  </tr>
                </tbody>
              </table>

              <div class="h2 text-center py-3">購買者資料</div>

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
              <div class="text-right py-5">
                <button class="btn btn-primary" @click="payorder" style="width:200px;">資料確認無誤，付款去</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import "jquery";
export default {
  data() {
    return {
      getcartproduct: {},
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoadgin', true); //使用actions 去啟用方法 在 更改方法的資料
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
       vm.$store.dispatch('updateLoadgin', false);
      });
    },
    payorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/pay/${vm.orderId}`;
     vm.$store.dispatch('updateLoadgin', true);
      this.$http.post(api).then(response => {
        if (response.data.success) {
          //console.log(response.data);
          vm.$router.push(`/pay/${vm.orderId}`)
          this.getorder();
          vm.$store.dispatch('updateLoadgin', false); 
        }
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    this.orderId = this.$route.params.orderId; //取得路由裡面資料的方法 對應元件的路徑 最後的名稱要一致
    this.getorder();
  }
};
</script>
