<template>
	<view>
		<view class="ico">
			<view>
				<image lazy-load="true" style="height: auto;" src="../../static/images/shop.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="prompt">
			<span v-if="loginMsg===null"> 请先登录哟~~</span>
			<span v-else>你的购物车还是空空的哟</span>

		</view>
		<view class="login">
			<button type="default" @click="goLogin">
				<span v-if="loginMsg===null">立即登录</span>
				<span v-else>立即购物</span>
			</button>
			<!-- <van-button round plain hairline type="primary" @click="goLogin">
				
			</van-button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			shopList: {
				type: Array,
				default: () => []
			},
			loginMsg: {
				type: Object,
				default: () => {}
			}
		},
		components: {},
		methods: {
			goLogin() {
				if (this.loginMsg === null) {
					uni.switchTab({
						url: "/pages/my/my"
					})
				} else {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			}
		},
		mounted() {},
		watch: {},
		computed: {}
	};
</script>

<style scoped lang='scss'>
	.ico {
		width: 150px;
		height: 150px;
		background: #f5f5f5;
		margin: 0 auto;
		margin-top: 80px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ico image {
		width: 90px;
	}

	.prompt {
		margin-top: 20px;
		text-align: center;
		font-size: 15px;
	}

	.login {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	button {
		width: 32vw;
		height: 10.667vw;
		color: #07c160;
		border-radius: 266.4vw;
		padding: 0 4vw;
		font-size: 3.733vw;
		background-color: #fff;
		border: 1px solid #07c160;
	}
</style>
