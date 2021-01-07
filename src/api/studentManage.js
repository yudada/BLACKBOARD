import request from '@/utils/requset'

// 添加学生
export function newStudent(data) {
  return request({
    url: `api/student/add`,
    method: 'post',
    params: data
  })
}

// 学生详情
export function detailStudent(sid) {
  return request({
    url: `api/student/${sid}`,
    method: 'post'
  })
}

// 学生编辑修改
export function saveEditStudent(sid, data) {
  return request({
    url: `api/student/${sid}`,
    method: 'patch',
    params: data
  })
}

// 学生班级信息
export function studentClass() {
  return request({
    url: `api/student/create`,
    method: 'post'
  })
}

// 快速创建学生信息
export function addStudentFast(data) {
  return request({
    url: `api/student/store`,
    method: 'post',
    params: data
  })
}

// 学生导入
export function studentImport(data) {
  return request({
    url: `api/student/import`,
    method: 'post',
    params: { excel: data },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 学生导入模板文件下载
export function studentExport() {
  return request({
    url: `api/student/excel/export`,
    method: 'get'
  })
}

