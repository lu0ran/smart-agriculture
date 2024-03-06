<template>
	<div class="content">
		<div class="all-content">
			<header>
				<div class="header-wrapper">
					<div class="header-text">
						<m-skeleton :loading="loading" width="300rpx" height="30rpx">
							<div @click="locationChange">
								<span class="iconfont icon-location w-icon"></span>
								{{ locationInfo.province }} {{ locationInfo.city }} {{ locationInfo.county }}
							</div>
						</m-skeleton>
					</div>
				</div>
			</header>
			<div class="main-wrapper">
				<div class="main-txt">
					<m-skeleton :loading="loading" width="150rpx" height="150rpx">
						<span class="txt-temperature">{{ resultData.observe.degree }}°</span>
					</m-skeleton>
					<m-skeleton :loading="loading" :left="10" width="60rpx" height="60rpx">
						<span class="txt-name">{{ resultData.observe.weather_short }}</span>
					</m-skeleton>
				</div>
				<div class="txt-other">
					<m-skeleton :loading="loading" width="500rpx" height="30rpx">
						<span class="txt-wind">东北风 {{ resultData.observe.wind_power }}级</span>
						<span class="txt-humidity">湿度 {{ resultData.observe.humidity }}%</span>
						<span class="txt-kpa">气压 {{ resultData.observe.pressure }}Hpa</span>
					</m-skeleton>
				</div>
				<div class="txt-tips">
					<m-skeleton :loading="loading" width="500rpx" height="50rpx">
						<span class="txt-info">{{ resultData.tips.observe && resultData.tips.observe[0] }}</span>
					</m-skeleton>
				</div>
				<div class="weather-img">
					<m-skeleton :loading="loading" width="200rpx" height="200rpx">
						<img v-if="resultData.observe.weather_code"
							:src="`//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/${resultData.observe.weather_code}.png`"
							mode="">
					</m-skeleton>
				</div>
			</div>
			<div class="hours-wrapper">
				<m-skeleton :loading="loading" width="100%" height="150rpx" />
				<card-block v-if="!loading" title="逐小时预报">
					<div class="hours-list">
						<div class="hours-item" v-for="(item, index) in resultData.forecast_1h" :key="index">
							<div class="item-time">{{ formatTimeToHours(item.update_time) }}</div>
							<div class="item-icon">
								<img :src="`//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/${item.weather_code}.png`"
									mode="">
							</div>
							<div class="item-degree">{{ item.degree }}°</div>
						</div>
					</div>
				</card-block>
			</div>
			<div class="living-index-wrapper">
				<div class="living-item" v-for="(item, index) in livingArr" :key="index">
					<m-skeleton :isBlock="true" :loading="loading" width="100%" height="200rpx">
						<card-block>
							<div :class="item.icon"></div>
							<div class="info">{{ item.name }} {{ item.info }}</div>
						</card-block>
					</m-skeleton>
				</div>
			</div>
		</div>
		<w-picker mode="region" :defaultVal="[locationInfo.province, locationInfo.city, locationInfo.county]"
			:areaCode="areaCode" :hideArea="false" @cancel="locationCancel" @confirm="locationConfirm"
			themeColor="#659af8" ref="region"></w-picker>
	</div>
</template>

