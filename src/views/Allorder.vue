<template>
  <div>
    <div class="py-4"></div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" width="200">購買時間</th>
          <th scope="col" width="250">Email</th>
          <th scope="col" width>購買物品</th>
          <th scope="col" width="200">訊息</th>
          <th scope="col" width="140">應付金額</th>
          <th scope="col" width="80">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{item.create_at |time}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <p
              v-for="product in item.products"
              :key="product.id"
            >{{product.product.title}} 數量: {{product.qty}} {{product.product.unit}}</p>
          </td>
          <td>{{item.message}}</td>
          <td class="text-right">{{item.total |currency}}</td>
          <td v-if="item.is_paid" class="text-success">已付款</td>
          <td v-if="!item.is_paid" class="text-danger">未付款</td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @returnPageData="getorders"></Pagination>

    <!-- modal -->
    <div class="modal" tabindex="-1" role="dialog" id="editmodal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="editEmail">修改的Email</label>
              <input
                type="text"
                class="form-control mt-2"
                id="editEmail"
                placeholder="修改的Email"
                v-model="editorder.user.email"
              >
            </div>
            <div class="form-group">
              <label for="editporduct">購買的物品</label>
              <input
                type="text"
                class="form-control mt-2"
                id="editporduct"
                placeholder="購買的物品"
                v-model="editorder.products.porduct"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary">修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      editorder: {
        products: [
          {
            porduct: {}
          }
        ],
        total: Number,
        user: {}
      },
      isNew: false
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
      }/admin/orders?page=${page}`;
      const vm = this;
      vm.$store.dispatch('updateLoadgin', true);
      this.$http.get(api).then(response => {
        vm.pagination = response.data.pagination;
        vm.orders = response.data.orders;
        vm.$store.dispatch('updateLoadgin', false);
      });
    },
    /* updateorder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_COUSTOMPATH
      }/admin/order/${id}`;
      const vm = this;
      vm.isLoading = true;
      const data = {
        create_at: 1560500735,
        id: "-LhK4stH76fLbGtZLws-",
        is_paid: false,
        message: "121324",
        num: 6,
        products: Object,
        total: 2490,
        user: Object,
        isLoading: false
      };
      console.log(api);
      this.$http.get(api).then(response => {
        vm.pagination = response.data.pagination;
        vm.orders = response.data.orders;

        console.log("pagination", vm.pagination);
        console.log("orders", vm.orders);
        vm.isLoading = false;
      });
    }, */
    openmodal(isNew, item) {
      if (!isNew) {
        $("#editmodal").modal("show");
        this.editorder = Object.assign({}, item);
      }
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
