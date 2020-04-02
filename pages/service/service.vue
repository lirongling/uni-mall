<template>
	<view class="container">
		<view class="content">
			<view class="message">
				<image lazy-load="true" style="height: auto;" src="../../static/images/message.png" mode="widthFix"></image>
			</view>
			<view class="textarea flex f-column">
				<view class="input">
					<textarea @input="input" :maxlength="200" placeholder="请填写您的意见和反馈" auto-height />
					</view>
				<view class="text ">
					{{inputNum}}/200
				</view>
				</view>
				<!-- 联系方式 -->
				<view class="concat flex a-center">
					<view class="label">
						联系方式:
					</view>
					<input placeholder-class="placeholder" placeholder="邮箱/手机号/微信号" />
				</view>
		</view>
		<view class="content-bottom">
			<view class="btn">
				<button class="btn-danger" >提交</button>
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
				inputNum:0
			}
		},
		methods: {
input(e){
	this.inputNum=e.detail.cursor
}
		},
		mounted() {

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
			padding: 30rpx;

			.message {
				padding-top: 30rpx;
	border-bottom: 1rpx solid #ebedf0;
				 image {
					width: 50rpx;
					height: 50rpx;
				}

			}
			.textarea{
				padding: 20rpx 0;
				min-height: 200rpx;
				border-bottom: 1rpx solid #ebedf0;
				.input{
					flex:1
				}
				.text{
					text-align: right;
					font-size: 30rpx;
					margin-top: 20rpx;
				}
			}
			.concat{
					padding: 30rpx 0;
						border-bottom: 1rpx solid #ebedf0;
						font-size: 30rpx;
						.label{
							margin-right: 20rpx;
						}
						.placeholder{
							font-size: 30rpx;
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
