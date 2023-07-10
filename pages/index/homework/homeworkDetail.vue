<template>
	<view>
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
			v-model="userAnswer">
		<view class="pageBottom">
			<button v-bind:class="['selectButton',currentIndex==0?'notSelect':'']" @click="lastOne()"
				hover-class="notSelect">上一题</button>
			<span>{{currentIndex+1+"/"+total}}</span>
			<button v-bind:class="['selectButton',currentIndex==answerArr.length-1?'notSelect':'']" @click="nextOne()"
				hover-class="notSelect">下一题</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testHour: 0,
				testMinute: 2,
				testSecond: 0,
				class: null,
				answerArr: [],
				total: 0,
				currentIndex: 0,
				userAnswer: '',
				userAnswerArr: [],
				bookId:0,
				volumeId:0,
				unitId:0
			}
		},
		onLoad(option) {
			console.log(option);
			this.class = JSON.parse(option.class); // 字符串转对象
			var selectdetail = this.class.split("-");
			console.log(this.class.split("-"));
			if(selectdetail.length>0){
				this.bookId=selectdetail[0];
				if(selectdetail.length>1){
					this.volumeId=selectdetail[1];
					if(selectdetail.length>2){
						this.unitId=selectdetail[2];
					}
				}
			}
			this.getWords();
		},
		methods: {
			timeup() {
				uni.showToast({
				});
			},
			getWords() {
				uniCloud.callFunction({
					name: "getWords",
					data: {
						unitId:this.unitId
					}
				}).then(res => {
					console.log(res);
					this.answerArr = res.result.data;
					this.total = this.answerArr.length;
				});
			},
			lastOne() {
				if (this.currentIndex >= 1) {
					this.currentIndex--;
					let s = {
						id: this.currentIndex + 1
					};
					console.log(s.id, this.userAnswerArr.findIndex((item) => item.id === s.id));
					if (this.userAnswerArr.findIndex((item) => item.id === s.id) > -1) {
						var index = this.userAnswerArr.findIndex((item) => item.id === s.id);
						this.userAnswer = this.userAnswerArr[index].word;
					}else{
						this.userAnswer ='';
					}
				}
			},

			nextOne() {
				let uAnswerArr = this.userAnswerArr;
				this.currentIndex++;
				if (this.currentIndex < this.answerArr.length - 1) {
					let u = {
						id: this.currentIndex,
						word: this.userAnswer
					};
					console.log(this.userAnswerArr)
					if (this.userAnswerArr.findIndex(item => item.id === u.id) <= -1 && this.userAnswer != '') {
						console.log(uAnswerArr.push(u));
						console.log(this.userAnswerArr);
					}
					if (this.userAnswerArr.findIndex((item) => item.word === u.word) > -1) {
						var index = this.userAnswerArr.findIndex((item) => item.word === u.word);
						this.userAnswer = this.userAnswerArr[index].word;
					}
					this.userAnswer = '';
				}
			}
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