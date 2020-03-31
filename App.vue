<script>
	export default {
		onLaunch: function() {
			this.getIndexaction()
			// #ifdef  H5
			var script = document.createElement('script');
			script.src = "https://webapi.amap.com/maps?v=1.4.15&key=e3429d616d5bef5bee89f8eb7b7346ea";
			document.body.appendChild(script);
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			getIndexaction() {
				this.$api.getIndexaction(this.$store.state.openId).then(res => {
					if (res.status === 200) {
						this.$store.state.indexaction = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
	}
</script>

<style>
	/*每个页面公共css */

	/*隐藏滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.flex {
		display: flex
	}

	.j-star {
		justify-content: flex-start;
	}

	.j-end {
		justify-content: flex-end;
	}

	.j-center {
		justify-content: center;
	}

	.f-column {
		flex-direction: column;
	}

	.a-center {
		align-items: center;
	}

	.a-end {
		align-items: flex-end;
	}

	.f-wrap {
		flex-wrap: wrap;
	}

	.j-between {
		justify-content: space-between;
	}

	.j-around {
		justify-content: space-around;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ellipsiss {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.border {
		border: 1rpx rgb(226, 223, 223) solid;
	}

	.border-bottom {
		border-bottom: 1rpx rgb(226, 223, 223) solid;
	}
</style>
