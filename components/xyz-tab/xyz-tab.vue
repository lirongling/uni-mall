<template>
	<view class="tab">
		<scroll-view scroll-x style="white-space:nowrap;" :scroll-with-animation="true" :scroll-left="scrollLeft">
			<view class="tab_main" :class="tabLen ? 'flex_around' : ''">
				<view class="tab-item flex a-center" :id="getId(index)" style="display: inline-block;" :class="index == tabIdx ? 'tab_active' : ''"
				 v-for="(item, index) in tabList" :key="index" @click="tabSelect(item,index)">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default: []
			},
			tabActiveIdx: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabIdx: 0,
				scrollLeft: 0
			};
		},
		computed: {
			tabLen() {
				return this.tabList.length > 5 ? false : true;
			}
		},
		watch: {
			tabActiveIdx(newValue, oldValue) {
				this.tabSelect(newValue);
			}
		},
		methods: {
			tabSelect(item,idx) {
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.timeout = setTimeout(() => {
					this.tabIdx = idx;
					this.$emit('tabSelect', {item,idx});
					this.scrollLeft = idx * 30;
				}, 300)
			},
			getId(id) {
				return `tab-${id}`
			}
		}
	};
</script>
<style scoped lang="scss">
	.flex_around {
		display: flex;
		justify-content: space-around;
	}

	.tab {

		// transition: all 1s ease ;
		.tab_main {
			font-size: 30rpx;
			box-sizing: border-box;
			justify-content: flex-start;

			.tab-item {
				margin: 0 25rpx;
				height: 80rpx;
				line-height: 80rpx;
				box-sizing: border-box;
				color: #646566;

				// border-bottom: 4rpx solid white;
				&.tab_active {
					// font-size: 36rpx;
					// font-weight: bold;
					color: red;
					border-bottom: 4rpx solid red;
					color: #323233;
				}
			}
		}
	}
</style>
