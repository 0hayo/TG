<template>
  <div class="content">
    <el-form
      ref="ruleFormRef"
      class="flex gap-24px px-12px"
      :label-position="labelPosition"
      label-width="auto"
      :model="formLabelAlign"
      :rules="rules"
      onsubmit="return false"
    >
      <div>
        <el-form-item label="方案名称" prop="plan_name">
          <el-input v-model="formLabelAlign.plan_name" placeholder="输入方案名称" class="">
            <template #prefix> <i class="ri-gps-line"></i> </template>
            <template #append><i class="ri-corner-down-left-line"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="value1">
            <template #active-action>
              <span class="custom-active-action"><i class="ri-notification-4-line"></i></span>
            </template>
            <template #inactive-action>
              <span class="custom-inactive-action"><i class="ri-notification-off-line"></i></span>
            </template>
          </el-switch>
          <span>系统通知</span>
        </el-form-item>
        <el-form-item label="选择媒体">
          <el-radio-group v-model="formLabelAlign.tg_user_group_id">
            <el-radio value="Telegram" label="Telegram">Telegram </el-radio>
            <el-radio value="Twitter" label="Twitter"> Twitter </el-radio>
            <el-radio value="facebook" label="facebook"> facebook </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item label="选择关键词" class="flex-1">
        <el-checkbox-group v-model="formLabelAlign.inspect_keys">
          <el-checkbox value="Online activities" name="type">Telegram </el-checkbox>
          <el-checkbox value="Promotion activities" name="type"> Twitter </el-checkbox>
          <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
  <div class="flex justify-end gap-4">
    <XButton class="w-25" type="Primary" @click="save(ruleFormRef)">新增方案</XButton>
    <XButton class="w-25" type="Warning" @click="emits('close')">取消</XButton>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormRules, type FormProps, FormInstance } from 'element-plus'
import XButton from '@/components/XButton/index.vue'
import mitts from '@/utils/mitts'
import { addPlan } from '@/apis/monitoringPlan'

const value1 = ref(false)

const emits = defineEmits<{
  close: []
}>()

const labelPosition = ref<FormProps['labelPosition']>('top')

const formLabelAlign = reactive({
  plan_name: '学校监测方案',
  tg_user_group_id: 'Telegram',
  inspect_keys: ['微信', '学校', '集团', '银行']
})

const rules = ref<FormRules<typeof formLabelAlign>>({
  plan_name: [{ required: true, message: 'Please input planName', trigger: 'blur' }]
})

const ruleFormRef = ref<FormInstance>()

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await addPlan(formLabelAlign)
      ElMessage.success('新增成功')
      mitts.emit('updatePlanList')
      emits('close')
    }
  })
}
</script>

<style scoped lang="less"></style>
