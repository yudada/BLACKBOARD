import http from '../utils/http'
import request from '@/utils/requset'

export function newStudent(data) {
    return request({
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