<template>
	<view class="category">
		<view class="top">
			<uniSearchBar :initialVal="initialVal" :radius="100"></uniSearchBar>
		</view>
		<view class="category-wrapper" v-if="catrgoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" :scroll-into-view="toViews" class="left-wrapper" :scroll-with-animation="true"
			 :scroll-top="left_scroll">
				<view class="left-content">
					<view class="title-content" :id="getId(index)" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
					 :key="title.id" @tap="choose(index,title.id)">{{title.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" :scroll-into-view="toView" scroll-with-animation="true"
			 :scroll-top="right_scroll">
				<view class="right-content" id="right_content">
					<!-- banner区域 -->
					<view class="banner-wrapper">
						<swiper class="swiper-content" :current="select_index" :interval="3000" :circular="true" @change=change>
							<swiper-item class="swiper-item" v-for="imgs in catrgoryList" :key="imgs.id">
								<image class="swiper-img" :src="imgs.banner_url"></image>
							</swiper-item>
						</swiper>
					</view>
					<!-- 产品区 -->
					<view class="product-wrapper">
						<view class="product-title flex a-center">
							<view class="split"></view>
							<view class="text">
								{{current.front_name}}
							</view>
							<view class="split"></view>
						</view>
						<view class="content flex a-center f-wrap">
							<view class="category-item flex a-center f-column" :id="'list'+c_index" v-for="(c_item,c_index) in current.subList"
							 :key="c_item.id" @click="goDetails(c_item.id,c_item.name)">
								<image :src="c_item.wap_banner_url" mode="widthFix"></image>
								<view class="name">
									{{c_item.name}}
								</view>
								<!-- <view class="category-title">{{c_item.name}}</view>
								<view class="category-content">
									<view class="product-item" v-for="(p_item,p_index) in c_item.content" :key="p_item.id">
										<image class="product-img" :src="p_item.thumb"></image>
										<text class="product-title">{{p_item.cname}}</text>
									</view>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				windows_height: 0, //屏幕高度
				swiperList: [],
				catrgoryList: [],
				current: {}, //小分类
				select_index: 0,
				right_height: [], //右侧每个内容的高度集合
				right_scroll: 0, //右侧的滑动值
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				last: 0,
				toView: '', // 配置默认显示view
				toViews: '',
			}
		},
		components: {
			uniSearchBar,
		},
		onLoad() {
			
		},
		onShow() {
			this.init();
			// 获取屏幕可使用窗口高度
			this.windows_height = uni.getSystemInfoSync().windowHeight;

		},
		computed: {
			initialVal() {
				if(this.$store.state.indexaction.defaultKeyword){
					return this.$store.state.indexaction.defaultKeyword.keyword
				}
			}
		},
		methods: {
			// 去搜索页
			// 跳转到搜索页
			search() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			// 动态获取左侧导航栏的id
			getId(index) {
				return `nav-${index}`
			},
			// 去详情页
			goDetails(id, title) {
				uni.navigateTo({
					url: `/pages/categoryDetails/categoryDetails?id=${id}&title=${title}`
				})
			},
			// 获取大分类
			init() {
				this.$api.getCategory().then(res => {
					this.catrgoryList = res.data.categoryList;
					if (this.$store.state.categoryId) {
						this.select_index = this.catrgoryList.findIndex(item => item.id == this.$store.state.categoryId)
						this.toViews = `nav-${this.select_index}`
					}
					this.getCurrentaction(this.catrgoryList[this.select_index].id)
					// this.$nextTick(() => {
					// 	this.getHeightList();
					// })
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取当前小分类
			getCurrentaction(id) {
				this.$api.getCurrentaction(id).then(res => {
					if (res.status === 200) {
						this.current = res.data.data.currentOne
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取高度
			getHeightList() {
				let _this = this;
				// 查询节点信息的对象
				let selectorQuery = uni.createSelectorQuery();
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height; //节点的高度
				});
				selectorQuery.selectAll('.category-item').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
					// console.log(_this.right_height)
				}).exec();
			},
			// 切换大分类
			choose(index, id) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				this.toView = "right_content"
				// 回到颈部
				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 300
				// });


				// 加入防抖
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.timeout = setTimeout(() => {
					this.right_scroll = this.right_height[index] - 110;
					this.getCurrentaction(id)
					this.toView = ""
				}, 300)
			},
			myscroll(e) {
				//引入节流	
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					this.select_index = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.catrgoryList.length - 1))
					}
				}
			},
			// 滑动swiper
			change(e) {
				let index = e.detail.current
				let id = this.catrgoryList[index].id
				this.choose(index, id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.category {
		padding-top: 72rpx;

		// position: relative;
		.top {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99;
			background: white;
		}

		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 120rpx;
			bottom: 0;

			.left-wrapper {
				width: 170rpx;
				flex: 0 0 170rpx;
				// background-color: #fafafa;
				// background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 120rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28rpx;
						// border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #ee0a24;
							font-weight: 500;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 6rpx;
								height: 100%;
								background: linear-gradient(124deg, #ee0a2f 0%, #ee0a24 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20rpx 0;
					// border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 30rpx;

						.swiper-content {
							width: 100%;
							height: 180rpx;
							margin-bottom: 20rpx;
							border-radius: 10rpx;
							overflow: hidden;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180rpx;
									border-radius: 10rpx;
								}
							}
						}
					}

					.product-wrapper {
						.product-title {
							width: 400rpx;
							margin: 20rpx auto;
							font-size: 30rpx;

							.split {
								flex: 1;
								height: 2rpx;
								background: #ebedf0;
							}

							.text {
								margin: 0 10rpx;
							}
						}

						.category-item {
							box-sizing: border-box;
							width: 33.3%;
							padding: 20rpx;

							image {
								width: 100%;
							}

							.name {
								margin: 10rpx;
								font-size: 26rpx;
							}

							.category-title {
								height: 60rpx;
								font-size: 26rpx;
								line-height: 60rpx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20rpx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20rpx 20rpx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20rpx;

									.product-img {
										width: 120rpx;
										height: 140rpx;
										margin-bottom: 10rpx;
									}

									.product-title {
										font-size: 23rpx;
									}
								}
							}
						}
					}
				}
			}
		}

	}
</style>
