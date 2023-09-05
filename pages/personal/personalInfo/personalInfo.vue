<template>
	<view>
		<view class="uni-common-mt">
			<view class="avater-view">
				<button open-type='chooseAvatar' @chooseavatar="onChooseAvatar" class="avater-button">
					<img :src="information.avatarUrl" alt="头像" class="avatar-img">
				</button>
			</view>
			<uni-forms ref="baseForm" :modelValue="information" :rules="rules">
				<uni-forms-item label="姓名" required name="name" class="user-input">
					<uni-easyinput type="text" v-model="information.username" placeholder="请输入姓名" class="user-input" />
				</uni-forms-item>
				<uni-forms-item label="学校" required name="school">
					<uni-easyinput type="text" v-model="information.school" placeholder="请输入您所在学校" class="user-input" />
				</uni-forms-item>
				<uni-forms-item label="班级" required name="class">
					<uni-easyinput type="text" v-model="information.classId" placeholder="您所在学校的班级"
						class="user-input" />
				</uni-forms-item>
				<uni-forms-item label="手机" required name="phone">
					<uni-easyinput type="text" v-model="information.phonNum" placeholder="我们可以成功与您沟通的联系方式"
						class="user-input" />
				</uni-forms-item>
			</uni-forms>

			<!-- <view class="avater-view">
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
			</view> -->
		</view>

		<button class="up-button" @click="upInfo()">
			<text v-if="!isExit">提交</text>
			<text v-else="isExit">修改</text>信息</button>
		<button class="back-btn" @click="goBack">不用修改，直接使用>></button>
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
				isExit: true,
				rules: {
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					shcool: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					},
					class: {},
					phone: {}
				}
			};
		},
		// 进入页面从缓存获取用户openid
		onShow() {
			var that = this;
			uni.getStorage({
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

			goBack() {
				var pages = getCurrentPages();
				console.log(pages.length);
				var pageLen = pages.length - 1;
				uni.navigateBack({
					delta: pageLen
				});
			}
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

	.back-btn::after {
		border: none;
	}

	.back-btn {
		background-color: #00000000;
		color: #488ac7;
		font-size: 16px;
	}
</style>