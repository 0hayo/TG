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
        <el-form-item
          label="方案名称"
          prop="planName"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-input v-model="formLabelAlign.planName" placeholder="输入方案名称" class="">
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
          <el-checkbox-group v-model="formLabelAlign">
            <el-checkbox value="Online activities" name="type">Telegram </el-checkbox>
            <el-checkbox value="Promotion activities" name="type"> Twitter </el-checkbox>
            <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <el-form-item label="选择关键词" class="flex-1">
        <el-checkbox-group v-model="formLabelAlign">
          <el-checkbox value="Online activities" name="type">Telegram </el-checkbox>
          <el-checkbox value="Promotion activities" name="type"> Twitter </el-checkbox>
          <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item prop="planType">
        <el-radio-group v-model="formLabelAlign.planType" class="radio">
          <div class="radiobox">
            <img src="@/assets/img/radio1.png" alt="" />
            <el-radio label="1" size="large">单看板</el-radio>
          </div>
          <div class="radiobox">
            <img src="@/assets/img/radio2.png" alt="" />
            <el-radio label="2" size="large">双看板</el-radio>
          </div>
          <div class="radiobox">
            <img src="@/assets/img/radio3.png" alt="" />
            <el-radio label="3" size="large">三看板</el-radio>
          </div>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
  </div>
  <!-- <div class="flex justify-end gap-4">
    <XButton class="w-25" type="Primary" @click="save(ruleFormRef)">新增方案</XButton>
    <XButton class="w-25" type="Warning" @click="emits('close')">取消</XButton>
  </div> -->
</template>

<script setup lang="ts">
import { ElMessage, FormRules, type FormProps, FormInstance } from 'element-plus'
// import XButton from '@/components/XButton/index.vue'
import { createPlan } from '@/apis'
import { CreatePlanReq } from '@/apis/types'
import mitts from '@/utils/mitts'

const value1 = ref(false)

const emits = defineEmits<{
  close: []
}>()

const labelPosition = ref<FormProps['labelPosition']>('top')

const formLabelAlign = reactive<CreatePlanReq>({
  planName: '',
  planType: '1'
})

const rules = ref<FormRules<typeof formLabelAlign>>({
  planName: [{ required: true, message: 'Please input planName', trigger: 'blur' }],
  planType: [{ required: true, message: 'Please input planType', trigger: 'blur' }]
})

const ruleFormRef = ref<FormInstance>()

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await createPlan(formLabelAlign)
      ElMessage.success('新增成功')
      mitts.emit('updatePlanList')
      emits('close')
    }
  })
}
</script>

<style scoped lang="less"></style>
