<template>
	<view class="container flex a-center f-wrap">
		<view class="item flex a-center" v-for="(item,index) in brandList" :key="index" >
			<image lazy-load="true" style="height: auto;" :src="item.pic_url" mode="widthFix">
			</image>
			<view class="item-content">
				<view class="name">
					{{item.name}}
				</view>
				<view class="price">
					{{item.floor_price}}元起
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
			brandList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {}
		},
		methods: {
			// details(id) {
			// 	uni.navigateTo({
			// 		url: `/pages/details/details?id=${id}`
			// 	});
			// }
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
	.item {
		width: 50%;
		box-sizing: border-box;
		padding: 20rpx;
		margin: 20rpx 0;
		height: 28vw;
		overflow: hidden;
		position: relative;

		image {
			width: 100%;
		}

		.item-content {
			position: absolute;
			left: 35rpx;
			top: 15rpx;
			font-size: 27rpx;

			.name {
				color: #424242;
			}

			.price {
				margin-top: 5rpx;
				color: #808080;
			}
		}
	}
</style>
