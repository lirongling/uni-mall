<template>
	<view class="content flex a-center f-column" @click="details(goodItem.id)">
		<image :src="goodItem.primary_pic_url" mode="widthFix" v-if="goodItem.primary_pic_url"></image>
		<image :src="goodItem.list_pic_url" mode="widthFix" v-else></image>
		<view class="name ellipsis">
			{{goodItem.name}}
		</view>
		<view class="title ellipsis">
			{{goodItem.goods_brief}}
		</view>
		<view class="price">
			￥{{goodItem.retail_price}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			goodItem: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			details(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				});
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
		width: 260rpx;
		font-size: 28rpx;

		image {
			width: 250rpx;
			border-radius: 20rpx;
		}

		.name,
		.title,
		.price {
			width: 100%;
		}

		.name {
			margin-top: 30rpx;
			color: #34333b;
			width: 260rpx;
		}

		.title {
			margin: 10rpx auto;
			width: 260rpx;
		}

		.price {
			color: #BE351C;
			width: 260rpx;

		}
	}
</style>
