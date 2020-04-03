<template>
	<view class="container">
		<view class="content">
			<view class="content-item flex a-center j-between" v-for="(item,index) in dataList" :key="index" @click="details(item.id)">
				<view class="left flex a-center">
					<image lazy-load="true" style="height: auto;" :src="item.list_pic_url" mode="widthFix"></image>
					<view class="info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="other flex a-center">
							<view class="price">
								￥{{item.retail_price}}
							</view>
							<view class="time" v-if="item.add_time">
								{{item.add_time}}
							</view>
						</view>
					</view>
				</view>
				<view class="right" @click.stop="del(item,index)">
					<image lazy-load="true" style="height: auto;" src="../../static/images/close.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			collectList: {
				type: Array,
				default: () => []
			},
			type: {
				type: Number,
				default: 1,

			},
			historyIdx: {
				type: Number,
				default: null
			}
		},
		data() {
			return {
				dataList: [],
				historyShops: null,
			}
		},
		methods: {
			// 删除单个
			del(item, index) {
				let _this = this
				let content = "是否确认取消当前收藏？"
				if (_this.type === 2) {
					content = "是否确认删除当前搜索历史？"
				}
				uni.showModal({
					title: '提醒',
					content: content,
					success: function(res) {
						if (res.confirm) {
							if (_this.type === 1) {
								let a = {
									goodsId: item.id,
									openId: _this.$store.state.openId
								}
								_this.addcollect(a, index)
							} else {
								_this.delHistory(index)
							}
						} else if (res.cancel) {

						}
					}
				});
			},
			// 删除收藏
			addcollect(a, index) {
				this.$api.addcollect(a).then(res => {
					if (res.status === 200) {
						this.toast(index)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除历史浏览
			delHistory(index) {
				if (!this.historyShops) {
					this.historyShops = uni.getStorageSync("historyShops")
				}
				this.historyShops[this.historyIdx].goods.splice(index, 1)
				uni.setStorageSync("historyShops", this.historyShops)
				this.toast(index)
			},
			toast(index) {
				this.dataList.splice(index, 1)
				uni.showToast({
					title: "删除成功",
					icon: "none"
				})
			},
			getData() {
				this.dataList = this.collectList
				// console.log(this.dataList)
				if (this.type === 2) {
					this.dataList.map(item => {
						item.add_time = this.distanceTime(item.add_time)
					})
				}
			},
			// 计算时间
			distanceTime(oldTime) {
				let newTime = new Date();
				//  let time2 = this.$dayjs(newTime).format('YYYY-MM-DD hh:mm:ss')
				// valueOf是转换成时间戳
				let sputTme =
					this.$dayjs(newTime).valueOf() - this.$dayjs(oldTime).valueOf();
				let mounth = sputTme / (30 * 24 * 60 * 60 * 1000);
				let time = sputTme / (24 * 60 * 60 * 1000);
				let hour = sputTme / (60 * 60 * 1000);
				let minu = sputTme / (60 * 1000);
				if (mounth > 1) {
					return parseInt(mounth + 1) + "个月前";
				} else if (mounth < 1 && time >= 1) {
					return parseInt(time) + "天前";
				} else if (time < 1 && hour >= 1) {
					return parseInt(hour) + "小时前";
				} else if (hour < 1) {
					return parseInt(minu) + "分钟前";
				}
			},
			// 去详情页
			details(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				});
			}
		},
		mounted() {
			this.getData()
		},
		onLoad() {

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
	.container {
		.content {
			padding-top: 20rpx;

			.content-item {
				width: 90%;
				margin: 0 auto;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #ebedf0;
				// margin-top: -1rpx;

				.left {
					flex: 1;

					image {
						width: 160rpx;
						height: 160rpx;
					}

					.info {
						margin-left: 10rpx;
						font-size: 30rpx;
						flex: 1;

						.name {
							color: #443f3b;
						}

						.other {
							margin-top: 20rpx;
							color: #6b6969;

							.price {
								color: #f53a3a;
								margin-right: 40rpx;
							}
						}
					}
				}

				.right {
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>
