<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/all"; //使用asset裡面 載入的bootstrap 直接import近來主要程式
//@import "~bootstrap/scss/bootstrap";
</style>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading; //操控使用store函式庫的狀態
    },
  }
};
</script>
