<template>
	<view class="content" @click="goDetails(topicData.id,topicData.title)">
		<image :src="topicData.item_pic_url" mode="aspectFill"></image>
		<view class="name flex a-center">
			{{topicData.title}}
			<view class="price">
				阅读：{{topicData.read_count}}
			</view>
		</view>
		<view class="subtitle ellipsis">
			{{topicData.subtitle}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			topicData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 去专题详情页
			goDetails(id,title){
				uni.navigateTo({
					url:`/pages/specialDetails/specialDetails?id=${id}&title=${title}`
				})
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
	.content {
		padding: 30rpx;
		width: 500rpx;
		font-size: 28rpx;

		image {
			width: 500rpx;
			height: 279rpx;
			border-radius: 10rpx;
		}

		.name {
			font-size: 30rpx;
			color: #000000;
			margin: 10rpx auto;

			.price {
				margin-left: 10rpx;
				font-size: 28rpx;
				color: #BE351C;
			}
		}

		.subtitle {
			width: 500rpx;
		}
	}
</style>
