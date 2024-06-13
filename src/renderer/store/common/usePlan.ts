import { defineStore } from 'pinia'
import NAMES from '../types'
import { PlanInfo } from '@/apis/monitoringPlan'

// 监测数据
const usePlanStore = defineStore(NAMES.USE_PLAN, {
  state: () => {
    return {
      planInfo: {} as PlanInfo,
      planList: [] as PlanInfo[]
    }
  },
  getters: {
    getKeywords(state) {
      return (
        state.planList.filter((v) => v.plan_id === state.planInfo.plan_id)[0]?.inspect_keys || []
      )
    },
    getPlanInfo(state) {
      return state.planList.filter((v) => v.plan_id === state.planInfo.plan_id)[0]
    }
  },
  actions: {
    setPlan(data: PlanInfo) {
      this.$state.planInfo = data
    },
    // setKeywords(data: string[]) {
    //   this.$state.planInfo.inspect_keys = data
    // },
    setPlanList(data: PlanInfo[]) {
      this.$state.planList = data
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
