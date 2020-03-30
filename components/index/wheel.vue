<template>
	<view class="content">
		<swiper class="swiper" :circular="true" :indicator-dots="true" indicator-color="rgba(0,0,0,.3)" :autoplay="true" interval="5000"
		 duration="1000">
			<swiper-item class="image-item" v-for="(item,index) in bannerList" :key="index">
				<image lazy-load="true" style="height: auto;" :src="item.image_url" class="img" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			bannerList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				// carouselList: []
			}
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
	.content{
		// margin-top: 100rpx;
		overflow: hidden;

	}
	.swiper{
		width: 100vw;
	}
	.image-item {
		width: 100%;
		overflow: hidden;
		
	}

	.img {
		width: 100%;
		
	}
</style>
