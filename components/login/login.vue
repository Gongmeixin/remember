<template>
	<view class="">
		<view class="mask">

			<view class="content">
				<button class="login-button" @click="ulogin">
					<uni-icons custom-prefix="custom-icon" type="weixin" size="40"></uni-icons>
					微信一键登录</button>
				<uni-icons custom-prefix="custom-icon" type="close" size="60" class="clossIcon"
					@click="close"></uni-icons>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				code: '',
			};
		},
		methods: {
			ulogin() {
				let _this = this;
				//前端数据请求时，显示加载提示弹框
				uni.showLoading({
					title: '加载中...',
					mask:true
				});
				uni.login({
					provider: 'weixin',
					univerifyStyle: {
						fullScreen: true
					},
					success: function(loginRes) {
						this.code = loginRes.code;
						_this.getOpenId(this.code);
					}
				});
			},
			goPersonalInfo() {
				uni.navigateTo({
					url: '../../pages/personal/personalInfo/personalInfo'
				});
			},
			close() {
				uni.navigateBack();
			},
			getOpenId: function(code) {
				let _this = this;
				uni.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session',
					method: "GET",
					data: {
						appid: 'wx52d880560f439605',
						secret: 'a874878c77ccb8dc3b0e599503379899',
						js_code: code,
						grant_type: 'authorization_code'
					},
					success: function(res) {
						var result = res.data;
						uni.setStorage({
							key: 'openid',
							data: result.openid,
						}).then(res => {
							return uni.setStorage({
								key: 'session_key',
								data: result.session_key,
							})
						}).then(res => {
							return uni.hideLoading();
						}).then(res => {
							return _this.goPersonalInfo();
						});
					}
				});
			}
		},

	}
</script>

<style>
	page {
		background: transparent;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.0);
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #c7c9ce;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.login-button {
		background-color: #18bc37;
		width: 60%;
		height: 100rpx;
		font-size: 40rpx;
		font-weight: 700;
		border-radius: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.clossIcon {
		margin-top: 100rpx;
	}
</style>