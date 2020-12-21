import http from '../utils/http'
import request from '@/utils/requset'

// 班级学生
export function studentName(data) {
    return request({
      url: `api/student/getName`,
      method: 'post',
      params: data
    })
  }

  // 公告配置-得分项
export function scoreTagList() {
  return request({
    url: `api/common/constant`,
    method: 'get'
  })
}

// 学生评分
export function score(scoreData) {
  return request({
    url: `api/student/score`,
    method: 'post',
    params: scoreData
  })
}

// 学生个人控屏
export function studentScreen(data) {
  return request({
    url: `api/interactive/studentScreen`,
    method: 'post',
    params: data
  })
}

// 班级控屏
export function classScreen(data) {
  return request({
    url: `api/interactive/classScreen`,
    method: 'post',
    params: data
  })
}

// 创建课件
export function addCourseWareStore(data) {
  return http({
    url: `api/interactive/courseWareStore`,
    method: 'post',
    params: data
  })
}

// 课件列表
export function courseWareList(data) {
  return http({
    url: `api/interactive/courseWareList`,
    method: 'post',
    params: data
  })
}

// 编辑课件
export function courseWareEdit(id, data) {
  return http({
    url: `api/interactive/courseWareEdit/${id}`,
    method: 'post',
    params: data
  })
}

// 课件详情
export function courseWareDetail(id) {
  return http({
    url: `api/interactive/courseWareDetail/${id}`,
    method: 'get'
  })
}

// 删除课件
export function deleteCourseWare(id) {
  return http({
    url: `api/interactive/courseWare/${id}`,
    method: 'delete'
  })
}
