import request from '@/utils/requset'

// 错题锦囊
export function wrongAnswer(data) {
  return request({
    url: `api/exercises/wrongAnswer`,
    method: 'post',
    params: data
  })
}

// 错题锦囊-学生详情
export function wrongStudents(data) {
  return request({
    url: `api/exercises/wrongStudents`,
    method: 'post',
    params: data
  })
}

// 发布作业
export function addExercises(data) {
  return request({
    url: `api/exercises/store`,
    method: 'post',
    params: data
  })
}

// 作业详情
export function exercisesDetail(id,data) {
  return request({
    url: `api/exercises/show/${id}`,
    method: 'post',
    params: data
  })
}

// 编辑作业
export function editExercises(id,data) {
  return request({
    url: `api/exercises/edit/${id}`,
    method: 'post',
    params: data
  })
}

// 作业列表
export function exercisesList(data) {
  return request({
    url: `api/exercises/lists`,
    method: 'get',
    params: data
  })
}

// 删除作业
export function deleteExercises(id) {
  return request({
    url: `api/exercises/${id}`,
    method: 'delete'
  })
}

// 练习作业详情
export function classExerciseDetail(id) {
  return request({
    url: `api/exercises/classExerciseDetail/${id}`,
    method: 'post'
  })
}

// 2.错误人或正确人详情
export function personDetail(id, type) {
  return request({
    url: `api/exercises/personDetail/${id}`,
    method: 'post',
    params: {type: type}
  })
}

// 练习作业完成情况
export function exercisesDoneDetail(id) {
  return request({
    url: `api/exercises/detail/${id}`,
    method: 'post'
  })
}

