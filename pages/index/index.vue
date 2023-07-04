<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="navTitle">记吧单词</view>
			</view>
		</view>
		<!-- 页面内容 -->
		<view>我是页面内容</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
			}
		},
		onLoad() {

		},
		methods: {

		},
		//第一次加载时调用
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
	}
</script>

<style>
	.statusBar,.navBar{
		background-color: #2979ff;
	}
	
	.navBar{
		height: 44px;
	}
	.navBarBox .navBar {
		padding: 3rpx 45rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.navTitle{
		font-size: 16px;
		font-weight: 700;
	}
</style>