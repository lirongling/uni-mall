<template>
	<view class="container">
		<view class="content-item flex a-center f-column" v-for="(item,index) in topicList" :key="index" @click="goDetails(item.id,item.title)">
			<image lazy-load="true" style="height: auto;" :src="item.scene_pic_url" mode="widthFix"></image>
			<view class="title">
				{{item.title}}
			</view>
			<view class="subtitle">
				{{item.subtitle}}
			</view>
			<view class="price">
				{{item.price_info}}元起
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		
		data() {
			return {
				page: 1,
				topicList: []
			}
		},
		methods: {
			// 获取专题数据
			getTopic() {
				this.$api.getTopic(this.page).then(res => {
					if (res.status === 200) {
						if(res.data.data.length>0){
							this.topicList =this.topicList.concat(res.data.data) 
							this.page++
						}else{
							uni.showToast({
								title:"暂无更多数据",
								icon:"none"
							})
						}
						
					}
				}).catch(err => {
					console.log(err)
				})
			},
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
			this.getTopic()
		},
		onReachBottom(){
			this.getTopic()
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
.content-item{
	width: 100%;
	font-size: 30rpx;
	image{
		width: 100%;
	}
	.title{
		margin-top: 30rpx;
	}
	.subtitle{
		margin: 10rpx 0;
		color: #808080;
		font-size: 28rpx;
	}
	.price{
		color: #BE351C;
		margin-bottom: 30rpx;
	}
}
</style>
