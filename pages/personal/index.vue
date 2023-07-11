<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="navTitle">{{text}}</view>
			</view>
			<view class="mainPage">
				<view class="p_top">
					<view class="p_photo">
						<img src="../../static/image/logo.png" alt="">
						<text style="margin-top: 20rpx;">昵称</text>
					</view>
				</view>
				<view class="p_top_bottom uni-shadow-lg">
					<view class="study_view">
						<text>已学习</text>
						<text>{{studyNum}}</text>
					</view>
					<hr style="height: 100%; background-color: #edededff; width: 1rpx;">
					<view class="review_view">
						<text>待复习</text>
						<text>{{reviewNum}}</text>
					</view>
				</view>
				<view class="lookTest uni-shadow-lg" @click="goTestDetail">
					<text style="padding-left: 50rpx;">查看测试</text>
					<uni-icons type="forward" size="30"></uni-icons>
				</view>
				<view class="aboutUs uni-shadow-lg">
					<text style="padding-left: 50rpx;">关于我们</text>
					<uni-icons type="forward" size="30"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '我的',
				// 状态栏高度
				statusBarHeight: 0,
				studyNum: 0,
				reviewNum: 0
			}
		},
		methods: {
			goTestDetail() {
				uni.navigateTo({
					url: 'testDatile/testDatile'
				});
			}
		},
		//第一次加载时调用
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},


	}
</script>

<style>
	.statusBar,
	.navBar {
		background-color: #2979ff;
	}

	.navBar {
		height: 44px;
	}

	.navBarBox .navBar {
		padding: 3rpx 50rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.navTitle {
		font-size: 16px;
		font-weight: 700;
	}

	.p_top {
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.64) 45%),
			url(../../static/image/logo.png);
		/* background-attachment: fixed; */
		backdrop-filter: blur(50px);
		background-position: center;
	}

	.p_photo {
		width: 200rpx;
		height: 200rpx;
		border: 10rpx solid #e9e9eb;
		border-radius: 50%;
		text-align: center;
	}

	.p_photo img {
		height: 100%;
		width: 100%;
	}

	.p_top_bottom {
		height: 100rpx;
		width: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		border-radius: 25rpx;
	}

	.study_view,
	.review_view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.lookTest,
	.aboutUs {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		margin-top: 10rpx;
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx;
	}
</style>