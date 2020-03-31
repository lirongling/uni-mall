<template>
	<view class="container" v-if="navData">
		<view class="nav">
			<xyzTab :tabList="navData" @tabSelect="tabSelect"></xyzTab>
		</view>
		<view class="content-title flex a-center f-column">
			<view class="name">
				{{currentNav.name}}
			</view>
			<view class="front_desc">
				{{currentNav.front_desc}}
			</view>
		</view>
		<view class="content" v-if="currentList.length>0">
			<good :goodList="currentList"></good>
		</view>
		<view class="no-content" v-else>
			暂无数据~~~
		</view>
	</view>
</template>

<script>
	import xyzTab from "../../components/xyz-tab/xyz-tab.vue"
	import good from "../../components/index/good.vue"
	export default {
		name: "",
		components: {
			xyzTab,
			good
		},
		props: {},
		data() {
			return {
				navData: [],
				currentNav:{},
				currentList:[],
				tabIdx:0
			}
		},
		methods: {
			getCategoryNav(id) {
				this.$api.getCategoryNav(id).then(res => {
					if (res.status === 200) {
						this.navData = res.data.navData
						this.currentNav = res.data.currentNav
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getCategoryId(id) {
				this.$api.getCategoryId(id).then(res => {
					if(res.status===200){
						this.currentList=res.data.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 切换tab
			tabSelect(e) {
				this.currentNav=e.item
				this.getCategoryId(this.currentNav.id)
			}
		},
		mounted() {

		},
		onLoad(option) {
			this.getCategoryNav(option.id)
			this.getCategoryId(option.id)
			uni.setNavigationBarTitle({
				title: option.title
			});
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
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
	padding-top: 85rpx;
	.nav{
		background-color: white;
		position: fixed;
		top: 88rpx;
		left: 0;
		width: 100%;
		z-index: 9;
	}
	.content-title{
		margin: 20rpx 10rpx;
		background-color: white;
		font-size: 30rpx;
		border-radius: 10rpx;
		.name{
			margin-top: 20rpx;
		}
		.front_desc{
			font-size: 28rpx;
			color: #808080;
			margin: 10rpx;
		}
	}
	.no-content{
		margin-top: 100rpx;
		font-size: 30rpx;
		color: #808080;
		text-align: center;
	}
}
</style>
