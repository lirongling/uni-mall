<template>
	<view class="container">
		<view class="top flex a-center j-between">
			<!-- #ifdef H5 || APP-PLUS -->
			<view class="back flex a-center j-center" @click="back">
				<image lazy-load="true" style="height: auto;" src="../../static/images/back.png" mode="widthFix"></image>
			</view>
			<!-- #endif -->
			<view class="input">
				<uni-search-bar @confirm="input" @input="input" :radius="100" v-model="keyword" :initialVal="initialVal"></uni-search-bar>
			</view>
		</view>
		<view class="content" v-if="searchResult.length===0">
			<view class="history">
				<view class="title flex j-between a-center">
					<view class="text">
						搜索历史
					</view>
					<view class="del" v-if="historyData.length>0" @click="delHistory">
						<image lazy-load="true" style="height: auto;" src="../../static/images/del.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="history-content flex a-center f-wrap" v-if="historyData.length>0">
					<view class="history-item" @click="addSearch(item.keyword)" v-for="(item,index) in historyData" :key="index">
						{{item.keyword}}
					</view>
				</view>
				<view class="no-history">
					暂无搜索历史
				</view>
			</view>
			<view class="hot history">
				<view class="title">
					<view class="text">
						热门搜索
					</view>
				</view>
				<view class="history-content flex a-center f-wrap">
					<view class="history-item" @click="addSearch(item.keyword)" v-for="(item,index) in hotKeywordList" :key="index">
						{{item.keyword}}
					</view>
				</view>
			</view>
		</view>
		<view class="result" v-else>
			<view class="result-item border-bottom flex a-center" v-for="(item,index) in searchResult" :key="index" @click="details(item.id)">
				<view class="img">
					<image lazy-load="true" style="height: auto;" :src="item.list_pic_url" mode="widthFix"></image>
				</view>
				<view class="details">
					<view class="name">
						<jyf-parser :html="util(item.name,keyword)"></jyf-parser>
					</view>
					<view class="price">
						￥{{item.retail_price}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import parser from "@/components/jyf-parser/jyf-parser";
	import util from "../../static/js/util.js"
	export default {
		name: "",
		components: {
			uniSearchBar,
			"jyf-parser": parser,
		},
		props: {},
		data() {
			return {
				initialVal: "",
				keyword: "",
				hotKeywordList: [],
				historyData: [],
				num: 0,
				searchResult: [],
				util: util.keyWord
			}
		},
		methods: {
			// 搜索框收入
			input(e) {
				this.num++
				if (this.keyword === e.value && this.num === 1) {
					return
				}
				this.keyword = e.value
				if (this.num <= 1) {
					return
				}
				let val = e.value.trim()
				if (val.length > 0) {
					this.$api.getSearch(val).then(res => {
						if (res.status === 200) {
							if (res.data.keywords.length === 0) {
								uni.showToast({
									title: "暂无相关数据",
									icon: "none"
								})
							} else {
								this.searchResult = res.data.keywords
							}
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.searchResult = []
				}
			},
			// 添加搜索
			addSearch(e) {
				this.initialVal = e
			},
			// 跳转到详情页
			details(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				});
			},
			// 删除搜索历史
			delHistory() {
				uni.showModal({
					title: '提醒',
					content: '是否确认删除搜索历史？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 返回
			back() {
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif
				// #ifdef H5
				uni.switchTab({
					url: "/pages/index/index"
				})
				// #endif
			}
		},
		mounted() {

		},
		onLoad() {
			let a=this.$store.state.indexaction
			if(a.defaultKeyword){
				this.initialVal = a.defaultKeyword.keyword
				this.hotKeywordList = a.hotKeywordList
				this.historyData = a.historyData
			}	
		},
		filters: {

		},
		computed: {

		},
		watch: {
			// "$store.state.indexaction"(val) {
			// 	this.initialVal = val.defaultKeyword.keyword
			// 	this.hotKeywordList = val.hotKeywordList
			// 	this.historyData = val.historyData
			// }
		},
		directives: {}
	}
</script>

<style scoped lang="scss">
	.container {
		padding-top: 100rpx;

		.top {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 9;
			background-color: white;

			.search-content {
				width: 100%;
			}

			.back {
				width: 80rpx;

				image {
					width: 50rpx;
				}
			}

			.input {
				flex: 1;
				background: #007AFF;
			}
		}

		.content {
			padding: 10rpx 20rpx;

			.history {
				.title {
					margin: 20rpx auto;

					.text {
						font-size: 30rpx;
					}

					.del {
						image {
							width: 50rpx;
						}
					}
				}

				.history-content {
					margin: 20rpx auto;
					width: 100%;

					.history-item {
						padding: 8rpx 20rpx;
						background: rgba(234, 238, 238, .8);
						border-radius: 20rpx;
						font-size: 30rpx;
						margin: 12rpx;
						color: rgb(26, 25, 25);
					}
				}

				.no-history {
					margin: 20rpx auto;
					font-size: 30rpx;
					color: #808080;
					text-align: center;
				}
			}
		}

		.result {
			padding: 0 20rpx;

			.result-item {
				margin: 20rpx auto;

				.img {
					width: 200rpx;
					border-radius: 10rpx;

					image {
						width: 100%;
						border-radius: 10rpx;
					}
				}

				.details {
					margin-left: 10rpx;
					font-size: 30rpx;

					.name {}

					.price {
						margin-top: 10rpx;
						color: #BE351C;
					}
				}
			}
		}
	}
</style>
