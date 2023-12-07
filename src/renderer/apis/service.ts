import axios, { InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const data = await window.getConfig()
const service = axios.create({
  baseURL: `http://${data.url}`,
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // config.headers['token'] = ''
    config.headers['Access-Control-Allow-Origin'] = '*'
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== 'success') {
      Promise.reject(ElMessage.error(data.msg))
    } else {
      return data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
