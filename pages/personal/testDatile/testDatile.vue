<template>
	<view class="answerList">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="unitIdArr" style-type="text" active-color="'#007aff'"
				@clickItem="onClickItem" />
		</view>
		<ul>
			<li v-for="(item,index) in rightWordsArr" :key="index" v-show="current+1 === item.unit">
				<view class="answerCard">
					<view class="card_top">
						<view class="top_left">
							<view class="answerFont">
								<text style="color: #18bc37;">正确答案:</text>{{item.word}}
							</view>
							<view class="answerFont">
								<text>你的答案:</text><span>{{findUserWord(item._id)}}</span>
							</view>
						</view>
						<view class="top_right">
							<view class="answerRight" v-if="findUserWord(item._id,item.word) == item.word">
								<uni-icons type="checkmarkempty" size="30" color='green'></uni-icons>
							</view>
							<view class="answerMiss" v-else="findUserWord(item._id,item.word) == item.word">
								<uni-icons type="closeempty" size="30" color='red'></uni-icons>
							</view>
						</view>
					</view>
					<view class="card_bottom">
						<view class="word_pronounce">
							<span>发音：</span>{{item.pronounce}}
							<uni-icons custom-prefix="custom-icon" type="sound" size="18"
								@click="playAudio(item.word)"></uni-icons>
						</view>
						<view class="word_paraphrase">
							<span>释义：</span>{{item.paraphrase}}
						</view>
					</view>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightWordsArr: [],
				userWordsArr: [],
				unitIdArr: [],
				score: 0,
				current: 0
			}
		},
		methods: {
			//获取用户的测试答案
			getUsrWords(_id) {
				uniCloud.callFunction({
					name: "getUserWords",
					data: {
						openid: _id
					}
				}).then(res => {
					this.userWordsArr = res.result.data;
					console.log(this.userWordsArr);
					this.getUnitId();
				});
			},
			//获取用户答过题的单元id
			getUnitId() {
				console.log(this.unitIdArr);
				let unitId = this.unitIdArr;
				this.userWordsArr.forEach(item => {
					let res = unitId.some(i => i == item.unit + '单元');
					if (!res) {
						this.unitIdArr.push(item.unit + '单元');
						this.getRightWords(item.unit);
					}
				});
			},
			//获取用户答过题的正确单元单词
			getRightWords(id) {
				uniCloud.callFunction({
					name: "getWords",
					data: {
						unitId: id
					}
				}).then(res => {
					console.log(res.result.data);
					this.rightWordsArr = this.rightWordsArr.concat(res.result.data);
					console.log(this.rightWordsArr)
					uni.hideLoading();
				});
			},
			playAudio: function(word) {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src =
					'http://dict.youdao.com/dictvoice?type=0&audio=' + word;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			computScore() {
				this.score++;
				console.log(this.score)
			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					console.log(this.current)
				}
			}
		},
		onLoad() {
			var that = this;
			uni.showLoading({
				title: '加载中...',
				mask: false
			}).then(res => {
				uni.getStorage({
					key: 'openid',
					success(res) {
						console.log(res)
						that.getUsrWords(res.data);
					}
				});
			})
		},
		computed: {
			//查找用户的答案
			findUserWord() {
				return function(_id, word) {
					let AIndex = this.userWordsArr.findIndex(item => item.word_id == _id);
					if (AIndex <= -1) {
						return "您未作答！"
					} else {
						if (this.userWordsArr[AIndex].userWord == word) {}
						return this.userWordsArr[AIndex].userWord
					}
				}
			},
		}
	}
</script>

<style>
	.answerList {
		width: 100%;
		height: 100%;
	}

	.answerList ul {
		list-style-type: none;
		padding: 0;
	}

	.answerCard {
		width: 100%;
		height: 250rpx;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.card_top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.card_bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.answerFont {
		margin-top: 10rpx;
	}

	.answerFont text {
		font-weight: 700;
	}

	.top_left,
	.top-right {
		margin: 10rpx;
	}

	.uni-common-mt {
		margin-top: 10px;
	}

	.uni-padding-wrap {
		padding: 0px 30px;
	}
</style>