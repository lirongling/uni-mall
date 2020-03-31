<template>
	<view class="containerssss" v-if="info.name">
		<!-- 介绍 -->
		<view class="introduce flex a-center f-column border-bottom">
			<view class="name">
				{{info.name}}
			</view>
			<view class="goods_brief">
				{{info.goods_brief}}
			</view>
			<view class="price">
				￥{{info.retail_price}}
			</view>
		</view>
		<view class="attribute">
			<view class="title">
				商品参数
			</view>
			<view class="attribute-item flex a-center" v-for="(item,index) in attribute" :key="index">
				<view class="name">
					{{item.name}}
				</view>
				<view class="value ellipsis">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {},
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			attribute: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {}
		},
		methods: {

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
	.containerssss {
		background: #FFFFFF !important;
		height: 100%;
		padding-bottom: 20rpx;

		.introduce {
			font-size: 30rpx;
			padding: 10rpx 0;

			.name {
				margin: 10rpx;
				font-size: 34rpx;
			}

			.goods_brief {
				color: #808080;
			}

			.price {
				margin: 20rpx 0 10rpx 0;
				color: #BE351C;
			}
		}

		.attribute {
			padding: 0 20rpx;


			.title {
				font-size: 33rpx;
				margin: 20rpx auto;
			}

			.attribute-item {
				margin: 20rpx auto;
				padding: 15rpx;
				border-radius: 5rpx;
				background-color: #F4F4F4;
				font-size: 28rpx;
				color: #808080;

				.value {
					margin-left: 10rpx;
					font-size: 32rpx;
					color: #232323;
					flex: 1;
				}
			}
		}
	}
</style>
