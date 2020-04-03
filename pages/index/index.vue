<template>
	<view class="containerss">
		<view class="top flex a-center j-between">
			<view class="load" @click="goMap">
				<view class="ellipsis" v-if="addressInfo.address_component">
					{{addressInfo.address_component.street_number}}
				</view>
				<view v-else>
					定位中
				</view>
			</view>
			<view class="searchss" @click="search">
				<uni-search-bar :initialVal="initialVal" :radius="100"></uni-search-bar>
			</view>
		</view>
		<!-- <load></load> -->
		<view class="content" v-if="homeData.banner">
			<wheel :bannerList="homeData.banner"></wheel>
			<channel :channelList="homeData.channel"></channel>
			<view class="brand">
				<view class="title">
					品牌制造商直供
				</view>
				<brand :brandList="homeData.brandList"></brand>
			</view>
			<view class="new">
				<view class="title flex a-center j-center f-column" @click="goAllGoods('isNew')">
					<view>
						新品首发
					</view>
					<view class="more flex a-center j-center">
						查看更多
					</view>
				</view>
				<view class="content">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
						<view class="content-item" v-for="(item,index) in homeData.newGoods" :key="index">
							<newGoods :goodItem="item"></newGoods>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="new">
				<view class="title titles flex a-center j-center f-column" @click="goAllGoods('isHot')">
					<view>
						人气推荐·好物精选
					</view>
					<view class="more mores flex a-center j-center">
						查看更多
					</view>
				</view>
				<view class="content">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
						<view class="content-item" v-for="(item,index) in homeData.hotGoods" :key="index">
							<newGoods :goodItem="item"></newGoods>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="new">
				<view class="nav">
					专题精选
				</view>
				<view class="content">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
						<view class="content-item" v-for="(item,index) in homeData.topicList" :key="index">
							<topic :topicData="item"></topic>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="new news" v-for="(item,index) in homeData.newCategoryList" :key="index">
				<view class="nav">
					{{item.name}}
				</view>
				<view class="content flex a-center f-wrap">
					<good :goodList="item.goodsList"></good>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import wheel from "../../components/index/wheel.vue"
	import channel from "../../components/index/channel.vue"
	import brand from "../../components/index/brand.vue"
	import newGoods from "../../components/index/newGoods.vue"
	import topic from "../../components/index/topic.vue"
	import good from "../../components/index/good.vue"
	import qqmapsdk from "../../static/js/qqmap-wx-jssdk.js"
	// import load from "../../static/js/load.js"
	import load from "../../components/index/load.vue"
	export default {
		data() {
			return {
				homeData: [],
			}
		},
		components: {
			uniSearchBar,
			wheel,
			channel,
			brand,
			newGoods,
			topic,
			good,
			load
		},
		onLoad() {
			// this.chooseLocation()
			this.getData()

		},
		beforeMount() {

		},
		methods: {
			// 跳转到地图页
			goMap() {
				uni.navigateTo({
					url: "/pages/map/map",
					success: res => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			// 获取首页数据
			getData() {
				uni.showLoading()
				this.$api.getIndex().then(res => {
					uni.hideLoading()
					if (res.status) {
						this.homeData = res.data
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			// 跳转到全部商品 新品 人气
			goAllGoods(type) {
				uni.navigateTo({
					url: `/pages/allGoods/allGoods?type=${type}`
				})
			},
			// 跳转到搜索页
			search() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}

		},
		computed: {
			addressInfo() {
				return this.$store.state.addressInfo
			},
			initialVal() {
				if(this.$store.state.indexaction.defaultKeyword){
					return this.$store.state.indexaction.defaultKeyword.keyword
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.containerss {
		position: relative;
		padding-top: 72rpx;

		.top {
			position: fixed;
			top: 0;
			width: 100%;
			left: 0;
			z-index: 9;
			background: white;

			.load {
				width: 150rpx;
				padding: 0 5rpx;
				text-align: center;
				font-size: 30rpx;
			}

			.searchss {
				flex: 1;
				background: #007AFF;
			}
		}

		.content {
			margin: 0;

			.brand {
				.title {
					text-align: center;
					font-size: 31rpx;
					margin: 20rpx auto;
				}
			}

			.news {
				background: #EEEEEE;
			}

			.new {
				color: #808080;

				.title {
					height: 220rpx;
					background: #F1F7FC;
					margin: 10rpx auto;
					font-size: 30rpx;

					.more {
						width: 200rpx;
						height: 70rpx;
						border-radius: 10rpx;
						font-size: 26rpx;
						background: #e0f0fc;
						margin-top: 20rpx;
					}

					.mores {
						background: #fcebbe;
					}

					.more:active {
						background: #d7ecfc;
					}

					.mores:active {
						background: #fcefc7;
					}
				}

				.titles {
					background: #FCF4DD;
				}

				.nav {
					padding: 30rpx 0;
					font-size: 30rpx;
					text-align: center;
					color: #000000;
				}

				.content {
					width: 100%;

					.scroll-view_H {
						width: 100%;

						overflow: hidden;
						/* padding-right: 20rpx; */
						background: #fff;
						white-space: nowrap;
						/* border: 1px solid red; */
					}

					.scroll-view_H scroll-view {
						height: 100%;
						width: auto;
						overflow: hidden;

					}

					/*隐藏滚动条*/

					::-webkit-scrollbar {

						width: 0;

						height: 0;

						color: transparent;

					}

					.content-item {
						display: inline-block;
					}

					.content-items {
						width: 50%;
						box-sizing: border-box;
						padding: 20rpx;

					}
				}
			}
		}
	}
</style>
