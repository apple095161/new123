<template>
  <div>
    <div class="container">
      <main class="carts">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="h2" v-if="!arraylangth.length" style="display:block;">
              <span class="h3">購物車無任何商品</span>
              <div class="h4 mt-2">
                <router-link to="/Detail">立刻選購去</router-link>
              </div>
            </div>

            <div class="col-md-9" v-if="arraylangth.length">
              <div class="step d-flex align-items-center">
                <div class="col-md-4">
                  <div class="box box1 text-center active">填寫訂單資料</div>
                </div>

                <div class="col-md-4">
                  <div class="box box2 text-center">金流付款</div>
                </div>

                <div class="col-md-4">
                  <div class="box box3 text-center">完成</div>
                </div>
              </div>
              <div class="h2 text-center py-3">你的購物車</div>

              <table class="table">
                <thead>
                  <tr>
                    <th width="100"></th>
                    <th width>品名</th>
                    <th width="90" class="text-left">數量</th>
                    <th width="70" class="text-left">尺寸</th>
                    <th width="150">價格</th>
                    <th width="100"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in getcartproduct.carts" :key="item.title">
                    <td>
                      <img :src="item.product.imageUrl" alt width="100" height="80" />
                    </td>
                    <td>{{item.product.title }}</td>
                    <td class="text-left">{{item.qty}}/{{item.product.unit}}</td>
                    <td class="text-left">{{item.size}}</td>
                    <td class="text-right">{{item.product.price |currency}}</td>
                    <td class="text-right">
                      <button class="btn btn-outline-danger" @click="removeItem(item.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-right">總計</td>
                    <td>{{getcartproduct.total |currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-right">折扣後總計</td>
                    <td>{{getcartproduct.final_total |currency}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    @click="addcouponCode"
                  >套用優惠碼</button>
                </div>
              </div>
              <span class="text-danger h4">想要打到骨折，請輸入happy new year</span>

              <div class="h2 text-center py-3">收件人資料</div>
              <form action>
                <div class="row mb-2">
                  <div class="col">
                    <label for="username" class="mb-2">收件人姓名</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="username"
                      placeholder="請填寫收件人姓名"
                      v-model="form.user.name"
                      v-validate="'required'"
                      required
                      :class="{'is-invalid':errors.has('name')}"
                    />
                    <span class="text-danger" v-if="errors.has('name')">請輸入收件人姓名</span>
                  </div>
                  <div class="col">
                    <label for="usertel" class="mb-2">收件人電話</label>
                    <input
                      type="text"
                      name="tel"
                      class="form-control"
                      id="usertel"
                      placeholder="請填寫收件人電話"
                      v-model="form.user.tel"
                      v-validate="'required'"
                      required
                      :class="{'is-invalid':errors.has('tel')}"
                    />
                    <span class="text-danger" v-if="errors.has('tel')">請輸入收件人電話</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="useraddress" class="mb-2">收件人地址</label>
                  <input
                    type="text"
                    name="address"
                    class="form-control"
                    id="useraddress"
                    placeholder="請填寫收件人地址"
                    v-model="form.user.address"
                    v-validate="'required'"
                    required
                    :class="{'is-invalid':errors.has('address')}"
                  />
                  <span class="text-danger" v-if="errors.has('address')">請輸入收件人地址</span>
                </div>
                <div class="form-group">
                  <label for="useremail" class="mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="useremail"
                    placeholder="請填寫Email"
                    v-model="form.user.email"
                    v-validate="'required|email'"
                    required
                    :class="{'is-invalid':errors.has('email')}"
                  />
                  <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                </div>
                <div class="form-group">
                  <label for="usermessage" class="mb-2">留言</label>
                  <textarea class="form-control" id="usermessage" rows="5" v-model="form.message"></textarea>
                </div>

                <div class="text-right py-5">
                  <button
                    class="btn btn-primary"
                    style="width:200px;"
                    @click.prevent="createOrder"
                  >填寫完成，付款去</button>
                </div>
              </form>
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
      coupon_code: "",
      cartproduct: {},
      getcartproduct: {},
      arraylangth: [],
      order: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        products: {},
        message: []
      }
    };
  },
  methods: {
    getcart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.getcartproduct = response.data.data;
          vm.arraylangth = response.data.data.carts;
          vm.$store.dispatch("updateLoadgin", false);
          // console.log("length", vm.arraylangth);
          // console.log(vm.getcartproduct);
        }
      });
    },

    removeItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.$store.dispatch('updateLoadgin', true);
      this.$http.delete(api).then(response => {
        // console.log(response);
        vm.$bus.$emit("updatecart");
        vm.getcart();
        vm.$store.dispatch('updateLoadgin', false);
      });
    },
    addcouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.$store.dispatch('updateLoadgin', true);
      this.$http.post(api, { data: coupon }).then(response => {
        // console.log(response);
        vm.getcart();
        vm.$store.dispatch('updateLoadgin', false);
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch('updateLoadgin', true);
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
            //  console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`/setordercheck/${response.data.orderId}`);
              vm.$bus.$emit("updatecart");
            }
            vm.$store.dispatch('updateLoadgin', false);
          });
        } else {
          // console.log("欄位不完整");
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
    this.getcart();
  }
};
</script>
