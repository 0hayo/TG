<template>
  <el-button v-bind="properties" @click="emit('handleBtn')">
    <i v-if="iconName" :class="`icon font_family icon-${iconName}`"></i>
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

withDefaults(
  defineProps<{
    iconName?: string
    properties?: typeof ElButton
  }>(),
  {}
)

const emit = defineEmits<{
  handleBtn: []
}>()
</script>

<style scoped lang="less"></style>
