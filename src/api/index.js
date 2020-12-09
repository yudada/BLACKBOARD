import http from '../utils/http'

export function classList(type) {
    return http({
      url: `api/classroom/myList`,
      method: 'get',
      params: { params: {type: type} }
    })
  }
  
export function changeClass(id) {
  return http({
    url: `api/classroom/switch`,
    method: 'post',
    params: {class_id: id} 
  })
}

export function classInfo() {
  return http({
    url: `api/user/info`,
    method: 'get'
  })
}

export function commonConfiguration() {
  return http({
    url: `api/common/constant`,
    method: 'get'
  })
}