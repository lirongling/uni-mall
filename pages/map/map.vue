<template>
	<view class="container flex f-column">
		<view class="search">
			<view class="search-content flex a-center j-between">
				<!-- #ifdef H5 || APP-PLUS -->
				<view class="back flex a-center j-center" @click="back">
					<image src="../../static/images/back.png" mode="widthFix"></image>
				</view>
				<!-- #endif -->
				<view class="input">
					<uni-search-bar @input="input" :radius="100"></uni-search-bar>
				</view>
			</view>
		</view>
		<view class="content" v-if="isShow">
			<view class="contents" v-if="searchSuggestion">
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
			<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		</view>
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
							
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.searchSuggestion = []
				}
			},
			// 返回
			back() {
				uni.switchTab({
					url:"../index/index"
				})
			},
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
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		// box-sizing: border-box;
		padding-top: 102rpx;
		.search {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 999;
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

		.content {
			flex: 1;
			position: relative;

			.contents {
				position: absolute;
				left: 0;
				width: 100%;
				box-sizing: border-box;
				border-radius: 10rpx;
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
		}
	}
</style>
