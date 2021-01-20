import request from '@/utils/requset'
 
// 在线研学
export function onlineList(data) {
  return request({
    url: `api/online/teach`,
    method: 'get',
    params: data
  })
}

// 研学答题人列表
export function answerPerson(id, data) {
  return request({
    url: `api/online/answerPerson/${id}`,
    method: 'post',
    params: data
  })
}

// 研学添加题库
export function onlineAddQuestions(data) {
  return request({
    url: `api/online/addQuestions`,
    method: 'post',
    params: data
  })
}

// 研学题目
export function onlinequestions(id) {
  return request({
    url: `api/online/questions`,
    method: 'post',
    params: {online_id: id}
  })
}


