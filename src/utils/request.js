import axios from 'axios'

const service = axios.create({
  // .env.development 和 .env.productiont
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => { 
    // 正常响应
    const res = response.data
    return res
  },
  error => {
    // 响应异常
    return Promise.reject(error)
  }
)

export default service