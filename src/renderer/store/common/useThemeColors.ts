/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import NAMES from '../types'
// import colors from '@/constants/colors'
import colors from '@/constants/colorTheme'

const useThemeColors = defineStore(NAMES.USE_STYLE, {
  state: () => {
    return {
      default: {
        '--Layout-White': colors.Layout.White,
        '--Layout-Black': colors.Layout.Black,
        '--Layout-Sidebar': colors.Layout.Sidebar,
        '--Layout-Card': colors.Layout.Card,
        '--Neutral-Text-Primary': colors.Neutral.Text.Primary
      },
      theme1: {
        '--layout-White': '#000',
        '--el-table-bg-color': 'red',
        '--aa': '#000',
        aaa: 'red'
      },
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
