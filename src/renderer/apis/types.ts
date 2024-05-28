export interface ApiResponse<T> {
  IsSuccess: boolean
  Message: string
  Data: T
  Status: string
}

export interface PlansRes {
  create_time?: string
  filters: PlanFilters[]
  id: number
  planName: string
  planType: string
}
export interface PlanFilters {
  groupList: GroupList[]
  keyWordsList: KeyWordsList[]
}
export interface GroupList {
  accountId: string
  id: number
}
export interface KeyWordsList {
  groupId: string
  id: string
}

export interface UpdatePlanReq {
  plan_id: string
  filters: PlanFilters[]
}

export interface CreatePlanReq {
  planName: string
  planType: '1' | '2' | '3'
}

export interface CreateChannelReq {
  chatId: string
  groupUrls: {
    url: string
    nickname: string
  }[]
}

export interface UserRes {
  chatId: number
  id: number
  createTime: string
  nickname: string
}

export interface GroupRes {
  chatId: string
  groupId: string
  groupName: string
  groupNickname: string
}

export interface ChannelReq {
  chatId: number
  groupIds: string[]
}

export interface CreateUserReq {
  chatId: string
  nickname: string
}

export interface KeywordsReq {
  groupIds: string[]
}

export interface AddKeywordsReq {
  groupIds: string[]
  keywords: string[]
}

export interface KeywordsRes {
  keywords: string[]
  groupId: number
}

export interface GroupListReq {
  chatIds: number[]
}

export interface DelKeywordsReq {
  groupId: number
  keywords: string[]
}
