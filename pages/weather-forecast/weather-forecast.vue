<template>
	<view class="">

	</view>
</template>
<script setup>
	// let getLocation = function() {
	// 	uni.request({
	// 		// url: 'https://devapi.qweather.com/v7/weather/now?location=珠海&key=e4e4370b62e8471dbc5c4cbc9e5094d5',
	// 		url: 'https://geoapi.qweather.com/v2/city/lookup?location=%E7%8F%A0%E6%B5%B7&key=e4e4370b62e8471dbc5c4cbc9e5094d5',
	// 		method: 'GET',
	// 		dataType: "json",
	// 		success(res) {
	// 			console.log(res)
	// 		},
	// 		fail(res) {
	// 			console.log(res)
	// 		}
	// 	})
	// uni.getLocation({
	// 	type: 'wgs84',
	// 	success(res) {
	// 		let longitude = res.longitude;
	// 		let latitude = res.latitude;
	// 		console.log(longitude, latitude)
	// 		uni.request({
	// 			url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=e4e4370b62e8471dbc5c4cbc9e5094d5`,
	// 			method: 'GET',
	// 			dataType: "json",
	// 			success(res) {
	// 				console.log(res)
	// 			},
	// 			fail(res) {
	// 				console.log(res)
	// 			}
	// 		})
	// 	},
	// 	fail(res) {
	// 		console.log(res)
	// 	}

	// })
	// uni.getLocation({
	// 	type: 'gcj02',
	// 	geocode: true,
	// 	success: res => {
	// 		this.position = false;
	// 		this.dizhi = res.address.city;
	// 		console.log(res)
	// 	}
	// });
	// }
	let getLocation = function() {
		uni.getLocation({
			type: 'wgs84',
			isHighAccuracy: true, //开启高精度定位
			success(res) {
				let longitude = res.longitude;
				let latitude = res.latitude;
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=e4e4370b62e8471dbc5c4cbc9e5094d5`,
					method: 'GET',
					dataType: "json",
					success(res) {
						console.log(res)
					}
				})
			}
		})
	}
	getLocation()
</script>
<style lang="less" scoped>

</style>