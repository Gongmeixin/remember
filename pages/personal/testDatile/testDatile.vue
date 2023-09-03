<template>
	<view class="answerList">
		<ul>
			<li v-for="(item,index) in rightWordsArr" :key="item._id">
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
							<view class="answerRight" v-if="isRight(item._id)">
								<uni-icons type="checkmarkempty" size="30" style="color: #18bc37;"></uni-icons>
							</view>
							<view class="answerMiss" v-else="isRight(item._id)">
								<uni-icons type="closeempty" size="30" style="color: #e43d33;"></uni-icons>
							</view>
						</view>
					</view>
					<view class="card_bottom">
						<view class="word_pronounce">
							<span>发音：</span>{{item.pronounce}}
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
				rightWordsArr: [{
						"_id": "64a94d6d7df0533b3190ac88",
						"word": "restroom",
						"pronounce": "[restru:m]",
						"paraphrase": "n. （美）洗手间；公共厕所",
						"unit": 3
					}, {
						"_id": "64a94d6d7df0533b3190ac89",
						"word": "stamp",
						"pronounce": "[stæmp]",
						"paraphrase": "n. 邮票；印章",
						"unit": 3
					}, {
						"_id": "64a94d6d7df0533b3190ac8b",
						"word": "grape",
						"pronounce": "[greip]",
						"paraphrase": "n. 葡萄",
						"unit": 3
					}, {
						"_id": "64a94d6d7df0533b3190aca1",
						"word": "direction",
						"pronounce": "[direkʃn; dairekʃn]",
						"paraphrase": "n. 方向；方位",
						"unit": 3
					},
					{
						"_id": "64a94d6d7df0533b3190ac9e",
						"word": "choice",
						"pronounce": "[tʃɔis]",
						"paraphrase": "n. 选择；挑选",
						"unit": 3
					}
				],
				userWordsArr: [{
						"_id": "64ae673de0ec1967647460fa",
						"id": 1,
						"userWord": "brashroom",
						"unit": "3",
						"word_id": "64a94d6d7df0533b3190ac88"
					},
					{
						"_id": "64ae673de0ec1967647460fb",
						"id": 2,
						"userWord": "postpone",
						"unit": "3",
						"word_id": "64a94d6d7df0533b3190ac89"
					},
					{
						"_id": "64ae673de0ec1967647460fc",
						"id": 3,
						"userWord": "manager",
						"unit": "3",
						"word_id": "64a94d6d7df0533b3190ac8a"
					}
				],
				unitIdArr: [],
			}
		},
		methods: {
			//获取用户的测试答案
			getUsrWords() {
				uniCloud.callFunction({
					name: "getUserWords",
					data: {}
				}).then(res => {
					this.userWordsArr = res.result.data;
					console.log(this.userWordsArr)
					this.getUnitId();
				});
			},
			//获取用户答过题的单元id
			getUnitId() {
				const unitId = [];
				this.userWordsArr.forEach(item => {
					let res = unitId.some(i => i == item.unit);
					if (!res) {
						unitId.push(item.unit);
						console.log(item.unit);
						this.getRightWords(item.unit);
					}
					this.unitIdArr = unitId;
					console.log(this.unitIdArr);
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
					this.rightWordsArr.push(res.result.data);
					console.log(this.rightWordsArr);
					uni.hideLoading();
				});
			},

		},
		onLoad() {
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// }).then(res => {
			// 	this.getUsrWords();
			// })
		},
		computed: {
			//查找用户的答案
			findUserWord() {
				return function(_id) {
					let AIndex = this.userWordsArr.findIndex(item => item.word_id == _id);
					if (AIndex <= -1) {
						return "您未作答！"
					} else {
						return this.userWordsArr[AIndex].userWord
					}
				}
			},

			isRight() {
				return function(_id) {
					let AIndex = this.userWordsArr.findIndex(item => item.word_id == _id);
					if (AIndex <= -1) {
						return false
					} else {
						return true
					}
				}
			}
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
</style>