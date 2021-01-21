import request from '@/utils/requset'

// 获取课本列表
export function wisdomBookList(data) {
   return request({
    url: `api/textbook/lists`,
    method: 'get',
    params: data
  })
}

// 分类(课本、模型)
export function categoryListBook() {
   return request({
    url: `api/textbook/category`,
    method: 'get'
  })
}