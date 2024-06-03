import service from '@/apis/service'
import { ApiResponse } from '@/apis/types'

// 群组ID查群组名
export function searchTitle(params: { group_url: string }) {
  return service.post<void, ApiResponse<{ group_id: string; group_title: string }>>(
    '/tggroup/search_title',
    params
  )
}

// 用户_添加监测群组
export function addUserMonitored(params: { group_url: string }) {
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

// 管理员_查询所有群组
export function getAllActive() {
  return service.get<void, ApiResponse<GroupInfo[]>>('/tggroup/get_all_active')
}

// 用户_更新已监测的群组状态
export function setUserMonitored(params: { group_url: string; new_status: boolean }) {
  return service.post<void, ApiResponse<null>>('/tggroup/set_user_monitored_enabled', params)
}

// 超管_更新TG群组可用状态
export function updateTggroupStatus(params: { group_url: string; new_status: string }) {
  return service.post<void, ApiResponse<null>>('/tggroup/update_status', params)
}

// 超管_更新TG群组可用状态
export function deleteGroup(params: { group_url: string }) {
  return service.post<void, ApiResponse<null>>('/tggroup/delete_group', params)
}

// 用户_申请添加监测群组
export function addTgGroup(params: { group_id: string; group_name: string; group_url: string }) {
  return service.post<void, ApiResponse<null>>('/tggroup/add_group', params)
}
