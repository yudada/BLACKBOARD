import request from '@/utils/requset'

// 获取课本列表
export function wisdomBookList(class_id) {
   return request({
    url: `api/textbook/lists`,
    method: 'get',
    params: {class_id}
  })
}