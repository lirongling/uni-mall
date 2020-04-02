<template>
	<view class="container" v-if="addressList">
		<view class="address flex a-center j-center f-column" @click="addressEdit" v-if="addressList.length===0">
			<view class="title">
				暂无收获地址~~
			</view>
			<!-- <view class="flex a-center">
				<image src="../../static/images/add.png" mode="widthFix"></image>
				点击新增地址
			</view> -->
		</view>
		<view class="content" v-else>
			<view class="content-item flex a-center j-between" v-for="(item,index) in addressList" :key="index" @click="changeRadio(item,index)">
				<view class="item-left flex a-center">
					<view class="chose">
						<radio color="#ff6034" :checked="checked===index" />
					</view>
					<view class="details">
						<view class="user flex a-center">
							<view class="name">
								{{item.name}}
							</view>
							<view class="phone">
								{{item.mobile}}
							</view>
							<view class="default" v-if="item.is_default===1">
								默认
							</view>
						</view>
						<view class="address-details">
							{{item.address}}{{item.address_detail}}
						</view>
					</view>
				</view>
				<view class="addresss-right" @click.stop="addressEdit(item)">
					<image src="../../static/images/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content-bottom">
			<view class="btn">
				<button class="btn-danger" @click="addressEdit">新增地址</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				addressList: null,
				checked: 0,
				id: null,
				flage:false
			}
		},
		methods: {
			// 跳转到地址编辑页面
			addressEdit(item) {
				if (item.name) {
					uni.navigateTo({
						url: `/pages/addressEdit/addressEdit?address=${JSON.stringify(item)}`
					})
					return
				}
				uni.navigateTo({
					url: `/pages/addressEdit/addressEdit`
				})

			},
			// 获取全部地址
			getAddressList(id) {
				this.$api.getAddressList(id).then(res => {
					if (res.status === 200) {
						this.$store.state.addressList = res.data.data
						this.addressList = res.data.data
						if(this.id){
							this.checked=this.addressList.findIndex(item=>item.id===this.id)
						}else{
							this.checked=this.addressList.findIndex(item=>item.is_default===1)
						}
						// this.address = res.data.data[0]
						// this.address.address = this.address.address.replace(/\s*/g, "")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeRadio(item, index) {
				this.checked = index
				this.$store.state.address = item
				if(this.flage){
					uni.navigateBack({
						delta: 1
					})
				}
			}
		},
		onShow() {
			this.getAddressList(this.$store.state.openId)
		},
		mounted() {

		},
		onLoad(option) {
			if (option.id) {
				this.id = Number(option.id)
				this.flage=true
			}
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
		.address {
			height: 200rpx;
			font-size: 32rpx;

			.title {
				box-sizing: border-box;
				padding-top: 100rpx;
			}

			image {
				width: 40rpx;
				margin-right: 10rpx;
				height: 40rpx;
			}
		}

		.content {
			box-sizing: border-box;
			padding-top: 60rpx;

			.content-item {
				padding: 20rpx;
				margin-bottom: 10rpx;

				.item-left {
					.details {
						margin-left: 10rpx;
						font-size: 32rpx;
						color: #323233;

						.user {
							margin-bottom: 10rpx;

							.name {
								font-size: 33rpx;
								margin-right: 10rpx;
							}

							.default {
								margin-left: 10rpx;
								font-size: 24rpx;
								background-color: #ee0a24;
								border-radius: 20rpx;
								background-color: #ee0a24;
								padding: 0 10rpx;
								color: #FFFFFF;
							}
						}

						.address-details {
							font-size: 30rpx;
						}

					}
				}

				.addresss-right {
					margin-left: 30rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}

		.content-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			background: white;
			width: 100%;

			.btn {
				width: 95%;
				margin: 0 auto;
				// padding: 26rpx 32rpx;
				font-size: 30rpx;
				margin-top: 80rpx;

				button {
					margin: 30rpx auto;
					display: block;
					width: 100%;

					// padding: 0 30rpx;
					box-sizing: border-box;
					height: 88rpx;
					// margin: 0;
					padding: 0;
					font-size: 32rpx;
					line-height: 84rpx;
					text-align: center;
					border-radius: 44rpx;
					cursor: pointer;
					transition: opacity 0.2s;
				}

				.btn-danger {
					color: #fff;
					background-color: #ee0a24;
					border: 2rpx solid #ee0a24;
				}

				.btn-default {
					color: #323233;
					background-color: #fff;
					border: 2rpx solid #ebedf0;
				}
			}
		}
	}
</style>
