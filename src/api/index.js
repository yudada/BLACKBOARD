import http from '../utils/http'

export function classList() {
    return http({
      url: `api/classroom/myList`,
      method: 'get',
      params: { params: {type: 1} }
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
