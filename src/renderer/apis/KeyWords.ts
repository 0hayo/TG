import service from './service'
import { ApiResponse } from './types'

// 创建监测关键词
export function addKey(params: { keyword: string }) {
  return service.post<void, ApiResponse<null>>('/inspect_key/add_key', params)
}

// 查询当前用户所有的监测关键词
export interface keywordData {
  added_at: string
  added_by: string
  id: number
  is_enabled: boolean
  keyword: string
  status: number
}
export function getAllKey() {
  return service.get<void, ApiResponse<keywordData[]>>('/inspect_key/get_all')
}

// 用户_查询单位所有关键词
export function getOrgKey(params: { page: number; per_page: number }) {
  return service.get<void, ApiResponse<keywordData[]>>('/inspect_key/get_org_key', { params })
}

// 查询当前用户指定状态监测关键词 status: 关键词状态，类型为int。可选值有2=有效，1=历史删除，9=永久删除。
export function getStatusKeys(params: { status: number; page: number; per_page: number }) {
  return service.get<void, ApiResponse<keywordData[]>>('/inspect_key/get_status', { params })
}

// 修改监测关键词状态
export function updateStatusKey(params: { keyword: string; status: 1 | 2 | 9 }) {
  return service.post<void, ApiResponse<null>>('/inspect_key/update_status', params)
}
