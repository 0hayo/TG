import service from './service'
import { ApiResponse } from './types'

// 登录
export interface LoginRes {
  access_token: string
}
export function login(params: { username: string; password: string }) {
  return service.get<void, ApiResponse<LoginRes>>('/login', {
    params
  })
}
