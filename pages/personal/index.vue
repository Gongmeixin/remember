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
						<img class="pPhoto" :src="userInfo.avatarUrl">
						<text style="margin-top: 20rpx; font-size: 700;">{{userInfo.nickName}}</text>
						<button class="login-btn" v-if="isShowLoginButton" @click="weixinLogin">请登录>></button>
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
				<view class="lookTest uni-shadow-lg" @click="goD_TestDetail">
					<text style="padding-left: 50rpx;">查看听力测试</text>
					<uni-icons type="forward" size="30"></uni-icons>
				</view>
				<view class="aboutUs uni-shadow-lg" @click="goPersonalInfo()">
					<text style="padding-left: 50rpx;">个人资料</text>
					<uni-icons type="forward" size="30"></uni-icons>
				</view>
				<!-- <view class="aboutUs uni-shadow-lg">
					<text style="padding-left: 50rpx;">关于我们</text>
					<uni-icons type="forward" size="30"></uni-icons>
				</view> -->
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
				reviewNum: 0,
				userInfo: {
					avatarUrl: '../../static/image/logo.png',
					nickName: '昵称'
				},
				isShowLoginButton: true,
			}
		},
		methods: {
			goTestDetail() {
				uni.navigateTo({
					url: 'testDatile/testDatile'
				});
			},
			goD_TestDetail() {
				uni.navigateTo({
					url: 'D_testDetail/D_testDetail'
				});
			},
			goPersonalInfo() {
				if (this.isShowLoginButton) {
					uni.showToast({
						title: '您未登录，请先登录！',
						icon: 'none',
						//显示持续时间为 2秒
						duration: 2000
					})
				} else {
					uni.navigateTo({
						url: 'personalInfo/personalInfo'
					});
				}

			},
			weixinLogin() {
				uni.navigateTo({
					url: '../../components/login/login'
				});
			},
			getStatusBarHeight() {
				var systemInfo = uni.getSystemInfoSync()
				this.statusBarHeight = systemInfo['statusBarHeight'];
				console.log(this.statusBarHeight)
			},
			getUserInfo(id) {
				uniCloud.callFunction({
					name: 'getUserInfo',
					data: {
						openid: id
					}
				}).then(res => {
					console.log(res.result.data[0]);
					if (res.result.data[0] != null) {
						this.userInfo.avatarUrl = res.result.data[0].avatarUrl;
						console.log(this.userInfo.avatarUrl);
						this.userInfo.nickName = res.result.data[0].nickName;
						this.isShowLoginButton = false;
					}
				});
			},
		},
		onShow() {
			//获取手机状态栏高度
			this.getStatusBarHeight();
			let that = this;
			uni.getStorage({
				key: 'openid',
				success(res) {
					console.log(res.data);
					that.getUserInfo(res.data);
				},
				fail(err) {
					console.log(err.errMsg);
					that.isShowLoginButton = true;
				}
			});
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
		padding: 3rpx 50rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.navTitle {
		font-size: 1rem;
		font-weight: 700;
	}

	.p_top {
		width: 100%;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(#2979ff 5%, #fff);
	}

	.p_photo {
		width: 200rpx;
		height: 200rpx;
		text-align: center;
		z-index: 999;
	}

	.pPhoto {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.1);
		z-index: -1;
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

	.login-btn {
		background-color: #00000000;
		/* border-style: none; */
		color: #2979ff;
		font-size: 14px;
		font-weight: 700;
	}

	.login-btn::after {
		border: none;
	}
</style>