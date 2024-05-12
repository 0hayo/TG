import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from 'unocss'
import colors from './colors'

export default defineConfig({
  theme: {
    colors: {
      aaa: colors.slate[50]
    }
  },
  shortcuts: {
    // 全局公共样式
    'flex-col': 'flex flex-col'
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    }),
    presetTypography()
  ],
  transformers: [transformerAttributifyJsx()]
})
