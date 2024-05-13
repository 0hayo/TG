<template>
  <div
    class="w-6 h-6 flex-col justify-center items-center font-size-16px color-Neutral-Text-Primary border-rd-1 hover:bg-Neutral-Fill-PrimaryDebitHover border-rd-1"
  >
    <i v-if="iconName" :class="`ri-${iconName}`"></i>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconBtn',
  props: {
    iconName: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="less"></style>
