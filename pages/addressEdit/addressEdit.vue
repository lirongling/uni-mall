<template>
	<view class="containers">
		<view class="contents">
			<view class="content-item flex">
				<view class="item-title flex a-center">
					姓名
				</view>
				<view class="item-text flex a-center">
					<input @blur="userBlur($event,1)" placeholder-style="font-size:30rpx" type="text" :value="address.userName"
					 placeholder="收货人姓名" />
				</view>
			</view>
			<view class="content-item flex">
				<view class="item-title flex a-center">
					电话
				</view>
				<view class="item-text flex a-center">
					<input @blur="userBlur($event,2)" type="number" :value="address.telNumber" placeholder="收货人手机号码" />
				</view>
			</view>
			<view class="content-item flex" @click="openAddres2">
				<view class="item-title flex a-center">
					地区
				</view>
				<view class="item-text flex a-center">
					<input @focus="openAddres2" type="text" :value="address.address" placeholder="选择省市区" />
				</view>
				<view class="item-more flex a-center">
					<image lazy-load="true" style="height: auto;" src="../../static/images/right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="content-item flex">
				<view class="item-title flex a-center">
					详细地址
				</view>
				<view class="item-text flex a-center">
					<input @blur="userBlur($event,3)" placeholder-style="font-size:30rpx" type="text" :value="address.detailadress"
					 placeholder="街道门牌、楼层房间号等信息" />
				</view>
			</view>
			<view class="chose content-item flex j-between">
				<view class="chose-title item-title flex a-center">
					设为默认地址
				</view>
				<view class="">
					<switch :checked="address.checked===1" @change="switchChange" />
				</view>
			</view>
			<view class="btn">
				<button class="btn-danger" @click="verifyFrom">{{btnText}}</button>
				<button class="btn-default" v-if="flage" @click="delAddress">删除</button>
			</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	export default {
		name: "",
		components: {
			simpleAddress,
		},
		props: {},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				address: {
					address: "",
					addressId: null,
					checked: false,
					detailadress: "",
					telNumber: '',
					userName: "",
					openId: null
				},
				defaultAddress: [],
				btnText: "添加",
				flage: false,
			}
		},
		methods: {
			// 切换是否是默认
			switchChange(e) {
				// if
				this.address.checked = e.detail.value
			},
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			openAddres2() {
				if (this.defaultAddress[0]) {
					// 根据 label 获取
					var index = this.$refs.simpleAddress.queryIndex(this.defaultAddress, 'label');
					// console.log(index);
					this.cityPickerValueDefault = index.index;
				} else {
					this.cityPickerValueDefault = [0, 0, 1]
				}
				this.$refs.simpleAddress.open();
			},
			openAddres3() {

				// 根据value 获取
				var index = this.$refs.simpleAddress.queryIndex([13, 1302, 130203], 'value');
				console.log(index);
				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
			},
			// 确认地址
			onConfirm(e) {
				console.log(e)
				this.pickerText = JSON.stringify(e);
				this.address.address = e.labelArr.join(" ")
			},
			// 失去焦点同步数据
			userBlur(e, number) {
				let val = e.detail.value
				if (number === 1) {
					this.address.userName = val
				} else if (number === 2) {
					this.address.telNumber = val
				} else {
					this.address.detailadress = val
				}
			},
			// 验证表单 
			verifyFrom() {
				if (this.address.userName.trim().length === 0) {
					this.toast("请输入收货人姓名")
					return
				} else if (this.address.address.trim().length === 0) {
					this.toast("请输入地址")
					return
				} else if (this.address.detailadress.trim().length === 0) {
					this.toast("请输入详细地址")
					return
				} else {
					let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
					if (this.address.telNumber.trim().length === 0) {
						this.toast("请输入手机号")
					} else if (!this.address.telNumber.match(a)) {
						this.toast("手机号不合法")
					} else {
						this.saveAddress()
					}
				}
			},
			// 新增or修改地址
			saveAddress() {
				this.$api.saveAddress(this.address).then(res => {
					if (res.status === 200 && res.data.data) {
						this.toast('添加成功')
						uni.navigateBack({
							delta: 1
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 提醒
			toast(title) {
				uni.showToast({
					title: title,
					icon: "none"
				})
			},
			// 删除地址
			delAddress() {
				let _this=this
				uni.showModal({
					title: '提醒',
					content: "是否删除该地址？",
					success: function(res) {
						if (res.confirm) {
							_this.toast("此功能暂不可用")
						} else if (res.cancel) {

						}
					}
				});
			},
		},
		mounted() {

		},
		onShow() {
			// console.log(option)
			// let address=

		},
		onLoad(option) {
			if (option.address) {
				this.btnText = "修改"
				this.flage = true
				let addressInfo = JSON.parse(option.address)
				let address = addressInfo.address.split(' ')
				this.defaultAddress = address
				this.address.address = addressInfo.address
				this.address.addressId = addressInfo.id
				if (addressInfo.is_default) {
					this.address.checked = true
				} else {
					this.address.checked = false
				}
				this.address.detailadress = addressInfo.address_detail
				this.address.telNumber = addressInfo.mobile
				this.address.userName = addressInfo.name
			} else if (this.$store.state.addressInfo.address_component) {
				let address = this.$store.state.addressInfo.address_component
				this.defaultAddress = [address.province, address.city, address.district]
			}
			this.address.openId = this.$store.state.openId
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
	.containers {
		min-height: 100vh;
		// background-color: #F4F4F4;
		box-sizing: border-box;
		padding-top: 100rpx;
		padding-bottom: 20rpx;
		/* #ifdef H5 */
		min-height: calc(100vh - 44px);

		/* #endif */
		.contents {
			background: white;
			// border-radius: 16rpx;
			box-sizing: border-box;
			width: 95%;
			margin: 0 auto;
			// margin: 20rpx auto;
			overflow: hidden;

			.content-item:after {
				position: absolute;
				box-sizing: border-box;
				content: ' ';
				pointer-events: none;
				right: 20rpx;
				;
				bottom: 0;
				left: 20rpx;
				border-bottom: 1px solid #dddfe1;
				transform: scaleY(0.5);
			}

			.content-item {
				position: relative;
				box-sizing: border-box;
				width: 98%;
				margin: 0 auto;
				padding: 26rpx 32rpx;
				overflow: hidden;
				color: #323233;
				font-size: 32rpx;
				line-height: 48rpx;
				background-color: #fff;
				// margin-top: -1rpx;
				// border-top: 1px solid #ebedf0;

				.item-title {
					box-sizing: border-box;
					width: 180rpx;
				}

				.item-text {
					flex: 1;
					color: #969799;
					text-align: right;
					vertical-align: middle;
					word-wrap: break-word;

					input {
						display: block;
						box-sizing: border-box;
						width: 100%;
						min-width: 0;
						margin: 0;
						padding: 0;
						color: #323233;
						line-height: inherit;
						text-align: left;
						background-color: transparent;
						border: 0;
						resize: none;
					}

				}

				.item-more {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 10rpx;

					image {
						width: 45rpx;
						height: 45rpx;
					}
				}
			}

			.chose {
				margin-top: 20rpx;

				.chose-title {
					width: 100%;
				}
			}

			.btn {
				width: 98%;
				margin: 0 auto;
				// padding: 26rpx 32rpx;
				font-size: 30rpx;
				margin-top: 80rpx;

				button {
					margin: 30rpx auto;
					display: block;
					width: 100%;

					// padding: 0 30rpx;
					box-sizing: border-box;
					height: 88rpx;
					// margin: 0;
					padding: 0;
					font-size: 32rpx;
					line-height: 84rpx;
					text-align: center;
					border-radius: 44rpx;
					cursor: pointer;
					transition: opacity 0.2s;
				}

				.btn-danger {
					color: #fff;
					background-color: #ee0a24;
					border: 2rpx solid #ee0a24;
				}

				.btn-default {
					color: #323233;
					background-color: #fff;
					border: 2rpx solid #ebedf0;
				}
			}
		}
	}
</style>
