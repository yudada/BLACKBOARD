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