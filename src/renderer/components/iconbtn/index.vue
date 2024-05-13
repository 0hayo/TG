<template>
  <div
    :class="[
      'flex-col justify-center items-center font-size-16px  border-rd-1',
      sizeClass,
      typeClass
    ]"
  >
    <i v-if="iconName" :class="`ri-${iconName}`"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'IconBtn',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'default' | 'WindowsControls'>,
      default: 'default'
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md'
    }
  },
  computed: {
    sizeClass(): string {
      let baseSize = ''
      switch (this.size) {
        case 'sm':
          baseSize = 'w-4 h-4 '
          break
        case 'md':
          baseSize = 'w-6 h-6'
          break
        case 'lg':
          baseSize = 'w-9 h-6'
          break
        default:
          break
      }
      return baseSize
    },
    typeClass(): string {
      let baseClass = ''
      switch (this.type) {
        case 'default':
          baseClass =
            'color-Neutral-Text-Primary border-rd-1 hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit cursor-pointer'
          break
        case 'WindowsControls':
          baseClass =
            'color-Neutral-Text-Primary border-rd-1 hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit cursor-pointer'
          break
        default:
          break
      }
      return baseClass
    }
  }
})
</script>

<style scoped lang="less"></style>
