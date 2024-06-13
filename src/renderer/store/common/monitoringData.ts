import { defineStore } from 'pinia'
import NAMES from '../types'
import { MonitoringData } from '../types/interface'
import { GroupInfo } from '@/apis/mediaManagement'

// 监测数据
const useMonitoringData = defineStore(NAMES.MONITORING_DATA, {
  state: () => {
    return {
      monitoringData: [] as MonitoringData[],
      groupList: [] as GroupInfo[],
      keywordsList: [] as string[],
      maxMsg: 100,
      ringtones: true
    }
  },
  getters: {
    getGroupIds(state) {
      return state.groupList.map((v) => v.group_id) || []
    }
  },
  actions: {
    pushMonitoringData(data: MonitoringData) {
      this.$state.monitoringData.unshift(data)
      if (this.$state.monitoringData.length >= this.$state.maxMsg) {
        this.$state.monitoringData.length = this.$state.maxMsg
      }
    },
    setGroupList(data: GroupInfo[]) {
      this.$state.groupList = data
    },
    setKeywordsList(data: string[]) {
      this.$state.keywordsList = data
    },
    setMaxMsg(n: number) {
      this.$state.maxMsg = n
    },
    setRingtones(b: boolean) {
      this.$state.ringtones = b
    }
  }
})

export default useMonitoringData
