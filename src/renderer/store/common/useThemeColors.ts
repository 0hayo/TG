/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import NAMES from '../types'

const useThemeColors = defineStore(NAMES.USE_STYLE, {
  state: () => {
    return {
      default: {
        // '--tg-default-bg': '#000',
        '--tg-login-bg': '#fff',
        // '--tg-default-color': '#4a4a4a',
        '--tg-border-color': '#4B4B4B',
        '--tg-container-color': '#141414',
        '--bg-sider-color': '#000000'
      },
      night: {
        '--tg-default-bg': '#141414',
        '--tg-default-color': '#fff'
      },
      daytime: {
        '--tg-default-bg': '#FBFBFB',
        '--tg-default-color': '#4a4a4a'
      },
      mode: 'night'
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
