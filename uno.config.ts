import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from 'unocss'
import colors from './src/renderer/constants/colorTheme'

export default defineConfig({
  theme: {
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto'
    }),
    colors: {
      layout: {
        sidebar: colors.layout.sidebar,
        cardbg: colors.layout.cardbg
      },
      Neutral: {
        Text: {
          Primary: colors.Neutral.Text.Primary,
          PrimaryDebit: colors.Neutral.Text.PrimaryDebit,
          Secondary: colors.Neutral.Text.Secondary,
          Tertiary: colors.Neutral.Text.Tertiary,
          Quaternary: colors.Neutral.Text.Quaternary,
          Placeholder: colors.Neutral.Text.Placeholder,
          Description: colors.Neutral.Text.Description,
          TextHover: colors.Neutral.Text.TextHover,
          TextActive: colors.Neutral.Text.TextActive,
          TextDisabled: colors.Neutral.Text.TextDisabled
        },
        Fill: {
          Fill: colors.Neutral.Fill.Fill,
          FillHover: colors.Neutral.Fill.FillHover,
          FillActive: colors.Neutral.Fill.FillActive,
          FillDisabled: colors.Neutral.Fill.FillDisabled,
          PrimaryDebit: colors.Neutral.Fill.PrimaryDebit,
          PrimaryDebitHover: colors.Neutral.Fill.PrimaryDebitHover
        },
        Stroke: {
          Stroke: colors.Neutral.Stroke.Stroke,
          StrokeHover: colors.Neutral.Stroke.StrokeHover,
          StrokeActive: colors.Neutral.Stroke.StrokeActive,
          StrokeDisabled: colors.Neutral.Stroke.StrokeDisabled
        },
        Effects: {
          Effects: colors.Neutral.Effects.Effects
        }
      }
    }
  },
  shortcuts: {
    // 全局公共样式
    'flex-col': 'flex flex-col',
    'flex-row': 'flex flex-row'
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
