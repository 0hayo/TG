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
      Layout: {
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
          PrimaryDebit: colors.Neutral.Fill.PrimaryDebit
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
    },
    fontFamily: {
      myLocalFont: ['MiSans VF']
    },
    fontSize: {
      sm: ['0.75rem', { lineHeight: '1.25rem' }],
      base: ['0.875rem', { lineHeight: '1.375rem' }],
      lg: ['1rem', { lineHeight: '1.5rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      h6: ['1rem', { lineHeight: '1.5rem' }],
      h5: ['1.25rem', { lineHeight: '1.75rem' }],
      h4: ['1.5rem', { lineHeight: '2rem' }],
      h3: ['1.75', { lineHeight: '2.25rem' }],
      h2: ['2rem', { lineHeight: '2.5rem' }],
      h1: ['8rem', { lineHeight: '8rem' }]
    },
    fontWeight: {
      thin: '150',
      extralight: '200',
      light: '250',
      normal: '305',
      regular: '330',
      medium: '380',
      demibold: '450',
      semibold: '520',
      bold: '630',
      heavy: '700'
    }
  },
  shortcuts: {
    // 全局公共样式
    'flex-col': 'flex flex-col',
    'flex-row': 'flex flex-row',
    'text-sm-regular': 'text-sm font-regular',
    'text-sm-medium': 'text-sm font-medium',
    'text-base-regular': 'text-base font-regular',
    'text-base-medium': 'text-base font-medium',
    'text-lg-regular': 'text-lg font-regular',
    'text-lg-medium': 'text-lg font-medium',
    'text-xl-regular': 'text-xl font-medium',
    'text-xl-medium': 'text-xl font-medium',
    'text-h6-medium': 'text-h6 font-medium',
    'text-h5-medium': 'text-h5 font-medium',
    'text-h4-medium': 'text-h4 font-medium',
    'text-h3-medium': 'text-h3 font-medium',
    'text-h2-medium': 'text-h2 font-medium',
    'text-h1-medium': 'text-h1 font-medium'
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
