import service from '@/apis/service'
import { ApiResponse } from '@/apis/types'

// 群组ID查群组名
export function searchTitle(params: { tg_group_id: string }) {
  return service.post<void, ApiResponse<{ group_id: string; group_title: string }>>(
    '/tggroup/search_title',
    params
  )
}

// 群组ID查群组名
export function addUserMonitored(params: { group_id: string }) {
  return service.post<void, ApiResponse<null>>('/tggroup/add_user_monitored', params)
}

// 管理员_查询所有群组
export interface GroupInfo {
  added_at: string
  added_by: string
  group_id: string
  group_link: string
  group_name: string
  id: number
  media_type: string
  status: number
}
export function adminGetAllGroups(params: { page: number; per_page: number }) {
  return service.get<void, ApiResponse<GroupInfo[]>>('/tggroup/admin_get_all_groups', { params })
}

// 管理员_查询所有群组
export interface GroupInfo {
  added_at: string
  added_by: string
  group_id: string
  group_link: string
  group_name: string
  id: number
  media_type: string
  status: number
}
export function getUserMonitored() {
  return service.get<void, ApiResponse<GroupInfo[]>>('/tggroup/get_user_monitored')
}
