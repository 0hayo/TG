import service from './service'
import { ApiResponse } from './types'
import { UserInfo } from './user'

// 登录
export interface LoginRes {
  access_token: string
  user_info: UserInfo
}
export function login(params: { username: string; password: string }) {
  return service.post<void, ApiResponse<LoginRes>>('/auth/login', params)
}

// 账号退出
export function logout() {
  return service.get<void, ApiResponse<null>>('/auth/logout')
}
