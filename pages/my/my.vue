<template>
	<view class="container">
		<view class="top" @click="jump">
			<view class="user flex a-center j-between">
				<view class="left flex a-center ">
					<image lazy-load="true" style="height: auto;" src="https://i.loli.net/2017/08/21/599a521472424.jpg" mode="widthFix"></image>
					<view class="name">
						点击登录
					</view>
				</view>
				<view class="right">
					<image lazy-load="true" style="height: auto;" src="../../static/images/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content flex a-center f-wrap ">
			<view class="content-item flex a-center f-column j-center" v-for="(item,index) in navList" :key="index">
				<image :src="item.icon" mode="widthFix"></image>
				<view class="name">
					{{item.name}}
				</view>
			</view>
			<view class="content-item" v-for="(item,index) in (3-navList.length%3)">

			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="pop">
				<view class="title">
					请选择登录方式
				</view>
				<view class="pop-content flex a-center j-center">
					<!-- #ifdef MP-WEIXIN -->
					<view class="pop-item" @click="weChatLogin">
						<image src="../../static/images/weChat.png" mode="widthFix"></image>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				navList: [{
						icon: "../../static/images/order.png",
						name: "我的订单"
					},
					{
						icon: "../../static/images/ticket.png",
						name: "优惠券"
					},
					{
						icon: "../../static/images/present.png",
						name: "礼品卡"
					},
					{
						icon: "../../static/images/enshrine.png",
						name: "我的收藏"
					},
					{
						icon: "../../static/images/track.png",
						name: "我的足迹"
					},
					{
						icon: "../../static/images/super.png",
						name: "会员福利"
					},
					{
						icon: "../../static/images/address.png",
						name: "地址管理"
					},
					{
						icon: "../../static/images/safety.png",
						name: "账号安全"
					},
					{
						icon: "../../static/images/service.png",
						name: "联系客服"
					},
					{
						icon: "../../static/images/help.png",
						name: "帮助中心"
					},
					{
						icon: "../../static/images/retroaction.png",
						name: "意见反馈"
					},
				]
			};
		},
		components: {
			uniPopup
		},
		methods: {
			jump() {
				if (this.$store.state.openId) {

				} else {
					this.$refs.popup.open()
				}
			},
			// 微信小程序登录
			weChatLogin() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes.userInfo)
						uni.login({
							success: function(res) {
								this.$store.state.openId=res.code
								// 获取code  
								uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
								// console.log(res.code, infoRes.userInfo)
								// _this.weixinLogin(res.code, infoRes.userInfo);
							}
						});


					},
					fail(res) {}
				});
			},
		},

	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 300rpx;
		background: #BE351C;
		position: relative;

		.user {
			position: absolute;
			bottom: 20rpx;
			left: 0;
			width: 100%;

			.left {
				margin-left: 20rpx;

				image {
					width: 150rpx;
					border-radius: 50%;
				}

				.name {
					margin-left: 20rpx;
					font-size: 32rpx;
					color: white;
				}
			}

			.right {
				margin-right: 20rpx;

				image {
					width: 60rpx;
				}
			}
		}
	}

	.content {
		.content-item {
			width: 33.33%;
			box-sizing: border-box;
			height: 220rpx;
			border: 1px solid #ccc;
			border-right: 0 none;
			margin-left: -2px;
			margin-top: -1px;
			border-bottom: 0;
			// border-top: 1rpx solid #808080;
			// border-right: 1rpx solid #808080;
			// margin: -1rpx 0 0 -1rpx;

			image {
				width: 80rpx;
			}

			.name {
				font-size: 30rpx;
				margin-top: 20rpx;
			}
		}
	}

	/* #ifdef H5 */
	.pop {
		padding-bottom: 100rpx;
	}

	/* #endif */


	.pop {
		background: white;
		padding-top: 30rpx;
		z-index: 99;
		padding-bottom: 30rpx;

		.title {
			text-align: center;
			font-size: 30rpx;
			margin: 30rpx auto;
		}

		.pop-content {
			width: 100%;
			margin: 0 auto;

			.pop-item {
				image {
					width: 100rpx;
				}
			}
		}
	}
</style>
