<template>
  <div>
    <div class="py-4 text-right">
      <button class="btn btn-primary" @click="openmodal(true)">新增優惠券</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">優惠券名稱</th>
          <th scope="col">優惠券代碼</th>
          <th scope="col">到期日</th>
          <th scope="col">折扣數</th>
          <th scope="col" width="150">刪除優惠券</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.due_date |normaltime}}</td>
          <td>{{item.percent}}%</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm mr-2" @click="openmodal(false,item)">修改</button>
              <button class="btn btn-outline-danger btn-sm" @click="delcoupon(item.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @returnPageData="getcoupon"></Pagination>

    <div class="modal" tabindex="-1" role="dialog" id="couponmodal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="coupon-title">請輸入優惠券名稱</label>
              <input
                type="text"
                class="form-control mt-2"
                id="coupon-title"
                placeholder="優惠券名稱"
                v-model="setcoupon.title"
              >
            </div>
            <div class="form-group">
              <label for="coupon-title">請輸入優惠券到期日</label>
              <input
                type="date"
                class="form-control mt-2"
                id="coupon-title"
                placeholder="優惠券到期日"
                v-model="newtime"
              >
            </div>
            <div class="form-group">
              <label for="coupon-title">請輸入折扣%數</label>
              <input
                type="number"
                class="form-control mt-2"
                id="coupon-title"
                placeholder
                v-model="setcoupon.percent"
                oninput="if(value<0) value=1;if(value>100)value=100"
              >
            </div>
            <div class="form-group">
              <label for="coupon-title">請輸入優惠券使用代碼</label>
              <input
                type="text"
                class="form-control mt-2"
                id="coupon-title"
                placeholder
                v-model="setcoupon.code"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="addcoupon(setcoupon)">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";
import { fips } from "crypto";

export default {
  data() {
    return {
      isNew: false,
      newtime: new Date(),
      coupons: {},
      pagination: {},
      setcoupon: {
        title: "",
        is_enabled: 1,
        percent: 0,
        due_date: 0,
        code: ""
      }
    };
  },
  watch: {
    newtime() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.newtime) / 1000);
      vm.setcoupon.due_date = timestamp;
    }
  },
  components: {
    Pagination
  },
  methods: {
    getcoupon(page = 1) {
      //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/admin/coupons?page=${page}`;
      const vm = this;
       vm.$store.dispatch('updateLoadgin', true);
      //console.log(api);
      this.$http.get(api).then(response => {
        //console.log(response.data);
        vm.pagination = response.data.pagination;
        vm.coupons = response.data.coupons;
         vm.$store.dispatch('updateLoadgin', false);
        /*  if(response.data.success){
        vm.$set(vm.coupons,'coupons',response.coupons) //無get set如要使用v model 要使用強制寫入
        } */
      });
    },
    addcoupon(setcoupon) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/admin/coupon`;
      let httpMethos = "post";
      const vm = this;
      const coupon = {
        title: setcoupon.title,
        is_enabled: setcoupon.is_enabled,
        percent: setcoupon.percent,
        due_date: setcoupon.due_date,
        code: setcoupon.code
      };
      vm.$store.dispatch('updateLoadgin', true);
      /*  const timestamp = Math.floor(Date.now() / 1000); */
      if (!vm.isNew) {
        //console.log(api);
        httpMethos = "put";
        api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_COUSTOMPATH
        }/admin/coupon/${vm.setcoupon.id}`;

        this.$http[httpMethos](api, { data: coupon }).then(response => {
         // console.log(api);
           vm.$store.dispatch('updateLoadgin', false);
          $("#couponmodal").modal("hide");
          this.getcoupon();
        });
      } else {
        this.$http[httpMethos](api, { data: vm.setcoupon }).then(response => {
         // console.log(api);
           vm.$store.dispatch('updateLoadgin', false);
          $("#couponmodal").modal("hide");
         // console.log(vm.newtime);
          this.getcoupon();
        });
      }
    },
    delcoupon(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/admin/coupon/${id}`;
      const vm = this;
       vm.$store.dispatch('updateLoadgin', true);
      this.$http.delete(api).then(response => {
       // console.log(response);
         vm.$store.dispatch('updateLoadgin', false);
        this.getcoupon();
      });
    },

    openmodal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.setcoupon = {};
        vm.newtime = "";
        vm.isNew = true;
      } else {
        vm.setcoupon = Object.assign({}, item);
        vm.newtime = "";
        vm.isNew = false;
      }
      $("#couponmodal").modal("show");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態 要使用computed
    }
  },
  created() {
    this.getcoupon();
  }
};
</script>
