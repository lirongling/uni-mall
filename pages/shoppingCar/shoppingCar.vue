<template>
	<view class="container">
		<!-- 说明 -->
		<view class="explain flex a-center j-around ">
			<view class="explain-item flex a-center" v-for="(item,index) in explainList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="content" v-if="shopList.length>0">
			<view class="content-item flex a-center j-between" v-for="(item,index) in shopList" :key="index">
				<view class="left flex a-center">
					<view class="check" @click="changeRadio(item)">
						<radio color="#ff6034" :value="getValue(index)" :checked="item.isChecked" />
					</view>
					<view class="img">
						<image :src="item.list_pic_url" mode="widthFix"></image>
					</view>
					<view class="details ">
						<view class="name">
							{{item.goods_name}}
						</view>
						<view class="details-bottom flex a-center">
							<view class="price flex a-end">
								<view class="price-title">
									￥
								</view>
								{{item.retail_price}}
							</view>
							<view class="number">
								<!-- // 多穿参arguments -->
								<uni-number-box :value="item.number" :index="index" :min="1" :max="1000000" @change="bindChange"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
				<view class="right" v-if="item.isChecked" @click="delShop(item.id,index)">
					<image lazy-load="true" style="height: auto;" src="../../static/images/close.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="content-bottom ">
				<view class="contents flex a-center j-between">
					<view class="bottom-left flex a-center">
						<view class="check" @click="checkAll">
							<radio color="#ff6034" value="checkall" :checked="checkTotal" />
						</view>
						<view class="shop-number">
							全选({{total}})
						</view>
					</view>
					<view class="bottom-right flex a-center">
						<view class="price">
							￥{{totalPrice}}
						</view>
						<!-- 结算 -->
						<view class="balance" :class="{'balances':total>0}">
							<button type="default" @click="goOrder">结算</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<noLogin></noLogin>
		</view>
	</view>
</template>

<script>
	import noLogin from "../../components/shoppingCar/noLogin.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		name: "",
		components: {
			noLogin,
			uniNumberBox,
		},
		props: {},
		data() {
			return {
				explainList: [
					"30天无忧退货",
					"48小时快速退款",
					"满88包邮",
				],
				shopList: [],
				checkTotal: false,

			}
		},
		methods: {
			// 查看购物车
			getCartList() {
				this.$api.getCartList(this.$store.state.openId).then(res => {
					if (res.status === 200 && res.data.data.length > 0) {
						res.data.data.map(item => {
							item.isChecked = false
						})
						this.shopList = res.data.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 动态设置radio的value
			getValue(index) {
				return `radio${index}`
			},
			bindChange(e) {
				if (this.shopList[e.index].number == e.val) {
					return
				}
				this.shopList[e.index].number = Number(e.val)
				let a = {
					number: Number(e.val),
					goodsId: this.shopList[e.index].goods_id,
					openId: this.$store.state.openId
				}
				this.$api.deleteAction(this.shopList[e.index].id).then(res => {
					if (res.status === 200) {
						this.$api.addCart(a).then(res => {
							if (res.status === 200 && res.data.data === "success") {

							}
						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			// 改变单个状态
			changeRadio(item) {
				item.isChecked = !item.isChecked
				this.checkTotal = this.shopList.every(item => item.isChecked)
			},
			// 全选
			checkAll() {
				this.checkTotal = !this.checkTotal
				this.shopList.map(item => item.isChecked = this.checkTotal)
			},
			// 删除购物车商品
			delShop(id, index) {
				let _this = this
				uni.showModal({
					title: '提醒',
					content: '是否确认删除？',
					success: function(res) {
						if (res.confirm) {
							_this.$api.deleteAction(id).then(res => {
								if (res.status === 200 && res.data.data) {
									_this.shopList.splice(index, 1)
									uni.showToast({
										title: "删除成功",
										icon: "none"
									})
								}
							}).catch(err => {

							})
						} else if (res.cancel) {}
					}
				})
			},
			// 去订单页
			goOrder() {
				this.$store.state.orderList = this.shopList.filter(item => item.isChecked)
				console.log(this.$store.state.orderList)
				uni.navigateTo({
					url: "/pages/order/order"
				})
			}
		},
		mounted() {

		},
		onShow() {
			this.getCartList()
		},
		filters: {

		},
		computed: {
			total() {
				this.$store.state.shoppingNumber = this.shopList.reduce((pre, item) => {
					return pre + item.number
				}, 0)
				let a = this.shopList.filter(item => item.isChecked).reduce((pre, item) => {
					return pre + item.number
				}, 0)
				return a
			},
			totalPrice() {
				let a = this.shopList.filter(item => item.isChecked).reduce((pre, item) => {
					return pre + item.number * item.retail_price
				}, 0)
				return a
			}
		},
		watch: {},
		directives: {}
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
		background-color: #F4F4F4;
		/* #ifdef H5 */
		min-height: calc(100vh - 50px);

		/* #endif */
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

		.content {
			padding: 20rpx;
			background: white;
			padding-bottom: 0;

			.content-bottom {
				position: fixed;
				bottom: 0;
				left: 0;
				background: white;
				width: 100%;
				/* #ifdef H5 */
				bottom: 50px;

				/* #endif */
				.contents {
					width: 95%;
					margin: 20rpx auto;

					.shop-number {
						margin-left: 10rpx;
						font-size: 30rpx;
					}

					.bottom-right {
						.price {
							color: #BE351C;
							font-size: 30rpx;
						}

						.balances {
							visibility: visible !important;
						}

						.balance {
							visibility: hidden;
							margin-left: 15rpx;

							button {
								width: 160rpx;
								height: 60rpx;
								font-weight: 500;
								font-size: 28rpx;
								line-height: 60rpx;
								color: white;
								border-radius: 0;
								background-color: #BE351C;
								border-radius: 30rpx;
							}

							button:active {
								background-color: #b02117;
							}
						}
					}
				}
			}

			.content-item {
				border-bottom: 1px solid #e4e4e4;
				margin: 10rpx auto;

				.left {
					.check {
						radio {
							width: 40rpx;
							height: 40rpx;
						}
					}

					.img {
						margin-left: 20rpx;

						image {
							width: 160rpx;
						}
					}

					.details {
						margin-left: 10rpx;

						.name {
							font-size: 28rpx;
						}

						.details-bottom {
							margin-top: 20rpx;

							.price {
								color: #BE351C;
								font-size: 30rpx;

								.price-title {
									font-size: 24rpx;
								}
							}

							.number {
								margin-left: 20rpx;
							}
						}

					}
				}

				.right {
					image {
						width: 50rpx;
					}
				}
			}
		}
	}
</style>
