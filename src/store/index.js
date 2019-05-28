import Vue from 'vue'
import Vuex from 'vuex'

import tmall from './modules/tmall'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		tmall
	}
})
