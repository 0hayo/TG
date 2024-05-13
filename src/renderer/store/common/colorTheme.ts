import colors from '@/constants/colors'

export default {
  layout: {
    sidebar: colors.neutral[200],
    cardbg: colors.neutral[50]
  },
  Neutral: {
    Text: {
      Primary: colors.neutral[950],
      PrimaryDebit: colors.neutral[50],
      Secondary: colors.neutral[700],
      Tertiary: colors.neutral[500],
      Quaternary: colors.neutral[300],
      Placeholder: colors.neutral[50],
      Description: colors.neutral[700],
      TextHover: colors.neutral[700],
      TextActive: colors.neutral[950],
      TextDisabled: colors.neutral[200]
    },
    Fill: {
      Fill: colors.neutral[950],
      FillHover: colors.neutral[700],
      FillActive: colors.neutral[950],
      FillDisabled: colors.neutral[400],
      PrimaryDebit: colors.white,
      PrimaryDebitHover: colors.neutral[100]
    },
    Stroke: {
      Stroke: colors.neutral[300],
      StrokeHover: colors.neutral[200],
      StrokeActive: colors.neutral[400],
      StrokeDisabled: colors.neutral[100]
    },
    Effects: {
      Effects: colors.neutral[950]
    }
  }
}
