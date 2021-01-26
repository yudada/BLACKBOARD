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