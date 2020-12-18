import request from '@/utils/requset'

// 添加学生
export function newStudent(data) {
    return request({
      url: `api/student/add`,
      method: 'post',
      params: data
    })
  }

// 学生详情
export function detailStudent(sid) {
  return request({
    url: `api/student/${sid}`,
    method: 'post'
  })
}

