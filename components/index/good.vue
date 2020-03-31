<template>
	<view class="conainerssss flex a-center f-wrap j-between" v-if="goodList">
		<view class="contentsss " v-for="(item,index) in goodList" :key="index" @click="details(item.id)">
			<view class="content-item flex a-center f-column">
				<image lazy-load="true" style="height: auto;" :src="item.list_pic_url" mode="widthFix"></image>
				<view class="name ellipsis">
					{{item.name}}
				</view>
				<view class="price">
					￥{{item.retail_price}}
				</view>
			</view>
		</view>
		<!-- #ifdef  MP-WEIXIN -->
		<view class="contentsss" v-for="(items,indexs) in (2-goodList.length%2)" v-if="goodList.length%2 > 0" :key="indexs"></view>
		<!-- #endif -->
		<!-- #ifndef  MP-WEIXIN -->
		<view class="contentsss" v-for="(items,indexs) in (2-goodList.length%2)" v-if="goodList.length%2 > 0" :key="'for'+indexs"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			goodList: {
				type: Array,
				default: () => []
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
	.conainerssss {
		width: 100%;
		justify-content: space-between !important;
	}

	.contentsss {
		width: 47%;
		margin: 15rpx auto;
		background: white;
		border-radius: 10rpx;

		.content-item {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
		}

		image {
			width: 100%;
			// height: 50vw;
		}

		.name {
			margin-top: 30rpx;
			width: 100%;
			margin-bottom: 6rpx;
		}

		.price {
			font-size: 28rpx;
			color: #BE351C;
		}
	}
</style>
