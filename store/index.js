import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userInfo: {},
		addressInfo: {},
		categoryId: null,
		openId: null,
		indexaction: {},
		shoppingNumber: 0,
		orderList:[],
		addressList:[]
	},
	mutations: {},
	actions: {}
})
export default store
