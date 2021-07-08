import request from '@/utils/request'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
//请求头添加 Authrization: Basic client_id client_secret
const auth = {
  username: 'xx-blog-admin',
  password: '123456'
}

export function login(data) {
  return request ({
    headers,
    auth,
    url: `/auth/login`,
    method: 'post',
    params: data
  })
}

// 获取协议内容
export function getXieyi() {
  return request({
    url: `${window.location.href}/xieyi.html`, // 访问到的是 public/xieyi.html
    method: 'get'
  })
}

// 查询用户名是否已被注册
export function getUserByUsername(username) {
  return request({
    url: `/system/api/user/username/${username}`,
    method: 'get'
  })
}
  // 提交注册数据
export function register(data) {
  return request({
    headers,
    auth,
    url: `/system/api/user/register`,
    method: 'post',
    params: data
  })
}

// 退出登录
export function logout(accessToken) {
  return request({
    url: `/auth/logout`,
    method: 'get',
    params: {
      accessToken
    }
  })
}

// 刷新令牌
export function refreshToken(refreshToken) {
  return request({
    url: `/auth/user/refreshToken`,
    method: 'get',
    params: {
      refreshToken
    }
  })
}