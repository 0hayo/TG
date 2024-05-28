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
  hit_keyword: string
}
export function latestKeyMessages(params: { channel_name: string; keywords: string }) {
  return service.get<void, ApiResponse<MessagesRes[]>>('/tgmsg/latest_messages', {
    params
  })
}
