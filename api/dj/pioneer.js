import request from '@/utils/request'

// 查询党员先锋列表
export function listPioneer(query) {
  return request({
    url: '/yydj/pioneer/list',
    method: 'get',
    params: query
  })
}

// 查询党员先锋详细
export function getPioneer(pioneerId) {
  return request({
    url: '/yydj/pioneer/' + pioneerId,
    method: 'get'
  })
}

// 新增党员先锋
export function addPioneer(data) {
  return request({
    url: '/yydj/pioneer',
    method: 'post',
    data: data
  })
}

// 修改党员先锋
export function updatePioneer(data) {
  return request({
    url: '/yydj/pioneer',
    method: 'put',
    data: data
  })
}

// 删除党员先锋
export function delPioneer(pioneerId) {
  return request({
    url: '/yydj/pioneer/' + pioneerId,
    method: 'delete'
  })
}
