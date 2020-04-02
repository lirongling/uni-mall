import Vue from 'vue'
import App from './App'
//引入vuex
import store from "store/index.js"
import api from "http/api.js"
import dayjs from 'dayjs'

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
	api,
	dayjs
	
})
app.$mount()
