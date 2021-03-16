import request from '@/utils/requset'

// 添加题目
export function addQuetions(data) {
  return request({
    url: `api/library/store`,
    method: 'post',
    params: data
  })
}

// 编辑题目
export function editQuetions(id, data) {
  return request({
    url: `api/library/edit/${id}`,
    method: 'post',
    params: data
  })
}

// 题库详情
export function detailQuetions(id) {
  return request({
    url: `api/library/${id}`,
    method: 'get'
  })
}

// 题库列表
export function libraryLists(data) {
  return request({
    url: `api/library/lists`,
    method: 'get',
    params: data
  })
}

// 删除题目
export function setIsCollect(id) {
  return request({
    url: `api/library/${id}`,
    method: 'delete'
  })
}

// 个人题库收藏
export function collectquestions(data) {
  return request({
    url: `api/library/user`,
    method: 'post',
    params: data
  })
}

