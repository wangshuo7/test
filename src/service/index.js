import axios from 'axios'
import { ElMessage } from 'element-plus'

// 给axios设置一些默认行为
// eslint-disable-next-line no-undef
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
  case 'development':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
}

// 设置超时时间
axios.defaults.timeout = 5000
// 设置跨域是否需要携带凭证
axios.defaults.withCredentials = false

// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 进行token校验（JWT）：接受服务器返回的token，存储到本地，每次发送请求，都需要带上token
    const token = localStorage.getItem('token')
    token && (config.headers.token = token)
    // config 需要返回
    return config
  },
  (error) => {
    // 请求错误的操作，返回报错信息
    return Promise.reject(error)
  }
)

// 设置响应拦截器
axios.interceptors.response.use((response) => {
  console.log('axios-response--->', response)
  if (response.data?.data?.token) {
    localStorage.setItem('token', response.data.data.token)
  }
  // 全局的弹窗
  ElMessage({
    type: response?.data?.code === '200' ? 'sucess' : 'error',
    message: response?.data?.message
  })
  return response.data
})

export default axios
