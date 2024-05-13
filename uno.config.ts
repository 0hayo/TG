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
        white: colors.layout.white,
        black: colors.layout.black,
        sidebar: colors.layout.sidebar,
        Card: colors.layout.Card
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
      },
      Primary: {
        Text: {
          Primary: colors.Primary.Text.Primary,
          PrimaryDebit: colors.Primary.Text.PrimaryDebit,
          Secondary: colors.Primary.Text.Secondary,
          Tertiary: colors.Primary.Text.Tertiary,
          Quaternary: colors.Primary.Text.Quaternary,
          Placeholder: colors.Primary.Text.Placeholder,
          Description: colors.Primary.Text.Description,
          TextHover: colors.Primary.Text.TextHover,
          TextActive: colors.Primary.Text.TextActive,
          TextDisabled: colors.Primary.Text.TextDisabled
        },
        Fill: {
          Fill: colors.Primary.Fill.Fill,
          FillHover: colors.Primary.Fill.FillHover,
          FillActive: colors.Primary.Fill.FillActive,
          FillDisabled: colors.Primary.Fill.FillDisabled
        },
        Stroke: {
          Stroke: colors.Primary.Stroke.Stroke,
          StrokeHover: colors.Primary.Stroke.StrokeHover,
          StrokeActive: colors.Primary.Stroke.StrokeActive,
          StrokeDisabled: colors.Primary.Stroke.StrokeDisabled
        },
        Effects: {
          Effects: colors.Primary.Effects.Effects
        }
      },
      Success: {
        Text: {
          Primary: colors.Success.Text.Primary,
          PrimaryDebit: colors.Success.Text.PrimaryDebit,
          Secondary: colors.Success.Text.Secondary,
          Tertiary: colors.Success.Text.Tertiary,
          Quaternary: colors.Success.Text.Quaternary,
          Placeholder: colors.Success.Text.Placeholder,
          Description: colors.Success.Text.Description,
          TextHover: colors.Success.Text.TextHover,
          TextActive: colors.Success.Text.TextActive,
          TextDisabled: colors.Success.Text.TextDisabled
        },
        Fill: {
          Fill: colors.Success.Fill.Fill,
          FillHover: colors.Success.Fill.FillHover,
          FillActive: colors.Success.Fill.FillActive,
          FillDisabled: colors.Success.Fill.FillDisabled
        },
        Stroke: {
          Stroke: colors.Success.Stroke.Stroke,
          StrokeHover: colors.Success.Stroke.StrokeHover,
          StrokeActive: colors.Success.Stroke.StrokeActive,
          StrokeDisabled: colors.Success.Stroke.StrokeDisabled
        },
        Effects: {
          Effects: colors.Success.Effects.Effects
        }
      },
      Warning: {
        Text: {
          Primary: colors.Warning.Text.Primary,
          PrimaryDebit: colors.Warning.Text.PrimaryDebit,
          Secondary: colors.Warning.Text.Secondary,
          Tertiary: colors.Warning.Text.Tertiary,
          Quaternary: colors.Warning.Text.Quaternary,
          Placeholder: colors.Warning.Text.Placeholder,
          Description: colors.Warning.Text.Description,
          TextHover: colors.Warning.Text.TextHover,
          TextActive: colors.Warning.Text.TextActive,
          TextDisabled: colors.Warning.Text.TextDisabled
        },
        Fill: {
          Fill: colors.Warning.Fill.Fill,
          FillHover: colors.Warning.Fill.FillHover,
          FillActive: colors.Warning.Fill.FillActive,
          FillDisabled: colors.Warning.Fill.FillDisabled
        },
        Stroke: {
          Stroke: colors.Warning.Stroke.Stroke,
          StrokeHover: colors.Warning.Stroke.StrokeHover,
          StrokeActive: colors.Warning.Stroke.StrokeActive,
          StrokeDisabled: colors.Warning.Stroke.StrokeDisabled
        },
        Effects: {
          Effects: colors.Warning.Effects.Effects
        }
      },
      Danger: {
        Text: {
          Primary: colors.Danger.Text.Primary,
          PrimaryDebit: colors.Danger.Text.PrimaryDebit,
          Secondary: colors.Danger.Text.Secondary,
          Tertiary: colors.Danger.Text.Tertiary,
          Quaternary: colors.Danger.Text.Quaternary,
          Placeholder: colors.Danger.Text.Placeholder,
          Description: colors.Danger.Text.Description,
          TextHover: colors.Danger.Text.TextHover,
          TextActive: colors.Danger.Text.TextActive,
          TextDisabled: colors.Danger.Text.TextDisabled
        },
        Fill: {
          Fill: colors.Danger.Fill.Fill,
          FillHover: colors.Danger.Fill.FillHover,
          FillActive: colors.Danger.Fill.FillActive,
          FillDisabled: colors.Danger.Fill.FillDisabled
        },
        Stroke: {
          Stroke: colors.Danger.Stroke.Stroke,
          StrokeHover: colors.Danger.Stroke.StrokeHover,
          StrokeActive: colors.Danger.Stroke.StrokeActive,
          StrokeDisabled: colors.Danger.Stroke.StrokeDisabled
        },
        Effects: {
          Effects: colors.Danger.Effects.Effects
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
