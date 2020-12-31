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

// 操作日志列表
export function operationLog(data) {
  return request({
   url: `api/operation/lists`,
   method: 'post',
   params: data
 })
}