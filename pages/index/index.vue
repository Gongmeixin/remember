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
		<view class="pagebody">
			<view class="imgbox">
				<image src="../../static/image/哆啦A梦.jpg" mode="widthFix" class="bodyImg"></image>
			</view>
			<view class="button-box" :style="{transform: `translate(0px,${screenHeight-statusBarHeight-440}px)`}">
				<button class="mbutton uni-shadow-lg">开始作业</button>
				<button class="mbutton uni-shadow-lg">听写</button>
			</view>
			<view class="bottomView" :style="{transform: `translate(0px,${screenHeight-statusBarHeight-44-300-50}px)`}">
			</view>
		</view>
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
				screenHeight: 0
			}
		},
		onLoad() {

		},
		methods: {

		},
		//第一次加载时调用
		created() {
			//获取手机状态栏高度
			var systemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = systemInfo['statusBarHeight'];
			console.log(this.statusBarHeight);
			this.screenHeight = systemInfo['screenHeight'];
		},
	}
</script>

<style>
	.statusBar,
	.navBar {
		background-color: #2979ff;
	}

	.navBar {
		height: 2.75rem;
	}

	.navBarBox .navBar {
		padding: 3rpx 45rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.navTitle {
		font-size: 1rem;
		font-weight: 700;
	}

	.pagebody {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.imgbox {
		background-color: #dcdcdc;
		z-index: 0;
	}

	.bodyImg {
		width: 100%;
	}

	.bottomView {
		width: 100%;
		border-radius: 1.5625rem 1.5625rem 0 0;
		z-index: 1;
		height: 18.75rem;
		background-color: #94bcff;
		position: absolute;
	}
	
	.button-box{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		z-index: 999;
	}
	.mbutton {
		background-color: #2979ff;
		color: white;
		width: 100px;
		height: 100px;
		text-align: justify;
	}
</style>