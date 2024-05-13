<template>
  <div class="flex flex-col justify-between w-full content">
    <div class="head text-center">{{ title }}</div>
    <div class="w-full flex-1 !p-16px overflow-hidden">
      <slot></slot>
    </div>
    <div class="flex justify-center items-center !px-16px footer">
      <slot name="footer">
        <XButton @handle-btn="emit('handleBtn')">
          <el-icon><Delete /></el-icon>{{ btnName }}
        </XButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import XButton from '@/components/XButton/index.vue'

withDefaults(
  defineProps<{
    title?: string
    btnName?: string
  }>(),
  {
    title: 'TG账户',
    btnName: '删除'
  }
)

const emit = defineEmits<{
  handleBtn: []
}>()
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 64px);
  border-right: 1px solid @border-hr;
  .head {
    border-bottom: 1px solid @border-hr;
    height: 50px;
    line-height: 50px;
    font-weight: 500;
    color: #fff;
  }
  .footer {
    border-top: 1px solid @border-hr;
    height: 52px;
    .el-button {
      width: 100%;
      background-color: @button-fill;
    }
  }
}
</style>
