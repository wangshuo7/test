import request from '@/service'

// 管理员登录的post接口
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}
