import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router)

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: '*', //如果使用者在網址上輸入其他文字的話 會導向到login頁面
      redirect: '/'
    },
    {
      path: '',
      name: '',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          name:'Showproduct',
          component: () => import('./views/Showproduct.vue'),
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('./views/Product.vue'),
        },

        {
          path: '/singleproductdetail/:productid', //到達這產品的ID位址 要使用:後面對應ID
          name: 'singleproductdetail',
          component: () => import('./components/Singleproductdetail.vue'),

        },
        {
          path: '/checkorder',
          name: 'setorder',
          component: () => import('./views/Checkorder.vue'),
        },

        {
          path: '/setordercheck/:orderId',
          name: 'setordercheck',
          component: () => import('./views/Setordercheck.vue'),
        },
        {
          path: '/orders',
          name: 'order',
          component: () => import('./views/Orders.vue'),
        },
        {
          path: '/pay/:orderId',
          name: 'pay',
          component: () => import('./views/Pay.vue'),
        }
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/admin',
      name: 'admin-admin',
      component: () => import('./views/Dashboard.vue'),//meta: { requiresAuth: true }, //是否開啟此元件頁面的驗證
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('./components/Products.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('./views/Allorder'),
          meta: { requiresAuth: true },
        },
        {
          path: '/coupon',
          name: 'coupon',
          component: () => import('./views/Coupon.vue'),
          meta: { requiresAuth: true },
        }
      ]
    },






    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),//meta: { requiresAuth: true }, //是否開啟此元件頁面的驗證
      children: [
        {
          path: '/customer_order',
          name: 'CustomerOrder',
          component: () => import('./components/CustomerOrder'),
        },
        {
          path: '/customer_checkout/:orderId', //到達這產品的ID位址 要使用:後面對應ID
          name: 'CustomerCheckout',
          component: () => import('./components/CustomerCheckout'),
        }
      ]
    },
  ]
})
