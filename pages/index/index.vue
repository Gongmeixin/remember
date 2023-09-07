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
				<button class="mbutton uni-shadow-lg" @click="goHomeWork()" hover-class="hover">开始测试</button>
				<button class="mbutton uni-shadow-lg" hover-class="hover" @click="goDictation()">听写</button>
			</view>
			<view class="bottomView" :style="{transform: `translate(0px,${screenHeight-statusBarHeight-44-300-50}px)`}">
			</view>
		</view>
	</view>
	<view>
		<!-- 提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="取消" confirmText="去登录" title="提示" :content="tipContent"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
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
				screenHeight: 0,
				tipContent: '',
				selectInfo: [],
				isGo: false
			}
		},
		onLoad() {

		},
		methods: {
			goHomeWork() {
				let _this = this;
				uni.getStorage({
					key: 'openid',
					success(res) {
						console.log(res.data);
						if (res.data != '') {
							uni.navigateTo({
								url: 'homework/homework'
							});
						}
					},
					fail(err) {
						console.log(err.errMsg);
						if (err.errMsg == 'getStorage:fail data not found') {
							_this.goLogin()
						}
					}
				});
			},

			goLogin() {
				this.$refs.alertDialog.open();
				this.tipContent = `您未登录，请先登录！`;
				this.isGo = true;

			},
			dialogConfirm() {
				console.log('点击了确认');
				if (this.isGo) {
					uni.navigateTo({
						url: '../../components/login/login'
					});
				}
			},
			dialogClose() {
				console.log('点击了取消')
			},
			goDictation(){
				let _this = this;
				uni.getStorage({
					key: 'openid',
					success(res) {
						console.log(res.data);
						if (res.data != '') {
							uni.navigateTo({
								url: 'dictationTest/dictationTest'
							});
						}
					},
					fail(err) {
						console.log(err.errMsg);
						if (err.errMsg == 'getStorage:fail data not found') {
							_this.goLogin()
						}
					}
				});
			}
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
		background-color: rgb(255, 255, 255, 0.64);
		backdrop-filter: blur(10px);
		position: absolute;
	}

	.button-box {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		top: 130px;
		z-index: 5;
	}

	.mbutton {
		background-color: #2979ff;
		color: white;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.hover {
		background-color: #94bcff;
		top: 3px;
	}
</style>