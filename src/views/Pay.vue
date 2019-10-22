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
                  <div class="box box3 text-center active">完成</div>
                </div>
              </div>
              <div class="h2 text-center py-3">付款確認</div>
              <table class="table">
                <thead>
                  <tr>
                    <th width class="text-left">產品名稱</th>
                    <th width="70" class="text-left">數量</th>
                    <th width="70" class="text-left">尺寸</th>
                    <th width="140">價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order" :key="item.id" v-if="item.id">
                    <td>
                      <p
                        class="mb-2"
                        v-for="product in item.products"
                        :key="product.id"
                      >{{product.product.title}}</p>
                    </td>
                    <td>
                      <p
                        class="mb-2"
                        v-for="product in item.products"
                        :key="product.id"
                      >{{product.qty}}/{{product.product.unit}}</p>
                    </td>
                    <td>
                      <p
                        class="mb-2"
                        v-for="product in item.products"
                        :key="product.id"
                      >{{product.size}}</p>
                    </td>
                    <td>
                      <p
                        class="text-right mb-2"
                        v-for="product in item.products"
                        :key="product.id"
                      >{{product.total |currency}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{order.order.total |currency}}</td>
                  </tr>
                </tbody>
              </table>

              <div class="h2 text-center py-3">訂購人資訊</div>

              <table class="table">
                <tr>
                  <th width="150">Email</th>
                  <td>{{orderuser.email}}</td>
                </tr>
                <tr>
                  <th width="150">姓名</th>
                  <td>{{orderuser.name}}</td>
                </tr>
                <tr>
                  <th width="150">收件人電話</th>
                  <td>{{orderuser.tel}}</td>
                </tr>
                <tr>
                  <th width="150">收件人地址</th>
                  <td>{{orderuser.address}}</td>
                </tr>
                <tr>
                  <th width="150">付款狀態</th>
                  <td class="text-success = true" v-if="order.order.is_paid">
                    付款成功
                    <i class="fas fa-check"></i>
                  </td>
                  <td class="text-danger" v-if="!order.order.is_paid">
                    付款失敗
                    <i class="fas fa-times"></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        order: {}
      },
      orderuser: {},
      orderId: ""
    };
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/order/${vm.orderId}`;

      vm.$store.dispatch('updateLoadgin', true);
      //console.log(api);
      this.$http.get(api).then(response => {
        vm.order = response.data;
        vm.orderuser = response.data.order.user;
        //console.log("order", vm.order);
        //console.log("user", vm.orderuser);
       vm.$store.dispatch('updateLoadgin', false);
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    this.orderId = this.$route.params.orderId; //讀取頁面跳轉到的orderid 跟router路徑一致  先取得orderId再去取得訂單資料
    this.getorder();
  }
};
</script>
