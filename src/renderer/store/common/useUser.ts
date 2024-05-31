import { defineStore } from 'pinia'
import NAMES from '../types'
import { UserInfo } from '@/apis/user'

// 监测数据
const usePlanStore = defineStore(NAMES.USER, {
  state: () => {
    return {
      token: '',
      userInfo: {} as UserInfo
    }
  },
  getters: {
    getAccountLevel(state) {
      return state.userInfo.account_level
    }
  },
  actions: {
    setToken(data) {
      this.$state.token = data
    },
    setUserInfo(data) {
      this.$state.userInfo = data
    }
  },
  //开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage } // localstorage存储
    ]
  }
})

export default usePlanStore
