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
export function workStatistics (data) {
  return request({
    url: `api/exercises/statistics`,
    method: 'post',
    params: data
  })
}

// 作业统计-单个学生统计
export function studentStatistic (data) {
  return request({
    url: `api/exercises/studentStatistic`,
    method: 'post',
    params: data
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

// 试卷编辑
export function papersEdit (id,data) {
  return request({
    url: `api/shijuan/edit/${id}`,
    method: 'post',
    params: data
  })
}

// 试卷详情
export function parperDetail (id) {
  return request({
    url: `api/shijuan/detail/${id}`,
    method: 'post'
  })
}

// 试卷删除
export function parperDelete (id) {
  return request({
    url: `api/shijuan/${id}`,
    method: 'delete'
  })
}