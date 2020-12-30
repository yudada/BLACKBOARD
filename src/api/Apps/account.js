import request from '@/utils/requset'

// 账号管理列表
export function accountList(data) {
    return request({
      url: `api/teacher/lists`,
      method: 'post',
      params: data
    })
  }

// 教师账号详情
export function teacherInfo(tid) {
  return request({
    url: `api/teacher/detail/${tid}`,
    method: 'post'
  })
}

// 编辑教师账号
export function editTeacher(tid,data) {
  return request({
    url: `api/teacher/edit/${tid}`,
    method: 'post',
    params: data
  })
}

// 添加教师前获取基础信息
export function teacherBasics(data) {
  return request({
    url: `api/teacher/create`,
    method: 'post',
    params: data
  })
}

// 添加教师账号
export function addTeacher(data) {
  return request({
    url: `api/teacher/store`,
    method: 'post',
    params: data
  })
}