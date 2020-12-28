import request from '@/utils/requset'

// 学校资料详情
export function schoolDetail() {
   return request({
    url: `api/school/detail`,
    method: 'get'
  })
}

// 修改学校资料
export function editSchoolDetail(data) {
   return request({
    url: `api/school/update`,
    method: 'post',
    params: data
  })
}