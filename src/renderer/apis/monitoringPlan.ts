import service from './service'
import { ApiResponse } from './types'

// 查询频道消息_最新
export interface MessagesRes {
  channel_name: string
  file_path: string
  file_type: string
  message_id: string
  message_link: string
  message_text: string
  message_time: string
  msg_online_link: string
  sender_id: string
  sender_name: string
  hit_keyword: string[]
}
// 查询频道所有消息
export function latestMessages(params: { channel_name?: string; keywords: string }) {
  return service.get<void, ApiResponse<MessagesRes[]>>('/tgmsg/latest_messages', {
    params
  })
}
// 查询频道消息for关键词
export function latestKeyMessages(params: {
  channel_name: string
  keywords: string
  time_threshold: string
}) {
  return service.get<void, ApiResponse<MessagesRes[]>>('/tgmsg/latest_key_messages', {
    params
  })
}

// 创建监测方案
export function addPlan(params: {
  plan_name: string
  tg_user_group_id: string
  inspect_keys: string[]
}) {
  return service.post<void, ApiResponse<null>>('/tgplan/add_plan', params)
}

// 更新监测方案
export function updatePlan(params: {
  plan_id: string
  plan_name: string
  tg_user_group_id: string
  inspect_keys: string[]
}) {
  return service.post<void, ApiResponse<null>>('/tgplan/update_plan', params)
}

// 查询当前用户所有方案
export interface PlanInfo {
  created_at: string
  inspect_keys: string[]
  is_active: boolean
  plan_id: number
  plan_name: string
  tg_user_group_id: string
}
export function getUserPlans() {
  return service.get<void, ApiResponse<PlanInfo[]>>('/tgplan/get_user_plans')
}

// 删除监测方案
export function deletePlan(params: { plan_id: number }) {
  return service.post<void, ApiResponse<null>>('/tgplan/delete_plan', params)
}
