import request from '@/utils/requset'

// 阅读笔记
export function readNote(data) {
  return request({
    url: `api/exercises/reading`,
    method: 'post',
    params: data
  })
}

// 获取用户信息
export function uesrInfo() {
  return request({
    url: `api/user/info`,
    method: 'get'
  })
}

// 班级信息，基础信息+班主任+老师
export function nowClassInfo(id) {
  return request({
    url: `api/classroom/${id}`,
    method: 'get'
  })
}

// 班级学生列表
export function nowStudents(class_id,data) {
  return request({
    url: `api/classroom/${class_id}/students`,
    method: 'get',
    params: {limit:data.limit,stuName:data.stuName}
  })
}

// 作业统计
export function workStatistics () {
  return request({
    url: `api/exercises/statistics`,
    method: 'post',
  })
}

// 试卷列表
export function papersList (data) {
  return request({
    url: `api/shijuan/list`,
    method: 'get',
    params: { limit:data }
  })
}

// 发布试卷
export function papersAdd (data) {
  return request({
    url: `api/shijuan/add`,
    method: 'post',
    params: data
  })
}