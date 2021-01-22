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

