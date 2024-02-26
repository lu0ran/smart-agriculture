<template>
	<view>
		<view class='container'>
			<text class="text">设备状态</text>
			<text class="state">{{state}}</text>
		</view>
		<view class='container'>
			<text class="text">报警信息</text>
			<text class="warning">{{warning}}</text>
		</view>
		<view class='container'>
			<h4 style="font-size:2.2vh;" class="text">设备控制</h4>
		</view>
		<view class='container'>
			<text class="text1">风扇</text>
			<switch class="switch" @change="fanSwitch()" />
		</view>
		<view class="image-container">
			<image src="../../static/images/风机-关.png" class="img1" v-show="fan" />
			<image src="../../static/images/风机-开.png" class="img2" v-show="!fan" />
		</view>
		<view class='container'>
			<text class="text1">水泵</text>
			<switch class="switch" />
		</view>
		<view class="image-container">
			<image src="../../static/images/水泵-关.png" />
			<image src="../../static/images/水泵-开.png" />
		</view>
		<view class='container'>
			<text class="text2">日光灯</text>
			<switch class="switch" />
		</view>
		<view class="image-container">
			<image src="../../static/images/照明-关.png" />
			<image src="../../static/images/照明-开.png" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const state = ref('在线')
	const warning = ref('传感器数据正常')
	let fan = ref(true)
	const fanSwitch = function() {
		fan.value = !fan.value
	}
	const test = function() {

	}
</script>

<style scoped>
	.img1 {
		height: 50vw;
		width: 50vw;
		transform: translate(50%, 0%);
	}

	.img2 {
		height: 50vw;
		width: 50vw;
		transform: translate(50%, -5%);
	}

	.image-container {
		background-color: white;
		margin-bottom: 1.5px;
	}

	.text {
		font-size: 2vh;
		position: absolute;
		top: 50%;
		left: 13%;
		transform: translate(-50%, -50%);
	}

	.text1 {
		font-size: 2vh;
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translate(-50%, -50%);
	}

	.text2 {
		font-size: 2vh;
		position: absolute;
		top: 50%;
		left: 13%;
		transform: translate(-55%, -50%);
	}

	.state {
		color: lightslategrey;
		font-size: 2vh;
		position: absolute;
		top: 50%;
		left: 90%;
		transform: translate(-50%, -50%);
	}

	.warning {
		color: lightslategrey;
		font-size: 2vh;
		position: absolute;
		top: 50%;
		left: 90%;
		/* 与 state 右对齐 */
		transform: translate(-85%, -50%);
		white-space: nowrap;
		/* 不换行 */
	}

	.container {
		width: 100%;
		display: flex;
		position: relative;
		align-items: center;
		background-color: white;
		height: 7vh;
		margin-bottom: 1.5px;
		justify-content: ;
	}

	.switch {
		position: relative;
		left: 84vw;
		margin-right: 1vw;
	}
</style>