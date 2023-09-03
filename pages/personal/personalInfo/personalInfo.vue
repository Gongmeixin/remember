<template>
	<view>
		<view class="uni-common-mt">
			<uni-forms ref="form">
				<uni-forms-item required label="手机号" name="mob" class="uni-form-item uni-column user-input">
					<uni-easyinput v-model="information.phonNum" placeholder="手机号" class="input"/>
				</uni-forms-item>
				<uni-forms-item required label="身份证" name="id_num">
					<uni-easyinput v-model="information.phonNum" placeholder="身份证" />
				</uni-forms-item>
			</uni-forms>

			<view class="avater-view">
				<button open-type='chooseAvatar' @chooseavatar="onChooseAvatar" class="avater-button">
					<img :src="information.avatarUrl" alt="头像" class="avatar-img">
				</button>
			</view>
			<view class="fenjie"></view>
			<view class="uni-form-item uni-column user-input">
				<view class="title">姓名</view>
				<view class="input">
					<input class="uni-input" v-model="information.username" maxlength="5" minlength="2"
						placeholder="我们对您的称呼" />
				</view>
			</view>
			<view class="fenjie"></view>
			<view class="uni-form-item uni-column user-input">
				<view class="title">学校</view>
				<view class="input">
					<input class="uni-input" v-model="information.school" maxlength="10" placeholder="您所在的学校" />
				</view>
			</view>
			<view class="fenjie"></view>
			<view class="uni-form-item uni-column user-input">
				<view class="title">班级</view>
				<view class="input">
					<input class="uni-input" v-model="information.classId" maxlength="20" placeholder="您所在学校的班级" />
				</view>
			</view>
			<view class="fenjie"></view>
			<view class="uni-form-item uni-column user-input">
				<view class="title">手机</view>
				<view class="input">
					<input class="uni-input" type="number" v-model="information.phonNum" maxlength="11"
						placeholder="我们可以成功与您沟通的联系方式" />
				</view>
			</view>
		</view>

		<button class="up-button" @click="upInfo()">
			<text v-if="!isExit">提交</text>
			<text v-else="isExit">修改</text>信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: {
					openid: '',
					avatarUrl: '../../../static/image/0.png',
					username: '',
					school: '',
					classId: '',
					phonNum: ''
				},
				isExit: true

			};
		},
		// 进入页面从缓存获取用户openid
		onShow() {
			var that = this;
			wx.getStorage({
				key: 'openid',
				success(res) {
					that.information.openid = res.data;
					console.log(that.information.openid);
					if (that.information.openid == '') {
						that.isExit = !that.isExit;
						that.upInfo();
					} else {
						that.getUserInfo(that.information.openid);
					}
				}
			});

		},
		methods: {
			upInfo() {
				uniCloud.callFunction({
					name: 'saveUserInfo',
					data: this.information
				}).then(res => {
					console.log(res);
				});
			},

			onChooseAvatar(e) {
				console.log(e.detail.avatarUrl);
				this.information.avatarUrl = e.detail.avatarUrl;
			},

			getUserInfo(id) {
				uniCloud.callFunction({
					name: 'getUserInfo',
					data: {
						openid: this.information.openid
					}
				}).then(res => {
					console.log(res.result.data[0]);
					this.information = res.result.data[0];
				});
			},
		}
	}
</script>

<style lang="scss">
	.user-input {
		width: 335px;
		margin: 20px auto;
		display: flex;

		.input {
			width: 280px;
			margin-left: 20px;
		}
	}

	.fenjie {
		width: 335px;
		height: 1px;
		background: #ddd;
		margin: 0 auto;
	}

	.up-button {
		width: 160px;
		height: 40px;
		background: #488ac7;
		border-radius: 4px;
		font-size: 16px;
		line-height: 40px;
		color: white;
		margin-top: 30px;
	}

	.notes {
		width: 335px;
		margin: 20px auto 50px;
		font-size: 14px;

		span {
			color: red;
			margin-right: 4px;
		}

		p {
			color: #999;
		}
	}

	.avater-view {
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-items: center;
	}

	.avater-button {
		width: 7.5rem;
		height: 7.5rem;
		display: flex;
		align-items: center;
		padding: 0;
		border: none;
	}

	.avatar-img {
		height: 100%;
		width: 100%;
	}
</style>