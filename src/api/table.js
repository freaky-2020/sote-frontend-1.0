import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '124.222.238.194:10010/user',
    method: 'get',
    params
  })
}
