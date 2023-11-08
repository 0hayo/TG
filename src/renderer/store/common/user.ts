import { defineStore } from 'pinia'
import NAMES from '../types'
import { User } from '../types/interface'

// 用户
const user = defineStore(NAMES.user, {
  state: () => {
    return {
      userInfo: {
        id: 1,
        name: 'mark'
      }
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    saveUser(user: User) {
      this.userInfo = user
    }
  }
})

export default user
