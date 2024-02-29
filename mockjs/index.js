import mock from 'better-mock/dist/mock.mp'

mock.mock('/mock/state', 'GET', {
	"code": 1,
	"msg": "success",
	'data': [{
		'temperature|18-18.1-1': 18,
		'humidity|73-77': 73,
		'soil_moisture|70-80': 60,
		"carbonDioxide|900-1100": 800,
		"Illumination_intensity|7000-9000": 500
	}]
})


let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let formattedHours = hours < 10 ? '0' + hours : hours;
let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

let formattedTime = formattedHours + ':' + formattedMinutes;

let timeList = [];
for (let i = 0; i < 5; i++) {
	currentTime = new Date(currentTime.getTime() - (5 * 60 * 1000));
	hours = currentTime.getHours();
	minutes = currentTime.getMinutes();
	formattedHours = hours < 10 ? '0' + hours : hours;
	formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	let formattedTime = formattedHours + ':' + formattedMinutes;
	timeList.unshift(formattedTime);
}
timeList.push(formattedTime);

function generateRandomArray(length, baseNumber, range) {
    let result = [];
    for (let i = 0; i < length; i++) {
        let randomOffset = Math.floor(Math.random() * (2 * range + 1)) - range;
        result.push(baseNumber + randomOffset);
    }
    return result;
}

let temperatureList = generateRandomArray(6, 18, 0.5);
let humidityList = generateRandomArray(6, 75, 2);
mock.mock('/mock/chart', 'GET', {
	"code": 1,
	"msg": "success",
	'data': [{
		"categories": timeList,
		'series': [
			{
				'name': "温度",
				'data': temperatureList
			},
			{
				'name': "湿度",
				'data': humidityList
			},
			
		]
	}]
})