<template>
  <dir>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">幸福之路有限公司</router-link>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">
            <i class="fas fa-sign-out-alt"></i>
            登出
          </a>
        </li>
      </ul>
    </nav>
  </dir>
</template>

<script>
export default {
  data() {
    return {
      name: "signout"
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      console.log(api);
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login"); //登出後會把頁面導向對應 router index.js下設定的路徑
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 此scoped用法是把下列的樣式綁定在此元件上 只有此元件內會使用此樣式 App.vue裡面的連結不會被影響 */
</style>