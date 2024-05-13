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
  name: 'TgButton',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'default' | 'primary' | 'Success' | 'Warning' | 'Danger'>,
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
        case 'Success':
          baseClass = 'bg-blue-500 text-white hover:bg-blue-700'
          break
        default:
          break
      }

      if (this.text) {
        // 根据类型添加禁用样式
        switch (this.type) {
          case 'default':
            return 'text-Neutral-Text-Primary hover:text-Neutral-Text-TextHover active:text-Neutral-Text-TextActive' // 安全按钮禁用样式
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
