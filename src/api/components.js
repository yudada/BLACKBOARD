import request from '@/utils/requset'

// 练习对象列表
export function practiceSubject() {
  return request({
    url: `api/common/constant`,
    method: 'get'
  })
}

// 练习对象列表
export function ExerciseLists(data) {
  return request({
    url: `api/library/lists`,
    method: 'get',
    params: data
  })
}

// 实验列表
export function experimentsLists(data) {
  return request({
    url: `api/experiments/lists`,
    method: 'post',
    params: data
  })
}

// 模型列表
export function modelsLists(data) {
  return request({
    url: `api/models/lists`,
    method: 'post',
    params: data
  })
}