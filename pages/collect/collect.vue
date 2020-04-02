<template>
	<view class="container" v-if="collection">
		<view class="no-collection" v-if="collection.length===0">
			<view class="title">你的收藏还是空空的~~</view>
			<view class="login">
				<button type="default" @click="goShop">
					立即购物
				</button>
			</view>
		</view>
		<view class="content">
			<collectItem :collectList="collection" :type="1"></collectItem>
		</view>
	</view>
</template>

<script>
	import collectItem from "../../components/collect/collectItem.vue"
	export default {
		name: "",
		components: {
			collectItem,
		},
		props: {},
		data() {
			return {
				collection: null
			}
		},
		methods: {
			goShop() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 查看收藏
			getCollect(id) {
				this.$api.getCollect(id).then(res => {
					if (res.status === 200) {
						this.collection = res.data.collectGoodsList
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted() {

		},
		onLoad() {
			this.getCollect(this.$store.state.openId)
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
		.no-collection {
			margin-top: 240rpx;
			text-align: center;

			.title {
				font-size: 30rpx;
				color: rgb(99, 99, 99);
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
		}
	}
</style>
