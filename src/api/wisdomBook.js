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

// 获取课本详情
export function wisdomBookDeatil(book_id, data) {
   return request({
    url: `api/textbook/${book_id}`,
    method: 'get',
    params: { type: data}
  })
}