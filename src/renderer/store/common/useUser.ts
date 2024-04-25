import { defineStore } from 'pinia'
import NAMES from '../types'

// 监测数据
const usePlanStore = defineStore(NAMES.USER, {
  state: () => {
    return {
      userInfo: {
        id: ''
      }
    }
  },
  getters: {},
  actions: {
    setUser(data) {
      this.$state.userInfo.id = data
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
