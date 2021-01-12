import request from '@/utils/requset'
 
// 登录
export function login(data) {
  return request({
    url: `api/auth/login`,
    method: 'post',
    params: data
  })
}

// 用户信息
export function userInfo() {
  return request({
    url: `api/user/info`,
    method: 'get'
  })
}

// 班级列表
export function classList(type) {
    return request({
      url: `api/classroom/myList`,
      method: 'get',
      params: {type: type} 
    })
  }

// 切换班级
export function changeClass(id) {
  return request({
    url: `api/classroom/switch`,
    method: 'post',
    params: {class_id: id} 
  })
}

// 班级信息
export function classInfo() {
  return request({
    url: `api/user/info`,
    method: 'get'
  })
}

// 公共配置
export function commonConfiguration() {
  return request({
    url: `api/common/constant`,
    method: 'get'
  })
}

// 全校数据
export function schoolData() {
  return request({
    url: `api/index/statistics`,
    method: 'get'
  })
}

// 发送手机验证码
export function sendCode(data) {
  return request({
    url: `api/user/sendCode`,
    method: 'post',
    params: data
  })
}

// 修改手机号码
export function changeMobile(data) {
  return request({
    url: `api/user/modifyMobile`,
    method: 'post',
    params: data
  })
}

// 修改用户信息
export function changeUserInfo(data) {
  return request({
    url: `api/user/modifyInfo`,
    method: 'post',
    params: data
  })
}

// 添加教师前获取基础信息
export function teacherSubject() {
  return request({
    url: `api/teacher/create`,
    method: 'post'
  })
}