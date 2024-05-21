/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import NAMES from '../types'
// import colors from '@/constants/colors'
import colorTheme from '@/constants/colorTheme'

const useThemeColors = defineStore(NAMES.USE_STYLE, {
  state: () => {
    return {
      default: {
        '--el-bg-color': colorTheme.layout.Card,
        '--tg-default-bg': '#000',
        '--tg-login-bg': '#fff',
        '--tg-default-color': '#4a4a4a',
        '--tg-border-color': '#000',
        '--tg-container-color': '#141414',
        '--el-color-primary': '#000',
        '--bg-sider-color': '#000000',
        '--el-dialog-bg-color': colorTheme.layout.Card,
        aa: '#000'
      },
      theme1: {},
      mode: 'theme1'
    }
  },
  getters: {},
  actions: {
    setDefaultTheme() {
      const root = document.querySelector(':root') as any
      const data = this.$state[this.$state.mode]
      Object.keys(data).forEach((v) => {
        root?.style.setProperty(v, data[v])
      })
    }
  }
})

export default useThemeColors
