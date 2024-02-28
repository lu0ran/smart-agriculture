import {
	request2
} from '@/utils/request2'

export const getData = data => {
	return request2({
		url: "/api/test", //对应mock中的接口
		method: 'GET', //对应mock中的请求的type
		data
	})
}