<template>
	<view class="test"></view>
</template>

<script>
	import qqmapsdk from "../../static/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js"
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
			// getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
			// 	var _this = this;
			// 	uni.authorize({
			// 		scope: a,
			// 		success() { //1.1 允许授权
			// 			_this.getLocationInfo();
			// 		},
			// 		fail() { //1.2 拒绝授权
			// 			uni.showModal({
			// 				title: "提示",
			// 				content: "请重新授权获取你的地理位置，否则部分功能将无法使用",
			// 				success: (res) => {
			// 					if (res.confirm) {
			// 						_this.getLocationInfo();
			// 					} else {
			// 						reject("请授权获取你的地理位置，否则部分功能将无法使用！");
			// 						setTimeout(() => {
			// 							_this.isGetLocation()
			// 						}, 3000)
			// 					}
			// 				},
			// 			});

			// 		}
			// 	})
			// },
			// getLocationInfo() { //2. 获取地理位置
			// 	const QQMapWX = new qqmapsdk({
			// 		key: 'LJCBZ-HWJ6D-RMK45-H7VYX-WNBO5-KSBHJ',
			// 		sig: 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R'
			// 	});
			// 	var _this = this;
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success(res) {
			// 			let latitude, longitude;
			// 			latitude = res.latitude.toString();
			// 			longitude = res.longitude.toString();
			// 			// 解析地址
			// 			QQMapWX.reverseGeocoder({
			// 				sig: 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R',
			// 				location: {
			// 					latitude: latitude,
			// 					longitude: longitude
			// 				},
			// 				success: function(res) {
			// 					_this.$store.state.addressInfo = res.result
			// 				},
			// 				fail: function(res) {
			// 					uni.showToast({
			// 						title: '定位失败',
			// 						duration: 2000,
			// 						icon: "none"
			// 					})
			// 					console.log(res);
			// 				},
			// 				complete: function(res) {
			// 					console.log(res);
			// 				}
			// 			})
			// 		}
			// 	});
			// },
			// isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
			// 	var _this = this;
			// 	uni.getSetting({
			// 		success(res) {
			// 			if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
			// 				_this.getAuthorizeInfo()
			// 			} else {
			// 				_this.getLocationInfo()
			// 			}
			// 		}
			// 	});
			// },
			// //  获取用户的地理位置，

			// getLocationFn() {
			// 	console.log('aaas')
			// 	const _this = this
			// 	uni.getLocation({
			// 		type: 'gcj02', // <map> 组件默认为国测局坐标gcj02
			// 		altitude: true,
			// 		success(res) {
			// 			console.log('返回的位置信息', res, _this)
			// 			_this.globalData.userInfo = {
			// 				latitude: res.latitude,
			// 				longitude: res.longitude
			// 			}
			// 		}
			// 	})
			// },
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
					type: 'gcj02', // <map> 组件默认为国测局坐标gcj02
					geocode: true,
					success(res) {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						_this.getLocation(latitude, longitude)
						// //定位权限开启，打开地图
						// uni.chooseLocation({
						// 	success // 成功回调
						// })
					},
					fail(e) {
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
										_this.callbackLocation()
								} else if (res.cancel) {
									uni.showToast({
										title: "未打开位置授权，某些功能将无法使用",
										icon: "none"
									})
									setTimeout(()=>{
										// _this.callbackLocation()
									},3000)
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
			}
		},
		mounted() {
			this.chooseLocation()
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
