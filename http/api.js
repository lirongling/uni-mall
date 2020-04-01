import http from "./index.js"
import md5 from 'md5'
let url = "http://49.233.66.125:1234"
let map = "https://apis.map.qq.com/ws/place/v1"
let key = 'LJCBZ-HWJ6D-RMK45-H7VYX-WNBO5-KSBHJ'
let sig = 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R'
export default {
	// 获取首页数据

	getIndex() {
		return http.get(`${url}/index/index`)
	},
	// 专题
	getTopic(page) {
		return http.get(`${url}/topic/listaction?page=${page}`)
	},
	// 分类列表
	getCategory() {
		return http.get(`${url}/category/indexaction`)
	},
	// 当前分类
	getCurrentaction(id) {
		return http.get(`${url}/category/currentaction?id=${id}`)
	},
	// 首页分类导航
	getCategoryNav(id) {
		return http.get(`${url}/category/categoryNav?id=${id}`)
	},
	// 分类导航商品列表
	getCategoryId(id) {
		return http.get(`${url}/goods/goodsList?categoryId=${id}`)
	},

	// 搜索相关
	getIndexaction(id) {
		return http.get(`${url}/search/indexaction?openId=${id}`)
	},
	// 参数:openId: 生成的openId
	//   - 包括默认关键字 搜索记录 热门搜索
	// 添加搜索历史  参数: keyword:关键字 openId:生成的openId
	addHistory({keyword,openId}) {
		return http.post(`${url}/search/addhistoryaction`, {keyword,openId})
	},
	// 清空搜索记录
	clearHistory(openId) {
		return http.post(`${url}/search/clearhistoryAction`, openId)
	},
	// 关键字搜索
	getSearch(keyword) {
		return http.get(`${url}/search/helperaction?keyword=${keyword}`)
	},
	// 首页制造商详情
	brandDetails(id) {
		return http.get(`${url}/brand/detailaction?id=${id}`)
	},
	// 查看全部:默认综合   type:isNew新品 isHot人气推荐
	getGoodsType(type) {
		return http.get(`${url}/goods/goodsList?${type}=1`)
	},
	// 全部升序or排列 order:asc升序 desc降序
	getGoodsSore(type, order) {
		return http.get(`${url}/goods/goodsList?${type}=1&order=${order}`)
	},
	// 商品详情
	goodDetails(id, openId) {
		return http.get(`${url}/goods/detailaction?id=${id}&openId=${openId}`)
	},
	// 专题详情
	topicDetails(id) {
		return http.get(`${url}/topic/detailaction?id=${id}`)
	},
	// 加入收藏,商品详情接口会返回是否收藏
	// 参数: goodsId:商品id openId: 生成的openId
	addcollect({
		goodsId,
		openId
	}) {
		return http.post(`${url}/collect/addcollect`, {
			goodsId,
			openId
		})
	},
	// 查看收藏
	getCollect(openId) {
		return http.get(`${url}/collect/listAction?openId=${openId}`)
	},
	// 立即购买
	// 参数:allPrise:总价 goodsId:商品id openId: 生成的openId
	submitOrder({
		allPrise,
		goodsId,
		openId
	}) {
		return http.post(`${url}/order/submitAction`, {
			allPrise,
			goodsId,
			openId
		})
	},
	// 购买详情
	// 参数: openId: 生成的openId addressId: 地址id
	getListAction(openId, addressId) {
		return http.get(`${url}/order/detailAction?openId==${openId}&addressId=${addressId}`)
	},
	// 新增地址
	// 参数: address(省市区) addressId: '' checked:是否默认 detailadress: 地址详情 openId: 生成的openId telNumber:电话 userName: 姓名
	saveAddress({
		address,
		addressId,
		checked,
		detailadress,
		telNumber,
		userName,
		openId
	}) {
		return http.post(`${url}/address/saveAction`, {
			address,
			addressId,
			checked,
			detailadress,
			telNumber,
			userName,
			openId
		})
	},
	// 获取全部地址
	getAddressList(openId) {
		return http.get(`${url}/address/getListAction?openId=${openId}`)
	},
	// 单个地址详情
	getAddress(id) {
		return http.get(`${url}/address/detailAction?id==${id}`)
	},
	// 加入购物车
	// 参数: goodsId:商品id number:数量 openId:生成的openId
	addCart({
		number,
		goodsId,
		openId
	}) {
		return http.post(`${url}/cart/addCart`, {
			number,
			goodsId,
			openId
		})
	},
	// 查看购物车
	getCartList(openId) {
		return http.get(`${url}/cart/cartList?openId=${openId}`)
	},
	// 删除购物车
	deleteAction(id) {
		return http.get(`${url}/cart/deleteAction?id=${id}`)
	},
	// 地图关键词输入提醒 keyword:关键词 
	// region：限制城市范围：根据城市名称限制地域范围， 如， 仅获取“ 广州市” 范围内的提示内容
	// location：location=39.11457,116.55332

	mapSuggestion(keyword, region = "北京市", location) {
		let a = md5(`/ws/place/v1/suggestion?key=${key}&keyword=${keyword}&location=${location}&region=${region}${sig}`)
		// #ifdef  H5
		return http.get(
			`/api/ws/place/v1/suggestion?key=${key}&keyword=${keyword}&location=${location}&region=${region}&sig=${a}`)
		// #endif

		return http.get(`${map}/suggestion?key=${key}&keyword=${keyword}&location=${location}&region=${region}&sig=${a}`)
	},
	ipLocation() {
		let a = md5(`/ws/location/v1/ip?ip=117.173.223.140&key=${key}&output=json${sig}`)
		return http.get(`/api/ws/location/v1/ip?ip=117.173.223.140&key=${key}&output=json&sig=${a}`)
	},
	getLocation(location) {
		let a = md5(`/ws/geocoder/v1/?key=${key}&location=${location}${sig}`)
		return http.get(`/api/ws/geocoder/v1/?key=${key}&location=${location}&sig=${a}`)
	}

}
