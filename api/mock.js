import
request from '@/utils/request'

export const getData = data => {
	return request({
		url: "/api/test", //对应mock中的接口
		method: 'GET', //对应mock中的请求的type
		data
	})
}