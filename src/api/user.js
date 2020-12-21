import request from '@/utils/requset'

// 登录
export function login(data) {
   return request({
    url: `api/auth/login`,
    method: 'post',
    data: data
  })
}