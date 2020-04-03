<script>
	import qqmapsdk from "./static/js/qqmap-wx-jssdk.js"
	export default {
		onLaunch: function() {
			this.$store.state.openId = uni.getStorageSync("openId")
			this.$store.state.userInfo = uni.getStorageSync("userInfo")
			if (this.$store.state.openId) {
				this.getCartList(this.$store.state.openId)
			}
			// #ifdef  H5
			var script = document.createElement('script');
			script.src = "https://webapi.amap.com/maps?v=1.4.15&key=e3429d616d5bef5bee89f8eb7b7346ea";
			document.body.appendChild(script);
			// #endif
			// 申请定位权限
			// #ifndef H5
			this.chooseLocation()
			// #endif
			// #ifdef  H5
			let _this = this
			var s = document.createElement('script');
			s.src = "https://webapi.amap.com/maps?v=1.4.15&key=e3429d616d5bef5bee89f8eb7b7346ea";
			var tar = document.querySelector('body');
			tar.appendChild(s);
			s.onload = function(e) {
				AMap.plugin('AMap.CitySearch', function() {
					var citySearch = new AMap.CitySearch()
					citySearch.getLocalCity(function(status, result) {
						if (status === 'complete' && result.info === 'OK') {
							let location = `${result.bounds.xc.lat},${result.bounds.xc.lng}`
							_this.getLocations(location)

						}
					})
				})
			};
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			// 查看购物车
			getCartList(id) {
				this.$api.getCartList(id).then(res => {
					if (res.status === 200 && res.data.data.length > 0) {
						this.$store.state.shoppingNumber = res.data.data.reduce((pre, item) => {
							return pre + item.number
						}, 0)
					}
				}).catch(err => {
					console.log(err)
				})
			},
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
			getLocations(location) {
				this.$api.getLocation(location).then(res => {
					if (res.status === 200) {
						this.$store.state.addressInfo = res.data.result
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// #ifdef  H5
			// #endif
		},
	}
</script>

<style>
	/*每个页面公共css */

	/*隐藏滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.flex {
		display: flex
	}

	.j-star {
		justify-content: flex-start;
	}

	.j-end {
		justify-content: flex-end;
	}

	.j-center {
		justify-content: center;
	}

	.f-column {
		flex-direction: column;
	}

	.a-center {
		align-items: center;
	}

	.a-end {
		align-items: flex-end;
	}

	.f-wrap {
		flex-wrap: wrap;
	}

	.j-between {
		justify-content: space-between;
	}

	.j-around {
		justify-content: space-around;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ellipsiss {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.border {
		border: 1rpx rgb(226, 223, 223) solid;
	}

	.border-bottom {
		border-bottom: 1rpx rgb(226, 223, 223) solid;
	}
</style>
