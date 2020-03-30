<template>
	<view class="container flex a-center j-around">
		<view class="item flex a-center f-column" v-for="(item,index) in channelList" :key="index" @click="goCategory(item.url)">
			<image lazy-load="true" style="height: auto;" :src="item.icon_url" mode="widthFix"></image>
			<view class="name">
				{{item.name}}
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
			channelList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转到分类页
			goCategory(url) {
				this.$store.state.categoryId=url.split('=')[1]
				uni.switchTab({
					url:`../..${url}`
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
	.container {
		width: 100vw;
		overflow: hidden;
	}

	.item {
		width: 100rpx;
		margin: 30rpx auto;

		image {
			width: 80%;
		}

		.name {
			font-size: 30rpx;
			margin-top: 10rpx;
		}
	}
</style>
