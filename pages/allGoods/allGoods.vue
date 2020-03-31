<template>
	<view class="container">
		<view class="bg">
			<image src="../../static/images/moreGoodsBg.jpg" mode="widthFix"></image>
		</view>
		<view class="title flex a-center j-around">
			<view class="title-item" :class="{'active':active===0}" @click="changeTitle(0)">
				综合
			</view>
			<view class="title-item flex a-center" :class="{'active':active===1}" @click="getGoodsSore">
				<view class="flex a-center">
					排序
				</view>
				<view class="sore flex f-column a-center j-center">
					<image src="../../static/images/liter-action.png" mode="widthFix" v-if="active===1&&order==='desc'"></image>
					<image src="../../static/images/litre.png" mode="widthFix" v-else></image>
					<image src="../../static/images/drop-action.png" mode="widthFix" v-if="active===1&&order==='asc'"></image>
					<image src="../../static/images/drop.png" mode="widthFix" v-else></image>
				</view>
			</view>
			<view class="title-item" :class="{'active':active===2}" @click="changeTitle(2)">
				分类
			</view>
		</view>
		<view class="content" v-if="goodsList.length>0">
			<good :goodList="goodsList"></good>
		</view>

	</view>
</template>

<script>
	import good from "../../components/index/good.vue"
	export default {
		name: "",
		components: {
			good,
		},
		props: {},
		data() {
			return {
				goodsList: [],
				active: 0,
				type:"",
				order:"asc",
				originalData:[]
			}
		},
		methods: {
			// 查看全部:默认综合   type:isNew新品 isHot人气推荐
			getGoodsType(type) {
				this.$api.getGoodsType(type).then(res => {
					if (res.status === 200) {
						this.goodsList = res.data.data
						this.originalData = res.data.data
						// let index=Math.floor((Math.random()*res.data.data.length))
						// this.img=res.data.data[index].primary_pic_url
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 全部升序or排列 order:asc升序 desc降序
			getGoodsSore(){
				this.active=1
				this.$api.getGoodsSore(this.type,this.order).then(res=>{
					if (res.status === 200) {
						this.goodsList = res.data.data
						if(this.order==="desc"){
							this.order='asc'
						}else{
							this.order="desc"
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 切换到综合或分类
			changeTitle(index){
				this.active=index
				this.goodsList=this.originalData
			}
			
		},
		mounted() {

		},
		onLoad(option) {
			this.getGoodsType(option.type)
			this.type=option.type
			let title = ""
			if (option.type === "isNew") {
				title = "新品首发"
			} else {
				title = "人气推荐"
			}
			uni.setNavigationBarTitle({
				title: title
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
	.container {
		background-color: #F4F4F4;
		min-height: 100vh;

		.bg {
			image {
				width: 100%;
			}
		}

		.active {
			color: #BE351C;
		}

		.title {
			height: 100rpx;
			background-color: white;
			z-index: 3;
			margin-top: -10rpx;
			font-size: 30rpx;

			.sore {
				margin-left: 10rpx;

				image {
					width: 30rpx;
				}
			}
		}
	}
</style>
