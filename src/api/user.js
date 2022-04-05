import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: {
      username:data.username,
      password:data.password,
      // client_id:data.client_id,
      // client_secret:data.client_secret,
      // grant_type:data.grant_type
      // username:1901040301,
      // password:111111,
      client_id: 'sote-frontend',
      client_secret: 'eden',
      grant_type: 'password'
    }
  })
}

export function getInfo() {
  return request({
    url: '/auth/user/current',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
