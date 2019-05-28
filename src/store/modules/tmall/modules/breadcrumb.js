export default {
	namespaced: true,
	state: {
		crumbs: [
			{name: '产品分类', path: '/'}
		]
	},
	mutations: {
		push(state, crumb) {
			state.crumbs.push(crumb)
		},
		delete(state, path) {
			for (let i = 0, len = state.crumbs.length; i < len; i++) {
				const ele = state.crumbs[i]
				if (ele.path === path) {
					state.crumbs.splice(i)
					break
				}
			}
		}
	}
}
