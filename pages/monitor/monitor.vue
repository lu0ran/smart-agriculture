<template>
	<view class="container">
		<view class="banner">
			<text class="title">传感器数据</text>
			<view class="container2">
				<view class="box">
					<image src="../../static/images/温度.png" class='box-image'></image>
					<text class="box-text">
						温度:{{ data.temperature }}℃
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/湿度.png" class='box-image'></image>
					<text class="box-text">
						湿度:{{ data.humidity }}RH
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/二氧化碳浓度.png" class='box-image'></image>
					<text class="box-text">
						CO₂:{{ data.carbonDioxide }}ppm
					</text>
				</view>
			</view>
			<view class="container2">
				<view class="box">
					<image src="../../static/images/土壤湿度.png" style="height: 7vh;width: 7vh;margin: 0 auto;"></image>
					<text class="box-text">
						土壤湿度:{{ data.soil_moisture }}%
					</text>
				</view>
				<view class="box">
					<image src="../../static/images/光照强度.png" style="height: 7.5vh;width: 7.5vh;margin: 0 auto;">
					</image>
					<text class="box-text">
						光照强度:{{ data.Illumination_intensity }}lux
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

<script setup>
	import {
		onMounted
	} from "vue";
	import {
		ref
	} from "vue";
	
	onMounted(() => {getData(),getChartData()});
	let time = new Date();
	let data = ref({});
	const getData = function() {
		uni.request({
			url: '/mock/state', // mock地址
			success: (res) => {
				console.log("请求成功，返回的数据为：", res.data.data[0]);
				data.value = res.data.data[0]; // 更新数据
			},
			fail: (error) => {
				console.log("请求失败，错误信息为：", error);
				// 在这里处理请求失败的情况
			}
		})
	};

	let chartData = ref()
	const getChartData = function() {
      //模拟从服务器获取数据时的延时
    //   setTimeout(() => {
    //     //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     let res = {
    //         categories: ["2018","2019","2020","2021","2022","2023"],
    //         series: [
    //           {
    //             name: "成交量A",
    //             data: [35,8,25,37,4,20]
    //           },
    //           {
    //             name: "成交量B",
    //             data: [70,40,65,100,44,68]
    //           },
    //           {
    //             name: "成交量C",
    //             data: [100,80,95,150,112,132]
    //           }
    //         ]
    //       };
    //   	chartData.value = res
    //   }, 500);
	uni.request({
			url: '/mock/chart', // mock地址
			success: (res) => {
				console.log("请求成功，返回的图表数据为：", res.data.data[0]);
				chartData.value = res.data.data[0];
			},
			fail: (error) => {
				console.log("请求失败，错误信息为：", error);
				// 在这里处理请求失败的情况
			}
		})
    }
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
		height: 50vh;
		width: 95vw;
		margin-bottom: 3vh;
	}
</style>