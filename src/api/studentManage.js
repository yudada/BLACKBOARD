import http from '../utils/http'

export function newStudent(data) {
    return http({
      url: `api/student/add`,
      method: 'post',
      params: data
    })
  }

export function newStudentSip(data) {
return http({
    url: `api/student/store`,
    method: 'post',
    params: data
    })
}