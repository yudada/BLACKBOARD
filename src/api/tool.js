import request from '@/utils/requset'

// 错题锦囊
export function subjectToolsLists() {
  return request({
    url: `api/subjectTools/lists`,
    method: 'get'
  })
}