<template>
  <div>
    <!-- 載入時的動畫效果 -->
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="100">原價</th>
        <th width="100">價格</th>
        <th width="120">是否啟用</th>
        <th width="130">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <!-- 在後面加 |currency時是使用$字號 -->
          <td class="text-right">{{item.price | currency}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm mr-2" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="delProductModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @returnPageData="getProducts"></Pagination>

    <!-- modal -->
    <div
      class="modal fade"
      id="ProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="temProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-cog fa-spin" v-if="status.fileLoadiing"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFild"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="temProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="temProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="temProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="temProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="temProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="temProduct.price"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="price">數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入數量"
                      v-model="temProduct.count"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="temProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="temProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="temProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ temProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deldata()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //載入Jquery套件 因為$是Jquery的 元件無法使用 要載入
import Pagination from "../views/Pagination.vue";

export default {
  data() {
    return {
      products: [],
      temProduct: {},
      isNew: false,
      status: {
        fileLoadiing: false
      },
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProducts(page = 1) {
      //ES6用法 如果有傳參數近來 使用傳進來的參數 如果沒有 使用預設值1
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.$store.dispatch("updateLoadgin", true);
      console.log(api);
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoadgin", false);
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        (this.temProduct = {}), (this.isNew = true);
      } else {
        this.temProduct = Object.assign({}, item); //因為使用 = item會傳參考 資料會相同 使用ES6 objsect.assgin 把item資料寫入assgin({})物件裡面
        this.isNew = false;
      }
      $("#ProductModal").modal("show");
    },
    delProductModal(item) {
      this.temProduct = Object.assign({}, item); //點擊此商品刪除按鈕時會把item資料帶進來這裡的item 寫進assgin裡面 再把temProduct修改為點擊的商品資料
      $("#delProductModal").modal("show");
    },
    deldata() {
      //刪除伺服器api的資料
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/admin/product/${vm.temProduct.id}`; //取得點擊商品資料的ID位置
      console.log(api);
      this.$http.delete(api).then(response => {
        //使用delete發送請求給伺服器刪除這產品ID資料
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#ProductModal").modal("hide");
          vm.getProducts();
          console.log("刪除失敗");
        }
      });
    },
    uploadFild() {
      console.log(this);
      const uploaderFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData(); //上傳跟api不一樣 要先使用formdata = new formData()
      formData.append("file-to-upload", uploaderFile); //然後把formData資料上傳上去欄位:file-to-upload 然後上傳檔案uploaderFile
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/admin/upload`;
      vm.status.fileLoadiing = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data" //要設定上傳的headers type 以物件傳送
          }
        })
        .then(response => {
          console.log(response.data);
          vm.status.fileLoadiing = false;
          if (response.data.success) {
            //vm.temProduct.imageUrl = response.data.imageUrl; //上傳時沒包含console.log 裡面沒包含set get 如沒寫入到此元件內 無法使用v-model雙向綁定 會沒有效果
            //console.log(vm.temProduct)
            vm.$set(vm.temProduct, "imageUrl", response.data.imageUrl); //把路徑強制寫入 第一個是欄位 第二是裡面的imageUrl 再來是要寫入的路徑response.data.imageUrl
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger"); //第一個欄位放剛剛on裡面註冊的方法  第二個欄位是傳入的訊息 第三個欄位是status
            //然後觸發bus emit的方法 觸發外層alter 跟元件內層資料要往外層送的意思一樣使用emit 只是他還要再使用bus這個實體方法呼叫 因為是在bus設定messaage:push方法
          }
        });
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/admin/product`;

      let httpMethos = "post";
      const vm = this;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/admin/product/${vm.temProduct.id}`;
        httpMethos = "put";
      }
      console.log(api);
      this.$http[httpMethos](api, { data: vm.temProduct }).then(response => {
        console.log(response.data);
        //vm.products = response.data.products;
        if (response.data.success) {
          $("#ProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#ProductModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
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
    this.getProducts();
  }
};
</script>
