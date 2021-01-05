import request from '@/utils/requset'

// 错题锦囊
export function wrongAnswer(data) {
  return request({
    url: `api/exercises/wrongAnswer`,
    method: 'post',
    params: data
  })
}

// 错题锦囊-学生详情
export function wrongStudents(data) {
  return request({
    url: `api/exercises/wrongStudents`,
    method: 'post',
    params: data
  })
}