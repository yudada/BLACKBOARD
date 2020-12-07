import http from '../../utils/http'

export function accountList(data) {
    return http({
      url: `api/teacher/lists`,
      method: 'post',
      params: data
    })
  }

export function teacherInfo(tid) {
  return http({
    url: `api/teacher/detail/${tid}`,
    method: 'post'
  })
}

export function editTeacher(tid,data) {
  return http({
    url: `api/teacher/edit/${tid}`,
    method: 'post',
    params: data
  })
}