import router from '@/router'
import NAMES from '@/store/types'
import axios, { InternalAxiosRequestConfig } from 'axios'
// import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: `http://127.0.0.1:6060/aps`, // 开发
  // baseURL: 'http://121.5.139.110:5000', // 生产
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = JSON.parse(localStorage.getItem(NAMES.USER) || '{}')
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
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
      // Promise.reject(ElMessage.error(data.Message))
      return Promise.reject(data)
    } else {
      return data
    }
  },
  (error) => {
    if (error?.response?.data?.Status === 401) {
      router.push('/login')
    }
    // return Promise.reject(ElMessage.error(error?.message))
    return Promise.reject(error)
  }
)

export default service
