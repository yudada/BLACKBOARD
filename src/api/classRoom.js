import request from '@/utils/requset'

// 教师信息
export function teacherInfo() {
  return request({
    url: `api/teacher/info`,
    method: 'post'
  })
}

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
    params: {screenStatus: data}
  })
}

// 创建课件
export function addCourseWareStore(data) {
  return request({
    url: `api/interactive/courseWareStore`,
    method: 'post',
    params: data
  })
}

// 课件列表
export function courseWareList(data) {
  return request({
    url: `api/interactive/courseWareList`,
    method: 'post',
    params: data
  })
}

// 编辑课件
export function courseWareEdit(id, data) {
  return request({
    url: `api/interactive/courseWareEdit/${id}`,
    method: 'post',
    params: data
  })
}

// 课件详情
export function courseWareDetail(id) {
  return request({
    url: `api/interactive/courseWareDetail/${id}`,
    method: 'get'
  })
}

// 删除课件
export function deleteCourseWare(id) {
  return request({
    url: `api/interactive/courseWare/${id}`,
    method: 'delete'
  })
}

// 课堂练习-发布
export function classExerciseAdd(data) {
  return request({
    url: `api/exercises/classExercise`,
    method: 'post',
    params: data
  })
}

// 保存分组
export function saveStudentGroup(data) {
  return request({
    url: `api/student/group`,
    method: 'post',
    params: data
  })
}

// 取消分组
export function cancelStudentGroup() {
  return request({
    url: `api/student/cancelGroup`,
    method: 'post'
  })
}

// 课堂练习-模型
export function resourceModelsList(data) {
  return request({
    url: `api/models/lists`,
    method: 'post',
    params: data
  })
}

// 课堂练习-模型收藏/取消
export function modelCollect(data) {
  return request({
    url: `api/models/collect`,
    method: 'post',
    params: data
  })
}

// 我的资源列表
export function resourceOfMy(data) {
  return request({
    url: `api/resource/lists`,
    method: 'post',
    params: data
  })
}

// 获取资源分类
export function resourceOfClassify() {
  return request({
    url: `api/resource/create`,
    method: 'post'
  })
}

// 删除资源
export function resourceOfDelete(id) {
  return request({
    url: `api/resource/${id}`,
    method: 'delete'
  })
}

// 我的资源列表
export function resourceOfAdd(data) {
  return request({
    url: `api/resource/store`,
    method: 'post',
    params: data
  })
}

// 个人资源详情 
export function resourceOfDetail(id) {
  return request({
    url: `api/resource/detail/${id}`,
    method: 'post'
  })
}

// 编辑资源详情 
export function resourceOfEdit(data) {
  return request({
    url: `api/resource/edit/${data.id}`,
    method: 'post',
    params: data
  })
}

