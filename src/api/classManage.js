import request from '@/utils/requset'

// 阅读笔记
export function readNote(data) {
  return request({
    url: `api/exercises/reading`,
    method: 'post',
    params: data
  })
}