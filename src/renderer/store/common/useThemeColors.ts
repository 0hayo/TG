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
        '--aa': '#000',
        // textarea - css vars
        '--w-e-textarea-bg-color': '#fff',
        '--w-e-textarea-color': '#333',
        '--w-e-textarea-border-color': '#ccc',
        '--w-e-textarea-slight-border-color': '#e8e8e8',
        '--w-e-textarea-slight-color': '#d4d4d4',
        '--w-e-textarea-slight-bg-color': '#f5f2f0',
        '--w-e-textarea-selected-border-color': '#B4D5FF', // 选中的元素，如选中了分割线
        '--w-e-textarea-handler-bg-color': '#4290f7', // 工具，如图片拖拽按钮

        // toolbar - css vars
        ' --w-e-toolbar-color': '#595959',
        '--w-e-toolbar-bg-color': '#fff',
        '--w-e-toolbar-active-color': '#333',
        '--w-e-toolbar-active-bg-color': '#f1f1f1',
        '--w-e-toolbar-disabled-color': '#999',
        '--w-e-toolbar-border-color': '#e8e8e8',

        // modal - css vars
        '--w-e-modal-button-bg-color': '#fafafa',
        '--w-e-modal-button-border-color': '#d9d9d9'
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
