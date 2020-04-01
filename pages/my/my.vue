<template>
	<view class="container">
		<view class="top" @click="jump">
			<view class="user flex a-center j-between">
				<view class="left flex a-center ">
					<image v-if="userInfos.avatarUrl" lazy-load="true" style="height: auto;" :src="userInfos.avatarUrl"
					 mode="widthFix"></image>
					<image v-else lazy-load="true" style="height: auto;" src="https://i.loli.net/2017/08/21/599a521472424.jpg" mode="widthFix"></image>
					<view class="name" v-if="userInfos.nickName">
						{{userInfos.nickName}}
					</view>
					<view class="name" v-else>
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
			<!-- #ifdef  MP-WEIXIN -->
			<view class="content-item" v-for="(items,indexs) in (3-navList.length%3)" v-if="navList.length%3 > 0" :key="indexs"></view>
			<!-- #endif -->
			<!-- #ifndef  MP-WEIXIN -->
			<view class="content-item" v-for="(items,indexs) in (3-navList.length%3)" v-if="navList.length%3 > 0" :key="'for'+indexs"></view>
			<!-- #endif -->
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
					<!-- #ifdef APP-PLUS -->
					<view class="pop-item" @click="otherLogin('weixin')">
						<image src="../../static/images/weChat.png" mode="widthFix"></image>
					</view>
					<view class="pop-item" @click="otherLogin('qq')">
						<image src="../../static/images/qq.png" mode="widthFix"></image>
					</view>
					<view class="pop-item" @click="otherLogin('sinaweibo')">
						<image src="../../static/images/weibo.png" mode="widthFix"></image>
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
				],
				userInfo: {
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9MicRvz1HV174YibIpRBqZuDqD7EAHibcc1sLnwBjGr9Xs3TnRjKxgUbZicc4TdtDdyhjem5fJsn7hfaCnibKeFdlAA/132",
					city: "Chengdu",
					country: "China",
					gender: 1,
					language: "zh_CN",
					nickName: "南风微微吹~~",
					province: "Sichuan",
				},
				openId: '033EZoHg2khntG0r6mGg2V7qHg2EZoHD'
			};
		},
		components: {
			uniPopup
		},
		computed:{
			userInfos(){
				return this.$store.state.userInfo
			}
		},
		methods: {
			jump() {
				if (this.$store.state.openId) {

				} else {
					// #ifndef H5
					this.$refs.popup.open()
					// #endif
					// #ifdef H5
					this.$store.state.openId = this.openId
					this.$store.state.userInfo = this.userInfo
					uni.setStorageSync("openId", this.openId)
					uni.setStorageSync("userInfo", this.userInfo)
					uni.showToast({
						title: "登录成功"
					})
					// #endif
				}
			},
			//#ifdef MP-WEIXIN
			// 微信小程序登录
			weChatLogin() {
				let _this = this;
				this.$refs.popup.close()
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						uni.login({
							success: function(res) {
								uni.showToast({
									title: "登录成功"
								})
								_this.$store.state.openId = res.code
								_this.$store.state.userInfo = infoRes.userInfo
								uni.setStorageSync("openId", res.code)
								uni.setStorageSync("userInfo", infoRes.userInfo)
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
			//#endif
			//#ifdef APP-PLUS
			otherLogin(e) {
				var self = this;
				this.$refs.popup.close()
				uni.login({
					provider: e,
					success: (res) => {
						uni.getUserInfo({
							provider: e,
							success: function(infoRes) {
								_this.$store.state.userInfo = infoRes.userInfo
								_this.$store.state.openId = infoRes.userInfo.openId
								uni.showToast({
									title: "登录成功"
								})
								uni.setStorageSync("openId", infoRes.userInfo.openId)
								uni.setStorageSync("userInfo", infoRes.userInfo)
								// self.otherLogins(e, infoRes.userInfo)
								// let formdata = {
								// 	nickName: infoRes.userInfo.nickName,
								// 	gender: infoRes.userInfo.gender,
								// 	openId: infoRes.userInfo.openId,
								// 	unionId: infoRes.userInfo.unionId
								// };
								// self.$go.post("/wxlogin", formdata).then(res => {});
							}
						})
					},
					fail: (err) => {}
				});

			},
			//#endif
		},

	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 260rpx;
		background: #BE351C;
		position: relative;

		.user {
			position: absolute;
			bottom: 30rpx;
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
		border-radius: 20rpx 20rpx 0 0;

		.title {
			text-align: center;
			font-size: 30rpx;
			margin: 30rpx auto;
		}

		.pop-content {
			width: 100%;
			margin: 0 auto;

			.pop-item {
				margin: 0 20rpx;

				image {
					width: 100rpx;
				}
			}
		}
	}
</style>
