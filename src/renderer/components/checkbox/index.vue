<template>
  <el-checkbox v-model="modelValues" v-bind="properties" class="w-full" size="large"
    ><slot></slot
  ></el-checkbox>
</template>

<script setup lang="ts">
import { ElCheckbox } from 'element-plus'

const props = defineProps<{
  modelValue?: boolean
  properties?: typeof ElCheckbox
}>()

const emit = defineEmits<{
  'update:modelValue'
}>()

const modelValues = useVModel(props, 'modelValue', emit)
</script>

<style scoped lang="less">
.el-checkbox {
  border-bottom: 0.5px solid @border-hr;
  // width: 212px;
  height: 44px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;
  &.is-checked {
    background: rgba(78, 167, 252, 0.1);
    // border-bottom: 0.5px solid @primary;
  }
}
</style>
