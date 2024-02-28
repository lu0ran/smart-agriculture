<template>
	<view class="container">
		<view class="banner">
			<text class="title">传感器数据</text>
			<view class="container2">
				<view class="box">
					<image src="../../static/images/温度.png" class='box-image'></image>
					<text class="box-text">
						温度:{{}}
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/湿度.png" class='box-image'></image>
					<text class="box-text">
						湿度:{{}}
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/二氧化碳浓度.png" class='box-image'></image>
					<text class="box-text">
						CO₂:{{}}
					</text>
				</view>
			</view>
			<view class="container2">
				<view class="box">
					<image src="../../static/images/土壤湿度.png" style="height: 7vh;width: 7vh;margin: 0 auto;"></image>
					<text class="box-text">
						土壤湿度:{{}}
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/光照强度.png" style="height: 7.5vh;width: 7.5vh;margin: 0 auto;">
					</image>
					<text class="box-text">
						光照强度:{{}}
					</text>
				</view>
			</view>
		</view>
		<view class="ub">
			<text class="title">温湿度监控图</text>
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" class="chart" />
		</view>
	</view>

</template>

<script>
import{getData}from '../../api/mock.js';
	export default {
		data() {
			return {
				chartData: {},
			};
		},
		onReady() {
			this.getServerData();
			this.getData2();
		},
		methods: {
			getData2() {
				getData().then(res => {
					console.log(res);
				});
		 	},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					let res = {
						categories: ["20:30", "20:35", "20:40", "20:45", "20:50", "20:55"],
						series: [{
								name: "温度",
								data: [35, 36, 31, 33, 30, 34]
							},
							{
								name: "湿度",
								data: [25.5, 26, 25.9, 25.4, 25, 25.5]
							},

						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped>
	.chart {
		height: 40vh;
	}

	.title {
		margin-left: 1vh;
		font-weight: bold;
		font-size: 17px;
	}

	.banner {
		margin: 0 auto;
		margin-bottom: 1vh;
		margin-top: 1vh;
		width: 95vw;
		background-color: white;
		border-radius: 10px;
		overflow: hidden;
	}

	.box-image {
		height: 9vh;
		width: 9vh;
		margin: 0 auto;
	}

	.box-text {
		margin-top: 1vh;
		text-align: center;
		justify-content: center;
	}

	.container {
		height: 100%;
		width: 100%;
	}

	.container2 {
		display: flex;
		justify-content: space-evenly;
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		width: 30vw;
		height: 15vh;
	}

	.ub {
		background-color: white;
		margin: 0 auto;
		border-radius: 10px;
		height: 45vh;
		width: 95vw;
		margin-bottom: 3vh;
	}
</style>