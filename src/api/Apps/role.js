import request from '@/utils/requset'

export function addRole(data) {
    return request({
      url: `api/role/store`,
      method: 'post',
      params: data
    })
  }

export function deleteRole(id) {
  return request({
    url: `api/role/${id}`,
    method: 'delete'
  })
}

export function rightsList(data) {
  return request({
    url: `api/role/module`,
    method: 'get',
    params: data
  })
}

export function roleList() {
  return request({
    url: `api/role/lists`,
    method: 'get'
  })
}

export function roleInfo(id) {
  return request({
    url: `api/role/detail/${id}`,
    method: 'post'
  })
}

export function editRole(id,data) {
  return request({
    url: `api/role/${id}`,
    method: 'post',
    params: data
  })
}
