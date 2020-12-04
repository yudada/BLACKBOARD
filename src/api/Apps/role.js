import http from '../../utils/http'

export function addRole(data) {
    return http({
      url: `api/role/store`,
      method: 'post',
      params: data
    })
  }

export function deleteRole(id) {
  return http({
    url: `api/role/${id}`,
    method: 'delete'
  })
}

export function rightsList(data) {
  return http({
    url: `api/role/module`,
    method: 'get',
    params: data
  })
}

export function roleList() {
  return http({
    url: `api/role/lists`,
    method: 'get'
  })
}

export function roleInfo(id) {
  return http({
    url: `api/role/detail/${id}`,
    method: 'post'
  })
}

export function editRole(id,data) {
  return http({
    url: `api/role/${id}`,
    method: 'post',
    params: data
  })
}
