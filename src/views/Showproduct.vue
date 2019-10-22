<template>
  <div>
    <main class="mb-4">
      <div class="container">
        <Carousel></Carousel>
        <section class="event mt-2">
          <div class="row">
            <div class="col-md-3 col-xs-6 mt-2 event-item">
              <router-link @click.prevent to="product">
                <img
                  src="https://www.eyescream.com.tw/free_layout/20190522/180522_news_slice_1.jpg"
                  alt
                  height="100%"
                  width="100%"
                >
              </router-link>
            </div>
            <div class="col-md-3 col-xs-6 mt-2 event-item">
              <router-link @click.prevent to="product">
                <img
                  src="https://www.eyescream.com.tw/free_layout/20190522/180522_news_slice_3.jpg"
                  alt
                  height="100%"
                  width="100%"
                >
              </router-link>
            </div>
            <div class="col-md-3 col-xs-6 mt-2 event-item">
              <router-link @click.prevent to="product">
                <img
                  src="https://images.unsplash.com/photo-1520591799316-6b30425429aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt
                  height="100%"
                  width="100%"
                >
              </router-link>
            </div>
            <div class="col-md-3 col-xs-6 mt-2 event-item">
              <router-link @click.prevent to="product">
                <img
                  src="https://s2.lativ.com.tw/i/Waterfall/20190201-1221/NEWPRICE_560_190328_TW_3.jpg"
                  alt
                  height="100%"
                  width="100%"
                >
              </router-link>
            </div>
          </div>
        </section>

        <div class="show-img mt-2">
          <div class="row">
            <div class="col-md-4 mt-2">
              <router-link @click.prevent to="product">
                <img
                  src="https://s2.lativ.com.tw/i/Waterfall/20190201-1221/41257_41262_DRY_560_190517_TW03_1.jpg"
                  alt
                  width="100%"
                  height="100%"
                >
              </router-link>
            </div>
            <div class="col-md-4 mt-2">
              <router-link @click.prevent to="product">
                <img
                  src="https://images.unsplash.com/photo-1532795986-dbef1643a596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                  alt
                  width="100%"
                  height="100%"
                >
              </router-link>
            </div>
            <div class="col-md-4 mt-2">
              <router-link @click.prevent to="product">
                <img
                  src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=654&q=80"
                  alt
                  width="100%"
                >
              </router-link>
            </div>
          </div>
        </div>

        <div class="sale-image mt-3">
          <div class="row">
            <div class="col-md-6">
              <router-link @click.prevent to="product">
                <img
                  src="https://images.unsplash.com/photo-1485043433441-db091a258e5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt
                  width="100%"
                  class="mb-2"
                >
              </router-link>
            </div>

            <div class="col-md-6">
              <router-link @click.prevent to="product">
                <img
                  src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt
                  width="100%"
                  class="mb-2"
                >
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <router-link @click.prevent to="product">
              <img
                src="https://imgs.weekendhk.com/wp-content/uploads/2017/10/112_138969515059d4b30697322.jpg"
                alt
                width="100%"
              >
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>



<script>
import $ from "jquery";
import Carousel from "./Carousel";

export default {
  components: {
    Carousel
  },
  data() {
    return {};
  }
};
</script>
