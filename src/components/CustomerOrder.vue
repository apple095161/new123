<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm" style="height:100%">
          <div
            style="height: 250px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${item.imageUrl})`}"
          >
            <!-- backgroundImage -->
          </div>
          <div class="card-body">
            <span class="badge badge-danger float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.description}}</p>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>

              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">售價 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getSinglePorduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadItem === item.id"></i>
              <!-- 假設status.id  = 點擊的品項ID相同 顯示讀取效果 -->
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addTocart(item.id,item.count)"
            >
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <table class="table" v-if="hideTable > 0">
            <thead>
              <tr>
                <th width="60"></th>
                <th width>品名</th>
                <th width="100" scope="col">數量</th>
                <th width="150" scope="col">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in getcartproduct.carts" :key="cart.id">
                <td>
                  <button class="btn btn-outline-danger" @click="removeItem(cart.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
                <td>{{cart.product.title}}</td>
                <td>{{cart.product.count}} / {{cart.product.unit}}</td>
                <td class="text-right">{{cart.total |currency}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{getcartproduct.total |currency}}</td>
              </tr>
              <tr v-if="getcartproduct.total !==getcartproduct.final_total">
                <td colspan="3" class="text-right">折扣價</td>
                <td class="text-right">{{getcartproduct.final_total |currency }}</td>
              </tr>
            </tbody>
          </table>

          <!-- cupon -->
          <div class="input-group mb-3" v-if="hideTable > 0">
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

          <!-- form -->
          <form v-if="hideTable > 0" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                name="email"
                type="email"
                class="form-control"
                id="useremail"
                aria-describedby="emailHelp"
                placeholder="Email"
                v-model="form.user.email"
                v-validate="'required|email'"
                required
                :class="{'is-invalid':errors.has('email')}"
              />
              <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                name="name"
                type="text"
                class="form-control"
                id="username"
                placeholder="收件人姓名"
                v-model="form.user.name"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('name')}"
              />
              <!-- 當有觸發沒輸入時 增加input紅色外框 -->

              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
              <!-- validate的用法 當輸入的欄位是空白時會跳出提示 -->
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                name="tel"
                type="tel"
                class="form-control"
                id="usertel"
                placeholder="收件人電話"
                v-model="form.user.tel"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('tel')">請輸入收件人電話</span>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                name="address"
                type="text"
                class="form-control"
                id="useraddress"
                placeholder="收件人地址"
                v-model="form.user.address"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('address')">請輸入收件人地址</span>
            </div>

            <div class="form-group">
              <label for="textarea">留言</label>
              <textarea class="form-control" id="textarea" rows="5" v-model="form.message"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="createOrder">送出</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="ProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{product.title}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img alt :src="product.imageUrl" class="img-fluid" />
            <blockquote class="blockquote mt-3">
              <p>{{product.description}}</p>
            </blockquote>

            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h5" v-if="!product.price">{{product.origin_price}} 元</del>
              <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{product.price}} 元</div>
            </div>
            <select name id class="form-control mt-3" v-model="product.count">
              <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              總計
              <strong>{{ product.count * product.price}}</strong>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addTocart(product.id,product.count)"
              >
                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadItem"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //載入Jquery套件 因為$是Jquery的 元件無法使用 要載入

export default {
  data() {
    return {
      hideTable: [],
      getcartproduct: {},
      products: [],
      product: {},
      status: {
        loadItem: ""
      },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getProducts() {
      //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/products/all`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      // console.log(api);
      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.products = response.data.products;
        //  console.log(vm.products)
        //vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    getSinglePorduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadItem = id;
      //  console.log(api);
      this.$http.get(api).then(response => {
        $("#ProductModal").modal("show");
        //   console.log(response.data);
        vm.product = response.data.product;
        vm.status.loadItem = "";
      });
    },
    addTocart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadItem = id;
      // console.log(api);
      const cart = {
        //傳送資料到購物車時 傳產品ID 及數量 就好 不然使用者可以更改價錢
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        vm.status.loadItem = "";
        vm.getcart();
        $("#ProductModal").modal("hide");
      });
    },
    getcart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.get(api).then(response => {
        //   console.log(response.data);
        vm.getcartproduct = response.data.data;
        vm.hideTable = response.data.data.total;
        //   console.log(vm.hideTable);

        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    removeItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.delete(api).then(response => {
        vm.getcart();
        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    addcouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.$store.dispatch("updateLoadgin", true);
      this.$http.post(api, { data: coupon }).then(response => {
        //  console.log(response);
        vm.getcart();
        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch("updateLoadgin", true);
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
            //   console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.$store.dispatch("updateLoadgin", false);
          });
        } else {
          vm.$store.dispatch("updateLoadgin", false);
          //  console.log('欄位不完整');
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
    this.getProducts();
    this.getcart();
  }
};
</script>
