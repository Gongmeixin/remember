<template>
	<view v-show="isShow">
		<uni-section title="答题时间还剩" type="line">
			<uni-countdown class="uni-mx-7" :show-day="false" :hour="testHour" :minute="testMinute" :second="testSecond"
				@timeup="timeup" />
		</uni-section>
		<ul class="answerList">
			<li v-for="(item,index) in answerArr" :key="item._id">
				<view v-show="currentIndex==index">
					<p>{{item.paraphrase}}</p>
				</view>
			</li>
		</ul>
		<input type="text" name="userAnswer" id="userAnswer" class="userInput" placeholder="请输入您的答案..."
			v-model="userAnswer" maxlength="45" @input="fpNumInput">
		<view class="pageBottom">
			<button v-bind:class="['selectButton',currentIndex==0?'notSelect':'']" @click="lastOne()"
				hover-class="notSelect">上一题</button>
			<span>{{currentIndex+1+"/"+total}}</span>
			<button v-bind:class="['selectButton',currentIndex==answerArr.length-1?'notSelect':'']" @click="nextOne()"
				hover-class="notSelect" v-show="currentIndex < answerArr.length-1">下一题</button>
			<button v-bind:class="['selectButton',currentIndex==answerArr.length-1?'':'notSelect']"
				@click="SubmitAnswer()" hover-class="notSelect"
				v-show="currentIndex >= answerArr.length-1">提交答案</button>
		</view>
	</view>
	<view v-show="!isShow">
		<uni-section title="提示" type="line">
			<uni-notice-bar show-icon scrollable text="暂无该单元的数据,试试别的功能吧!" />
		</uni-section>
	</view>
	<view>
		<!-- 提示窗示例 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="取消" confirmText="确认" title="提示" :content="tipContent"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testHour: 99,
				testMinute: 99,
				testSecond: 99,
				class: null,
				answerArr: [],
				total: 0,
				currentIndex: 0,
				userAnswer: '',
				userAnswerArr: [],
				bookId: 0,
				volumeId: 0,
				unitId: 0,
				isShow: true,
				tipContent: '',
				canBack: false,
				openid: ''
			}
		},
		onLoad(option) {
			var that = this;
			uni.getStorage({
				key: 'openid',
				success(res) {
					that.openid = res.data;
					console.log(that.openid);
				}
			});
			console.log(option);
			this.class = JSON.parse(option.class); // 字符串转对象
			var selectdetail = this.class.split("-");
			console.log(this.class.split("-"));
			if (selectdetail.length > 0) {
				this.bookId = selectdetail[0];
				if (selectdetail.length > 1) {
					this.volumeId = selectdetail[1];
					if (selectdetail.length > 2) {
						this.unitId = selectdetail[2];
					}
				}
			}

			uni.showLoading({
				title: '加载中...',
				mask: true,
			}).then(res => {
				console.log(res);
				this.getWords();
			});
		},
		methods: {
			//倒计时结束
			timeup() {
				uni.showToast({
					title: '时间已到，答题结束',
					//将值设置为 success 或者直接不用写icon这个参数
					icon: 'success',
					//显示持续时间为 2秒
					duration: 2000
				}).then(res => {
					console.log(res);
					this.SubmitAnswer();
					this.backHome();
				});
			},
			//获取词库
			getWords() {
				if (this.unitId == 0) {
					uni.hideLoading();
					this.isShow = false;
				} else {
					console.log(this.unitId)
					uniCloud.callFunction({
						name: "getWords",
						data: {
							unitId: this.unitId
						}
					}).then(res => {
						console.log(res);
						this.answerArr = res.result.data;
						this.total = this.answerArr.length;
						var time = this.total * 5;
						this.testSecond = time % 60;
						this.testMinute = parseInt(time / 60);
						this.testHour = parseInt(time / 3600);
						console.log(this.total, this.testHour, this.testMinute, this.testSecond)
						uni.hideLoading();
					});
				}

			},
			//上一题
			lastOne() {
				if (this.currentIndex >= 1) {
					let s = {
						id: this.currentIndex + 1,
						userWord: this.userAnswer
					};
					this.saveAnswer(s.id, s.word);
					this.currentIndex--;
					console.log(s);
					this.showAnswer(this.currentIndex + 1);
				}
			},
			//下一题
			nextOne() {
				if (this.currentIndex < this.answerArr.length - 1) {
					this.currentIndex++;
					this.saveAnswer(this.currentIndex, this.userAnswer);
					this.showAnswer(this.currentIndex + 1);
				}
			},
			//题号是否已经存在
			isInUAnswerArr_id(id) {
				if (this.userAnswerArr.findIndex(item => item.id === id) <= -1) {
					return false;
				} else {
					return true;
				}
			},
			//答案是否已经存在
			isInUAnswerArr_word(word) {
				if (this.userAnswerArr.findIndex(item => item.userWord === word) <= -1) {
					return false;
				} else {
					return true;
				}
			},
			//显示已经答题了的答案
			showAnswer(index) {
				if (this.isInUAnswerArr_id(index)) {
					this.userAnswerArr.forEach(item => {
						if (item.id == index) {
							this.userAnswer = item.userWord;
						}
					})
				} else {
					this.userAnswer = '';
				}
			},
			//保存答案
			saveAnswer(index, word) {
				let u = {
					id: index,
					userWord: word,
					unit: this.unitId,
					word_id: this.answerArr[index - 1]._id,
					openid: this.openid
				};
				console.log(u.id, this.isInUAnswerArr_id(u.id))
				if (!this.isInUAnswerArr_id(u.id) && this.userAnswer != '') {
					if (!this.isInUAnswerArr_word(u.word) || !this.isInUAnswerArr_id(u.id)) {
						this.userAnswerArr.push(u);
						console.log('新答案保存成功')
					}
				} else {
					console.log(u.word, this.isInUAnswerArr_word(u.word))
					if ((!this.isInUAnswerArr_word(u.word) && this.userAnswer != '') || (this.isInUAnswerArr_id(u.id) &&
							this.userAnswer != '')) {
						this.userAnswerArr.forEach(item => {
							if (item.id == u.id) {
								item.word = u.word;
								console.log('答案更新成功')
							}
						})
					}
					console.log(this.userAnswerArr);
				}
			},
			dialogConfirm() {
				console.log('点击了确认');
				this.canBack = true;
				uni.switchTab({
					url: "../index"
				});
			},
			dialogClose() {
				console.log('点击了取消')
			},
			//上传答案
			SubmitAnswer() {
				uni.showLoading({
					title: '正在提交...',
					mask: true,
				}).then(res => {
					uniCloud.callFunction({
						name: 'UploadAnswer',
						data: {
							userAnswer: this.userAnswerArr
						}
					}).then(res => {
						console.log(res);
						uni.showToast({
							title: '提交成功！',
							icon: 'success',
							duration: 2000,
							mask:true

						});
						this.backHome();
					}).catch(err=>{
						console.log(err);
						uni.showToast({
							title:err,
							icon:'none',
							duration:2000,
							mask:true
						})
						this.backHome();
					});
				});

			},
			backHome() {
				uni.hideLoading().then(res => {
					uni.showToast({
						title: '提交成功',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'success',
						//显示持续时间为 2秒
						duration: 2000
					}).then(res => {
						uni.switchTab({
							url: "../index"
						});
					});
				});

			},
			fpNumInput(e) {
				const o = e.detail;
				const inputRule = /[^a-zA-Z]/g //修改inputRule 的值
				this.$nextTick(function() {
					this.userAnswer = o.value.replace(inputRule, '');
				});
			}
		},
		onHide() {
			uni.showLoading()
		}
	}
</script>

<style>
	.pageBottom {
		height: 100rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		border: 2rpx solid #dcdcdc;
		background-color: #fff;
	}

	.selectButton {
		height: 50rpx;
		font-size: 20rpx;
		background-color: #2979ff;
		color: #fff;

	}

	.answerList {
		list-style-type: none;
		height: 200rpx;
		display: flex;
		margin: 0;
		padding: 0;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.answerList li {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: 700;
		font-size: 50rpx;

	}

	.notSelect {
		background-color: #94bcff !important;
	}

	.userInput {
		height: 200rpx;
		width: 100%;
		border: 2rpx solid #dcdcdc;
		text-align: center;
	}
</style>