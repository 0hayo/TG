import NAMES from '@/store/types'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: `http://127.0.0.1:6060/aps`,
  // baseURL: 'http://121.5.139.110:5000',
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = JSON.parse(localStorage.getItem(NAMES.USER) || '{}')
    if (user?.userInfo?.token) {
      config.headers.Authorization = `Bearer ${user.userInfo.token}`
    }
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
    if (response.status !== 200) {
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
