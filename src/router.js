import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'category',
      component: Category
    },
    {
      path: "/property",
      name: "property",
      component: () => import('./views/Property.vue')
    },
    {
      path: "/product",
      name: "product",
      component: () => import('./views/Product.vue')
    },
    {
      path: "/productimage",
      name: "productimage",
      component: () => import('./views/ProductImage.vue')
    },
    {
      path: "/user",
      name: "user",
      component: () => import('./views/User.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
