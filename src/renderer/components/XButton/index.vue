<template>
  <button
    :class="['flex-inline justify-center items-center  border-rd-1 gap-2', sizeClass, typeClass]"
    :disabled="disabled"
  >
    <i v-if="iconName" :class="`ri-${iconName}`"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'XButton',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'default' | 'Primary' | 'Success' | 'Warning' | 'Danger'>,
      default: 'default'
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md'
    },
    text: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass(): string {
      return (
        {
          sm: 'h-2'
        }[this.size] || 'h-8 px-4'
      )
    },
    typeClass(): string {
      let baseClass = ''
      switch (this.type) {
        case 'default':
          baseClass =
            'bg-Neutral-Fill-Fill text-Neutral-Text-PrimaryDebit hover:bg-Neutral-Fill-FillHover active:bg-Neutral-Fill-FillActive'
          break
        case 'Primary':
          baseClass =
            'bg-Primary-Fill-Fill text-Primary-Text-PrimaryDebit hover:bg-Primary-Fill-FillHover active:bg-Primary-Fill-FillActive'
          break
        case 'Success':
          baseClass =
            'bg-Success-Fill-Fill text-Success-Text-PrimaryDebit hover:bg-Success-Fill-FillHover active:bg-Success-Fill-FillActive'
          break
        case 'Warning':
          baseClass =
            'bg-Warning-Fill-Fill text-Warning-Text-PrimaryDebit hover:bg-Warning-Fill-FillHover active:bg-Warning-Fill-FillActive'
          break
        case 'Danger':
          baseClass =
            'bg-Danger-Fill-Fill text-Danger-Text-PrimaryDebit hover:bg-Danger-Fill-FillHover active:bg-Danger-Fill-FillActive'
          break
        default:
          break
      }

      if (this.text) {
        // 根据类型添加禁用样式
        switch (this.type) {
          case 'default':
            baseClass =
              'text-Neutral-Text-Primary hover:text-Neutral-Text-TextHover active:text-Neutral-Text-TextActive' // 安全按钮禁用样式
            break
          case 'Primary':
            baseClass =
              'text-Primary-Text-Primary hover:text-Primary-Text-TextHover active:text-Primary-Text-TextActive' // 安全按钮禁用样式
            break
          case 'Success':
            baseClass =
              'text-Success-Text-Primary hover:text-Success-Text-TextHover active:text-Success-Text-TextActive' // 安全按钮禁用样式
            break
          case 'Warning':
            baseClass =
              'text-Warning-Text-Primary hover:text-Warning-Text-TextHover active:text-Warning-Text-TextActive' // 安全按钮禁用样式
            break
          case 'Danger':
            baseClass =
              'text-Danger-Text-Primary hover:text-Danger-Text-TextHover active:text-Danger-Text-TextActive' // 安全按钮禁用样式
            break
          default:
            break
        }
      }

      if (this.disabled) {
        // 根据类型添加禁用样式
        switch (this.type) {
          case 'default':
            return 'bg-Neutral-Fill-FillDisabled text-Neutral-Text-TextDisabled cursor-not-allowed' // 安全按钮禁用样式

          default:
            break
        }
      }
      return baseClass
    }
  }
})
</script>
