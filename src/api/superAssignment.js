import request from '@/utils/requset'

// 错题锦囊
export function wrongAnswer(data) {
    return request({
      url: `api/exercises/wrongAnswer`,
      method: 'post',
      params: data
    })
  }