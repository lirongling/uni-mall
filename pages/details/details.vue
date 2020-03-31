<template>
	<view class="container" v-if="goodDetail.gallery">
		<!-- banner区域 -->
		<view class="banner ">
			<swiper class="swiper" :circular="true" :indicator-dots="true" indicator-color="rgba(0,0,0,.3)" :autoplay="true"
			 interval="5000" duration="1000">
				<swiper-item class="image-item" v-for="(item,index) in goodDetail.gallery" :key="index">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 说明 -->
		<view class="explain flex a-center j-around ">
			<view class="explain-item flex a-center" v-for="(item,index) in explainList" :key="index">
				{{item}}
			</view>
		</view>
		<!-- 商品信息 -->
		<info :info="goodDetail.info" :attribute="goodDetail.attribute"></info>
		<view class="goods_desc" v-if="goodDetail.info.goods_desc">
			<jyf-parser :html="goodDetail.info.goods_desc"></jyf-parser>
		</view>
		<view class="more">
			<view class="title flex a-center">
				<view class="split"></view>
				<view class="text">
					大家都在看
				</view>
				<view class="split"></view>
			</view>
			<good :goodList="goodDetail.productList"></good>
		</view>
		<!-- 底部导航 -->
		<view class="nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
		<!-- 商品选择弹框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="choose">
				<view class="top flex j-between">
					<view class="details flex ">
						<view class="img">
							<image lazy-load="true" style="height: auto;" :src="goodDetail.info.primary_pic_url" mode="widthFix"></image>
						</view>
						<view class="product">
							<view class="price flex a-end">
								<view class="title">
									￥
								</view>
								{{goodDetail.info.retail_price}}
							</view>
							<view class="name">
								{{goodDetail.info.name}}
							</view>
							<view class="goods_brief">
								{{goodDetail.info.goods_brief}}
							</view>
						</view>
					</view>
					<!-- 关闭 -->
					<view class="close" @click="close">
						<image src="../../static/images/close.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="amount flex a-center j-between ">
					<view class="title flex a-center">
						购买数量
						<view class="desc">
							(限购三件)
						</view>
					</view>
					<view>
						<uni-number-box :min="1" :max="3" @change="bindChange"></uni-number-box>
					</view>
				</view>
				<view class="btn flex">
					<button class="btn-left">加入购物车</button>
					<button class="btn-right">立即购买</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import info from "../../components/details/info.vue"
	import parser from "@/components/jyf-parser/jyf-parser";
	import good from "../../components/index/good.vue"
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		name: "",
		components: {
			info,
			"jyf-parser": parser,
			good,
			uniGoodsNav,
			uniPopup,
			uniNumberBox,
		},
		props: {},
		data() {
			return {
				goodDetail: [],
				explainList: [
					"30天无忧退货",
					"48小时快速退款",
					"满88包邮",
				],
				number: 1,
				options: [{
					icon: '../../static/images/collect.png',
					text: '收藏'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '店铺'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {},
		methods: {
			// 获取商品数据
			goodDetails(id, openId) {
				this.$api.goodDetails(id, openId).then(res => {
					if (res.status === 200) {
						this.goodDetail = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})

			},
			// 点击商品导航按钮
			buttonClick(e) {
				if (e.index === 1) {
					this.$refs.popup.open()
				}
				console.log(e)
				this.options[2].info++
			},
			// 改变商品数量
			bindChange(e) {
				this.number = e
			},
			// 关闭pop弹框
			close() {
				this.$refs.popup.close()
			}
		},
		onLoad(option) {
			this.goodDetails(option.id)
		}

		,

		filters: {}

		,
		computed: {}

		,
		watch: {}

		,
		directives: {}
	}
</script>
<style scoped lang="scss">
	.container {
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;

		.banner {
			// margin-top: 100rpx;
			overflow: hidden;

			.swiper {
				width: 100vw;
				height: 100vw;
			}

			.image-item {
				width: 100%;
				overflow: hidden;
				height: 100%;
			}

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.explain {
			.explain-item {
				height: 80rpx;
				font-size: 28rpx;
			}

			.explain-item::before {
				content: "·";
				color: #BE351C;
				font-size: 60rpx;
				margin-right: 5rpx;
				line-height: 80rpx;

			}
		}

		.more {
			.title {
				width: 400rpx;
				margin: 20rpx auto;
				font-size: 30rpx;

				.split {
					flex: 1;
					height: 2rpx;
					background: #ebedf0;
				}

				.text {
					margin: 0 10rpx;
				}
			}
		}

		.nav {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
		}

		.choose {
			background: white;
			padding: 20rpx;
			border-radius: 20rpx 20rpx 0 0;

			.top {
				.details {
					.img {
						image {
							width: 160rpx;
							border-radius: 10rpx;
						}
					}

					.product {
						margin-left: 10rpx;

						.price {
							color: #BE351C;
							font-size: 34rpx;
							font-weight: 550;

							.title {
								font-size: 24rpx;
							}
						}

						.name {
							margin-top: 10rpx;
							font-size: 29rpx;
						}

						.goods_brief {
							margin-top: 10rpx;
							font-size: 26rpx;
							color: #808080;
						}
					}
				}

				.close {
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}

			.amount {
				margin: 20rpx;
				padding: 20rpx 0;
				border-top: 1rpx rgb(226, 223, 223) solid;
				border-bottom: 1rpx rgb(226, 223, 223) solid;

				.title {
					font-size: 30rpx;
					color: #313131;

					.desc {
						font-size: 26rpx;
						color: #808080;
					}
				}
			}

			.btn {
				margin-top: 120rpx;

				button {
					flex: 1;
					height: 80rpx;
					font-weight: 500;
					font-size: 28rpx;
					line-height: 80rpx;
					color: white;
					border-radius: 0;
				}

				.btn-left {
					background: linear-gradient(to right, #ffd01e, #ff8917);
					border-top-left-radius: 20px;
					border-bottom-left-radius: 20px;
				}
				.btn-left:active{
					background: linear-gradient(to right, #ffc618, #ff8811);
				}
				.btn-right:active{
					background: linear-gradient(to right, #ff512e, #ee0616);
				}

				.btn-right {
					background: linear-gradient(to right, #ff6034, #ee0a24);
					border-top-right-radius: 20px;
					border-bottom-right-radius: 20px;
				}

				// button {
				// 	border-radius: 50rpx;
				// 	background: linear-gradient(to right, #ff6034, #ee0a24);
				// 	color: white;
				// 	// box-shadow: 0 2upx 20upx rgba(0, 0, 0, .2);
				// 	border-color: #eee;
				// }

				// button:active {
				// 	background: #7d7d7d;
				// 	border-color: #f0f0f0;
				// 	color: #f4f4f4;
				// }
			}
		}
	}
</style>
