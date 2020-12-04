import http from '../utils/http'

export function studentName(data) {
    return http({
      url: `api/student/getName`,
      method: 'post',
      params: data
    })
  }

export function scoreTagList() {
  return http({
    url: `api/common/constant`,
    method: 'get'
  })
}

export function score(scoreData) {
  return http({
    url: `api/student/score`,
    method: 'post',
    params: scoreData
  })
}

export function addCourseWareStore(data) {
  return http({
    url: `api/interactive/courseWareStore`,
    method: 'post',
    params: data
  })
}

export function courseWareList(data) {
  return http({
    url: `api/interactive/courseWareList`,
    method: 'post',
    params: data
  })
}

export function courseWareEdit(id, data) {
  return http({
    url: `api/interactive/courseWareEdit/${id}`,
    method: 'post',
    params: data
  })
}

export function courseWareDetail(id) {
  return http({
    url: `api/interactive/courseWareDetail/${id}`,
    method: 'get'
  })
}

export function deleteCourseWare(id) {
  return http({
    url: `api/interactive/courseWare/${id}`,
    method: 'delete'
  })
}