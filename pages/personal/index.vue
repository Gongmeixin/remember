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
				<view class="p_top" :style="{ backgroundImage: `url(${userInfo.avatarUrl})`,}">
					<view class="p_photo" @click="weixinLogin()">
						<img class="pPhoto" :src="userInfo.avatarUrl">
						<text style="margin-top: 20rpx;">{{userInfo.nickName}}</text>
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
				<view class="aboutUs uni-shadow-lg" @click="goPersonalInfo()">
					<text style="padding-left: 50rpx;">个人资料</text>
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
				reviewNum: 0,
				userInfo: {
					avatarUrl: '../../static/image/logo.png',
					nickName: '昵称'
				}
			}
		},
		methods: {
			goTestDetail() {
				uni.navigateTo({
					url: 'testDatile/testDatile'
				});
			},
			goPersonalInfo() {
				uni.navigateTo({
					url: 'personalInfo/personalInfo'
				});
			},
			weixinLogin() {
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function(loginRes) {
						console.log(loginRes.code);
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session',
							data: {
								'appid': 'wx52d880560f439605',
								'secret': 'a874878c77ccb8dc3b0e599503379899',
								'js_code': loginRes.code,
								'grant_type': 'authorization_code'
							},
							method: 'GET',
							success: res => {
								console.log(res);
							},
							fail: err => {
								console.log(err)
							}
						});
					}
				});
			},
			getStatusBarHeight() {
				var systemInfo = uni.getSystemInfoSync()
				this.statusBarHeight = systemInfo['statusBarHeight'];
				console.log(this.statusBarHeight)
			},
		}, //第一次加载时调用
		created() {
			//获取手机状态栏高度
			this.getStatusBarHeight()
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
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(50px);
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 45%);
		/* background-attachment: fixed; */
		background-position: center;
	}

	.p_photo {
		width: 200rpx;
		height: 200rpx;
		border: 10rpx solid #e9e9eb;
		border-radius: 50%;
		text-align: center;
	}

	.pPhoto {
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