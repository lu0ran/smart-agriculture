import request from '@/utils/request'

// 查询党建新闻列表
export function listNews(query) {
  return request({
    url: '/yydj/news/list',
    method: 'get',
    params: query
  })
}

// 查询党建新闻详细
export function getNews(newsId) {
  return request({
    url: '/yydj/news/' + newsId,
    method: 'get'
  })
}

// 新增党建新闻
export function addNews(data) {
  return request({
    url: '/yydj/news',
    method: 'post',
    data: data
  })
}

// 修改党建新闻
export function updateNews(data) {
  return request({
    url: '/yydj/news',
    method: 'put',
    data: data
  })
}

// 删除党建新闻
export function delNews(newsId) {
  return request({
    url: '/yydj/news/' + newsId,
    method: 'delete'
  })
}