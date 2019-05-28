import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'
import Property from './views/Property.vue'
Vue.use(Router)

const router = new Router({
	// mode: 'history',
	routes: [
	/* 	{
			path: '/',
			name: '',
			redirect: '/category'
		}, */
		{
			path: '/',
			name: 'category',
			component: Category
		},
		// 刷新页面 必须保留
		{
			path: '/refresh',
			name: 'refresh',
			hidden: true,
			component: {
				beforeRouteEnter(to, from, next) {
					next(vm => vm.$router.replace(from.fullPath))
				},
				render: h => h()
			}
		},
		{
			path: '/redirect/:route*',
			name: 'redirect',
			component: {
				beforeRouteEnter(to, from, next) {
					next(vm => vm.$router.replace(JSON.parse(from.params.route)))
				},
				render: h => h()
			}
		},
		{
			path: '/property',
			name: 'property',
			component: Property
		},
		{
			path: '/product',
			name: 'product',
			component: () => import('./views/Product.vue')
		},
		{
			path: '/productimage',
			name: 'productimage',
			component: () => import('./views/ProductImage.vue')
		},
		{
			path: '/user',
			name: 'user',
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

router.beforeEach((to, from, next) => {
	console.log(from)
	next()
})

export default router
