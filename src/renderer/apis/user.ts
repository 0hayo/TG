import service from './service'
import { ApiResponse } from './types'

// 登录
export interface UserInfo {
  account_level: string
  city_category: string
  created_at: string
  expiration_date: string
  font_size: string
  is_delete: boolean
  is_login_blocked: boolean
  last_login_at: string
  name: string
  organization: string
  organization_type: string
  theme: string
  theme_mode: string
  username: string
  password: string
}
export function getAllUsers() {
  return service.get<void, ApiResponse<UserInfo[]>>('/admin/all_users')
}

// 创建用户
export function createUser(params: {
  name: string
  username: string
  password: string
  organization: string
  account_level: string
  city_category: string
  expiration_date: string
}) {
  return service.post<void, ApiResponse<null>>('/admin/create_user', params)
}

// 更新用户
export function updateUser(params: UserInfo) {
  return service.post<void, ApiResponse<null>>('/admin/update_user', params)
}

// 查询所有地区及其关联的所有单位名称
export function getSitesOrganizations() {
  return service.get<void, ApiResponse<{ regions: SitesOrganization[] }>>(
    '/siteorg/get_sites_organizations'
  )
}
export interface SitesOrganization {
  id: number
  name: string
  org_id?: number
  org_name?: string
  organizations: Organization[]
}
export interface Organization {
  id: number
  name: string
  org_id: number
  org_name: string
}

// 创建地区
export function addSite(params: { site_name: string }) {
  return service.post<void, ApiResponse<null>>('/siteorg/add_site', params)
}

// 创建单位
export function addOrg(params: { site_name: string; org_name: string }) {
  return service.post<void, ApiResponse<null>>('/siteorg/add_org', params)
}

// 超管_删除用户
export function deleteUser(params: { username: string }) {
  return service.post<void, ApiResponse<null>>('/admin/delete_user', params)
}
