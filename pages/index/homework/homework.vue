<template>
	<view class="container">
		<uni-section title="选择您要测试的单元" type="line" padding style="height: calc(100vh - 100px);">
			<uni-data-picker placeholder="请选择英语书及单元" popup-title="请选择书册单元" :localdata="dataTree" v-model="classes"
				@change="onchange">
			</uni-data-picker>
			<button class="startButton uni-shadow-lg uni-mt-3" hover-class="bg-click"
				@click="goHomeworkDetail()">开始作业</button>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classes: '1-1',
				dataTree: [{
						text: "七年级英语",
						value: "1-0",
						children: [{
								text: "上册",
								value: "1-1"
							},
							{
								text: "下册",
								value: "1-2"
							}
						]
					},
					{
						text: "八年级英语",
						value: "2-0",
						children: [{
								text: "上册",
								value: "2-1"
							},
							{
								text: "下册",
								value: "2-2"
							}
						]
					},
					{
						text: "九年级英语",
						value: "3-0",
						children: [{
							text: "全一册",
							value: "3-1",
							children: [{
								text: "Unit 1",
								value: "3-1-1"
							}, {
								text: "Unit 2",
								value: "3-1-2"
							}, {
								text: "Unit 3",
								value: "3-1-3"
							}, {
								text: "Unit 4",
								value: "3-1-4"
							}, {
								text: "Unit 5",
								value: "3-1-5"
							}, {
								text: "Unit 6",
								value: "3-1-6"
							}, {
								text: "Unit 7",
								value: "3-1-7"
							}, {
								text: "Unit 8",
								value: "3-1-8"
							}, {
								text: "Unit 9",
								value: "3-1-9"
							}, {
								text: "Unit 10",
								value: "3-1-10"
							}, {
								text: "Unit 11",
								value: "3-1-11"
							}, {
								text: "Unit 12",
								value: "3-1-12"
							}, {
								text: "Unit 13",
								value: "3-1-13"
							}, {
								text: "Unit 14",
								value: "3-1-14"
							}, ]
						}]
					}
				],
				
			}
		},
		onLoad() {
			this.db = uniCloud.database();
		},
		methods: {
			onchange(e) {
				console.log('onchange:', e);
				console.log(typeof(e))
			},

			goHomeworkDetail() {
				var mynavData = JSON.stringify(this.classes);
				uni.navigateTo({
					url: "homeworkDetail?class=" + mynavData
				});
			}
		}
	}
</script>

<style lang="scss">
	.startButton {
		width: 50%;
		background-color: #2979ff;
		color: white;
	}

	.bg-click {
		top: 3px;
		background-color: #94bcff;
	}
</style>