import {
	create
} from '@/utils/request1.js'
const request1 = create();


// /** 获取定位详情
//  */
// const getLocationDetail = (data) => {
// 	let url = `https://apis.map.qq.com/ws/geocoder/v1`
// 	return request.get(url, data)
// }
// /** 获取天气
//  * @param {Object} province 省
//  * @param {Object} city  市
//  * @param {Object} county 县
//  */
// const getWeather = (data) => {
// 	let url = `https://wis.qq.com/weather/common`
// 	return request1.get(url, data)
// }

// export default {
// 	getWeather,

// }
import request from '@/utils/request'

export const getLocationDetail = (location, key) => {
	// 构造请求的 URL，确保在 location 和 key 之间添加 & 符号
	const url = `/geocoder?location=${location}&key=${key}`;
	return request({
		url: url,
		method: 'get',
	});
};
export const getWeather = (source, weatherType, province, city, county) => {
	const url =
		`/weather?source=${source}&weather_type=${weatherType}&province=${province}&city=${city}&county=${county}`;
	return request({
		url: url,
		method: 'get',
	});
};

// export const getWeather = (location, key) => {
// 	// 构造请求的 URL，确保在 location 和 key 之间添加 & 符号
// 	const url = `/geocoder?location=${location}&key=${key}`;

// 	return request({
// 		url: url,
// 		method: 'get',
// 	});
// };