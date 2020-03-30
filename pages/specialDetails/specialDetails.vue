<template>
	<view>
		<view class="content" >
			<u-parse :content="details.content"></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				details: {},
				recommendList: []
			}
		},
		components: {
			uParse,
		},
		methods: {
			topicDetails(id) {
				this.$api.topicDetails(id).then(res => {
					if (res.status === 200) {
						this.details = res.data.data
						this.recommendList = res.recommendList
						
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.topicDetails(option.id)
			uni.setNavigationBarTitle({
				title: option.title
			});
		}
	}
</script>

<style>

</style>
