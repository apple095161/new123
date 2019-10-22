<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

<template>
  <div>
    <div class="container">
      <div class="row mt-3 py-3 login-register mt-5 d-flex justify-content-center">
        <div class="col-md-9">
          <ul class="login-register-tab">
            <li
              class="title"
              @click="currentpage = 'login'"
              :class="{'active':currentpage === 'login'}"
            >會員登入</li>
            <li
              class="title"
              @click="currentpage = 'register'"
              :class="{'active':currentpage === 'register'}"
            >會員註冊</li>
          </ul>
          <div class="login-register-body">
            <div class="container">
              <div class="row box-border">
                <div class="col-md-7 left">
                  <div class="form form-line py-5" v-if="currentpage === 'login'">
                    <form>
                      <div class="form-group">
                        <div class="login-data">
                          <input
                            type="email"
                            name="email"
                            id
                            placeholder="請輸入Email地址"
                            class="mb-3 input-data"
                            v-model="user.username"
                            v-validate="'required|email'"
                            required
                          >
                        </div>
                        <span
                          class="text-danger"
                          v-if="errors.has('email')"
                        >{{errors.first('email')}}</span>
                      </div>
                      <div class="form-group">
                        <div class="login-data">
                          <input
                            type="password"
                            name="password"
                            placeholder="請輸入密碼"
                            class="mb-3 input-data is-valid"
                            v-model="user.password"
                            v-validate="'required'"
                            required
                          >
                        </div>
                        <span class="text-danger" v-if="errors.has('password')">請輸入密碼</span>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary login-btn"
                        style="width:260px;"
                        @click.prevent="signin"
                      >登入</button>
                    </form>
                  </div>

                  <div class="form form-line py-5" v-if="currentpage === 'register'">
                    <div class="register-data" v-if="currentpage === 'register'">
                      <div class="h3 mb-2">加入專屬會員</div>
                      <div class="mb-3">我們會將寄送簡訊至你的手機</div>
                      <span class="input-data d-flex align-items-center mb-3">
                        <label for="register-tel">TW+886</label>
                        <input
                          type="tel"
                          placeholder="請輸入手機"
                          class="ml-1"
                          v-model="user.tel"
                          id="register-tel"
                          value
                          maxlength="10"
                        >
                      </span>
                    </div>

                    <button
                      type="button"
                      class="btn btn-primary login-btn"
                      style="width:260px;"
                      v-if="currentpage === 'register'"
                    >下一步</button>
                  </div>
                </div>
                <div class="col-md-5 right d-flex justify-content-center align-items-center">
                  <div class="right-data" v-if="currentpage ==='register'">
                    <i class="fas fa-user fa-3x"></i>
                    <div class="mt-3">
                      已有帳號按此
                      <a href="#login" @click="currentpage = 'login'">登入</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert -->
    <div class="alert alert-primary alert-dismissible login-alert fade" role="alert">
      <div class="text-center" style="background-color">提示訊息!</div>
      <br>
      <div class="text-center" style="background-color:while">
        <span>帳號或密碼錯誤，請重新輸入</span>
        <a href="#" @click.prevent class="close-alert">
          <i class="fas fa-window-close"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
$(document).ready(() => {
  $(".close-alert").click(() => {
    $(".alert").removeClass("show");
  });
});
import $ from "jquery";
export default {
  name: "App",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      currentpage: "login",
      tel: ""
    };
  },

  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      // console.log(api);
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, vm.user).then(response => {
            // console.log(response.data);
            if (response.data.success) {
              vm.$router.push("/admin/products"); //當驗證成功登入時 把路由的路徑改到設定的地方
            } else {
              $(".login-alert").addClass("show");
              //   console.log("帳號或密碼錯誤，請重新輸入");
            }
          });
        }
      });
    }
  }
};
</script>