<script>
	// import $weatherApi from '@/api/weather';
	import {
		getWeather,
		getLocationDetail
	} from "@/api/weather.js"
	// components
	import CardBlock from '@/components/CardBlock';
	import MSkeleton from '@/components/MSkeleton/index';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import {
		getAreaCodeArr
	} from '@/components/w-picker/utils';
	export default {
		components: {
			CardBlock,
			MSkeleton,
			wPicker
		},
		data() {
			return {
				result: "",
				loading: true,
				areaCode: ['44', '4403', '440305'],
				locationInfo: {
					province: '广东省',
					city: '深圳市',
					county: '宝安区'
				},
				livingArr: [{
						icon: 'icon chuanyishushi',
						name: '穿衣',
						info: ''
					},
					{
						icon: 'icon yusan',
						name: '雨伞',
						info: ''
					},
					{
						icon: 'icon ganmao',
						name: '感冒',
						info: ''
					},
					{
						icon: 'icon xiche',
						name: '洗车',
						info: ''
					},
					{
						icon: 'icon yundong',
						name: '运动',
						info: ''
					},
					{
						icon: 'icon fangsai',
						name: '防晒',
						info: ''
					}
				],
				resultData: {
					forecast_1h: [],
					observe: {
						degree: 0,
						humidity: 0,
						precipitation: 0,
						pressure: 0,
						update_time: '',
						weather: '',
						weather_code: '',
						weather_short: '',
						wind_direction: '',
						wind_power: ''
					},
					tips: {
						observe: {}
					}
				},
				areaPickerInfo: {}
			};
		},
		onRead() {},
		onLoad() {
			this.getLocation();
		},
		computed: {},
		methods: {
			getLocation() {
				let that = this;
				uni.getLocation({
					// #ifdef MP-WEIXIN
					type: 'wgs84',
					// #endif
					async success(res) {
						const {
							latitude,
							longitude
						} = res;
						console.log(res, "1")
						const location = `${latitude},${longitude}`
						const key = 'XJLBZ-QFTHJ-ZODFA-KNR74-WGRCO-QEB56'
						getLocationDetail(location, key).then(res => {
							this.result = res.result
							console.log(this.result, "result")
							const province = this.result.address_component.province
							const city = this.result.address_component.city
							const district = this.result.address_component.district
							console.log(province, city, district, "123")
							that.areaCode = getAreaCodeArr(province, city, district);
							console.log(that.areaCode);
							that.GetWeather(province, city, district);
							that.$nextTick(() => {
								that.loading = false;
							})
						})


					},
					fail() {
						uni.showModal({
							content: '检测到您没打开定位权限，是否去设置打开？',
							confirmText: '确认',
							cancelText: '取消',
							success: function(res) {
								if (res.confirm) {
									// #ifdef MP-WEIXIN
									wx.openSetting({
										success: res => {}
									});
									// #endif
									// #ifdef MP-ALIPAY
									my.openSetting({
										success: res => {}
									});
									// #endif
								}
							}
						});
					}
				});
			},
			async GetWeather(province, city, district) {
				try {
					this.loading = true;
					const source = "xw"
					const weather_type = encodeURIComponent(
						"observe|alarm|air|forecast_1h|forecast_24h|index|limit|tips|rise")


					getWeather(source, weather_type, province, city, district).then(res => {
						console.log(res, "321")
						let result = res
						if (Object.keys(result.data.observe).length == 0) throw new Error();
						this.resultData = result.data;
						let self = this;
						// 生活指数
						let indexs = Object.keys(self.resultData.index).map(key => self.resultData.index[key]);
						this.livingArr.forEach(item => {
							let findItem = indexs.find(it => it.name == item.name);
							if (findItem) {
								item.info = findItem.info;
							}
						});
						this.locationInfo.province = province;
						if (province == city) {
							this.locationInfo.city = '';
						} else {
							this.locationInfo.city = city;
						}
						this.locationInfo.county = district;
						this.loading = false;

					})


				} catch (e) {
					//TODO handle the exception
					uni.showToast({
						title: '抱歉，暂无该地区天气',
						icon: 'none'
					});
					this.loading = false;
					console.log(e);
				}
			},
			locationChange() {
				this.$refs.region.show();
			},
			async locationConfirm(val) {
				console.log(val);
				this.areaPickerInfo = val;
				let province = this.areaPickerInfo.checkArr[0];
				let city = this.areaPickerInfo.checkArr[1];
				let county = this.areaPickerInfo.checkArr[2];
				if (this.areaPickerInfo.checkArr[1] == '市辖区' || this.areaPickerInfo.checkArr[1] == '县') {
					city = province;
				}
				await this.getWeather(province, city, county);
			},
			locationCancel() {
				this.areaPickerInfo = null;
			},
			onConfirm() {},
			formatTimeToHours(time) {
				let currentTime = time.substring(0, 10);
				let hours = currentTime.substr(-2);
				return hours + ':00';
				// return hours;
			}
		}
	};
</script>

<style scoped lang="scss">
	page {
		background: #f6f9fe;
	}

	.header-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 5rpx;
		background-color: #659af8;

		.header-text {
			font-size: 30rpx;
			color: #fff;
		}
	}

	.main-wrapper {
		height: 600rpx;
		padding: 0rpx 55rpx;
		background-color: #659af8;
		color: #ffffff;
		position: relative;

		.main-txt {
			.txt-temperature {
				font-size: 108rpx;
			}

			.txt-name {
				// padding-left: 10rpx;
			}
		}

		.txt-other {
			margin: 25rpx 0rpx;
			font-size: 30rpx;

			text:not(:last-child) {
				margin-right: 15rpx;
			}
		}

		.txt-tips {
			position: relative;
			padding-left: 5rpx;

			.txt-info:before {
				content: '';
				float: left;
				transform: translateY(25%);
				margin-right: 13rpx;
				height: 30rpx;
				width: 30rpx;
				background: #fff;
				border-radius: 50%;
				// padding-left: 13rpx;
			}
		}

		.weather-img {
			position: absolute;
			bottom: 25rpx;
			right: 20rpx;

			image {
				width: 230rpx;
				height: 230rpx;
			}
		}
	}

	.hours-wrapper {
		margin: 15rpx 0rpx;
		padding: 0rpx 15rpx;

		.hours-list {
			display: flex;
			overflow-x: auto;

			// 隐藏滚动条样式
			&::-webkit-scrollbar {
				display: none;
			}

			.hours-item {
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;

				&:not(:last-child) {
					margin-right: 55rpx;
				}

				.item-icon {
					margin: 10rpx 0rpx;

					image {
						width: 88rpx;
						height: 88rpx;
					}
				}

				.item-time {
					color: #8a9baf;
					font-size: 30rpx;
				}

				.item-degree {
					font-size: 35rpx;
				}
			}
		}
	}

	.living-index-wrapper {
		display: flex;
		padding: 0rpx 15rpx;
		flex-wrap: wrap;
		justify-content: space-between;

		.living-item {
			margin: 30rpx 0rpx;
			flex-basis: 48%;

			.info {
				font-size: 35rpx;
				color: black;
				text-align: center;
			}
		}

		$imgUrl: url('http://mat1.gtimg.com/pingjs/ext2020/weather/2017/images/sprites/sprite-7d98dbada9.png');

		.icon {
			height: 34px;
			width: 34px;
			display: block;
			margin: 0 auto 22rpx;
			background-image: $imgUrl;

			&.chuanyishushi {
				background-position: -80px -37px;
			}

			&.yusan {
				background-position: 0 -154px;
			}

			&.ganmao {
				background-position: -74px -154px;
			}

			&.xiche {
				background-position: -154px -111px;
			}

			&.yundong {
				background-position: -37px -43px;
			}

			&.fangsai {
				background-position: 0 -43px;
			}
		}
	}

	.w-icon {
		color: #ffffff;
		margin-right: 10rpx;
	}
</style>