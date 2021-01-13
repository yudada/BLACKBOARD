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

