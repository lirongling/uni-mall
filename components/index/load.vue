<template>
	<view class="test"></view>
</template>
<script>
	import qqmapsdk from "../../static/js/qqmap-wx-jssdk.js"
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				text: 'aa'
			}
		},
		methods: {
			//获取定位信息
			getLocation(latitude, longitude) { //2. 获取地理位置
				const QQMapWX = new qqmapsdk({
					key: 'LJCBZ-HWJ6D-RMK45-H7VYX-WNBO5-KSBHJ'
				});
				var _this = this;
				// 解析地址
				QQMapWX.reverseGeocoder({
					sig: 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R',
					location: {
						latitude,
						longitude
					},
					success: function(res) {
						_this.$store.state.addressInfo = res.result
					},
					fail: function(res) {
						uni.showToast({
							title: '定位失败',
							duration: 2000,
							icon: "none"
						})
						console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				})
			},
			chooseLocation() {
				// 先判断定位权限是否开启
				let _this = this
				uni.getLocation({
					type: 'wgs84', // <map> 组件默认为国测局坐标gcj02
					geocode: true,
					success: (res) => {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						_this.getLocation(latitude, longitude)
						// //定位权限开启，打开地图
						// uni.chooseLocation({
						// 	success // 成功回调
						// })
					},
					fail: (e) => {
						console.log(e)
						// 定位权限未开启，引导设置
						uni.showModal({
							title: '温馨提示',
							content: '暂未开启位置授权,请开启',
							confirmText: '去设置',
							success(res) {
								if (res.confirm) {
									//打开授权设置
									console.log('sure')
									_this.openSetting()
								} else if (res.cancel) {
									uni.showToast({
										title: "未打开位置授权，某些功能将无法使用",
										icon: "none"
									})
									setTimeout(() => {
										_this.callbackLocation()
									}, 3000)
								}
							}
						})
					}
				})
			},
			callbackLocation() {
				console.log('111')
				this.chooseLocation()
			},
			//打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			openSetting() {
				let _this = this
				let a = 'scope.userLocation'
				// 打开小程序的设置
				// #ifdef MP-WEIXIN
				uni.openSetting({
					success(res) {
						console.log(res)
						if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							_this.chooseLocation()
						} else {
							console.log("userLocation位置功能已授权")
							_this.chooseLocation()
						}
					}
				})
				// #endif

				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') { //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') { //安卓
							let main = plus.android.runtimeMainActivity();
							let Intent = plus.android.importClass("android.content.Intent");
							let mIntent = new Intent('android.settings.ACTION_SETTINGS');
							main.startActivity(mIntent);
						}
					}
				});
				// #endif
			},
			getLocations(location){
				this.$api.getLocation(location).then(res=>{
					if(res.status===200){
						this.$store.state.addressInfo = res.data.result
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// #ifdef  H5
			// #endif

		},
		mounted() {
			// #ifndef H5
			this.chooseLocation()
			// #endif
			// #ifdef  H5
			let _this=this
			var s = document.createElement('script');
			s.src = "https://webapi.amap.com/maps?v=1.4.15&key=e3429d616d5bef5bee89f8eb7b7346ea";
			var tar = document.querySelector('body');
			tar.appendChild(s);
			s.onload = function(e) {
				AMap.plugin('AMap.CitySearch', function() {
					var citySearch = new AMap.CitySearch()
					citySearch.getLocalCity(function(status, result) {
						if (status === 'complete' && result.info === 'OK') {
							let location=`${result.bounds.xc.lat},${result.bounds.xc.lng}`
							_this.getLocations(location)
							
						}
					})
				})
			};

			// this.$api.ipLocation().then(res => {
			// 	console.log(res)
			// }).catch(err => {
			// 	console.log(err)
			// })
			// #endif
		},
		onLoad() {
			// this.isGetLocation()
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.test {
		width: 0;
	}
</style>
