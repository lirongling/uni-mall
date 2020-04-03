<template>
	<view class="container flex f-column">
		<view class="search" :class="{'active':searchSuggestion.length>0}">
			<view class="search-content flex a-center j-between">
				<!-- #ifdef H5 || APP-PLUS -->
				<!-- 	<cover-view class="back flex a-center j-center" @click="back">
					<image src="../../static/images/back.png" mode="widthFix"></image>
				</cover-view> -->
				<!-- #endif -->
				<view class="input">
					<uni-search-bar @input="input" :radius="100"></uni-search-bar>
				</view>
			</view>
		</view>
		<view class="contents" v-if="searchSuggestion.length>0">

			<view class="content-item border-bottom" v-for="(item,index) in searchSuggestion" :key="index" @click="getLocation(item.location.lat,item.location.lng)">
				<view class="title">
					<!-- <u-parse :content="item.title"></u-parse> -->
					{{item.title}}
				</view>
				<view class="address">
					<!-- <u-parse :content="item.address"></u-parse> -->
					{{item.address}}
				</view>
			</view>
		</view>


			<map v-show="isShow" :latitude="latitude" :longitude="longitude" :markers="covers">

			</map>
	
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import util from "../../static/js/util.js"
	import uParse from "@/components/feng-parse/parse.vue"
	import qqmapsdk from "../../static/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js"
	export default {
		data() {
			return {
				latitude: 39.909,
				longitude: 116.39742,
				location: '39.11457,116.55332',
				isShow: false,
				region: "北京市",
				covers: [{
					id: 1,
					latitude: 39.909,
					longitude: 116.39742
				}],
				searchSuggestion: [],
				keyword: util.keyWord,
				inputText: ""


			}
		},
		components: {
			uniSearchBar,
			uParse,
		},
		onLoad() {
			if (this.$store.state.addressInfo.address_component) {
				this.latitude = this.$store.state.addressInfo.location.lat
				this.longitude = this.$store.state.addressInfo.location.lng
				this.region = this.$store.state.addressInfo.ad_info.city
			}
			this.covers[0].latitude = this.latitude
			this.covers[0].longitude = this.longitude
			this.location = `${this.latitude},${this.longitude}`
			this.isShow = true
		},
		methods: {
			// 搜索框输入
			input(e) {
				if (e.value.trim().length > 0) {
					this.inputText = e.value.trim()
					this.$api.mapSuggestion(e.value, this.region, this.location).then(res => {
						if (res.status === 200) {
							// this.searchSuggestion = res.data.data
							this.searchSuggestion = res.data.data
							console.log(res.data.data)
							// #ifdef APP-PLUS
							setTimeout(() => {
								this.isShow = false
							}, 500)
							// #endif

						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					// #ifdef APP-PLUS
					this.isShow = true
					// #endif
					this.searchSuggestion = []
				}
			},
			// 返回
			back() {
				uni.switchTab({
					url: "../index/index"
				})
			},
			// #ifdef H5
			getLocation(latitude, longitude) {
				let location = `${latitude},${longitude}`
				this.$api.getLocation(location).then(res => {
					if (res.status === 200) {
						this.$store.state.addressInfo = res.data.result
						this.back()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// #endif

			// #ifndef H5
			// 获取位置的具体信息
			//获取定位信息
			getLocation(latitude, longitude) { //2. 获取地理位置
				const QQMapWX = new qqmapsdk({
					key: 'LJCBZ-HWJ6D-RMK45-H7VYX-WNBO5-KSBHJ',
					sig: 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R'
				});
				var _this = this;
				// 解析地址
				QQMapWX.reverseGeocoder({
					sig: 'X0ESh7L0avInLGjVvq8yk8Q7KeBC9R',
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						_this.$store.state.addressInfo = res.result
						_this.back()
					},
					fail: function(res) {
						uni.showToast({
							title: '定位失败',
							duration: 2000,
							icon: "none"
						})

					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	/deep/.container .search .input {
		background: white !important;
	}

	.controls-title {
		width: 100%;
		height: 80rpx;
		background: white;
	}

	.container {
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 100vh;

		/* #endif */
		// margin-top: 44px;
		/* */
		/* */
		.active {
			position: fixed;
			// top: 0;
			left: 0;
		}

		.search {
			/* #ifndef APP-PLUS */
			position: fixed;
			// top: 0;
			left: 0;
			/* #endif */
			width: 100%;
			z-index: 10;
			background: white;

			.search-content {
				width: 100%;
			}

			.back {
				width: 80rpx;

				image {
					width: 50rpx;
				}
			}

			.input {
				flex: 1;
				background: #007AFF;
			}
		}

		.contents {
			position: absolute;
			left: 0;
			top: 100rpx;
			width: 100%;
			box-sizing: border-box;
			// border-radius: 10rpx;
			z-index: 9;
			padding: 15rpx 20rpx;
			background: white;

			.content-item {
				padding: 20rpx;
				font-size: 30rpx;
				color: #808080;
				box-sizing: border-box;

				.title {
					margin-bottom: 10rpx;
					color: #000000;
				}
			}
		}


			map {
				flex: 1;
				width: 100vh;
				/* #ifdef H5 */
				height: calc(100vh - 44px);
				/* #endif */
				/* #ifdef APP-PLUS */
				height: 100%;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				height: 100vh;
				/* #endif */

			}
		
	}
</style>
