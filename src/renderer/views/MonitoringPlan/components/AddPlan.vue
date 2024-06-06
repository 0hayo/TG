<template>
  <div class="pt-6 px-12">
    <el-form
      ref="ruleFormRef"
      class="flex gap-24px px-12px"
      :label-position="labelPosition"
      label-width="auto"
      :model="formLabelAlign"
      :rules="rules"
      onsubmit="return false"
    >
      <div class="w-80 flex-none">
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
          <el-radio-group v-model="formLabelAlign.tg_user_group_id" class="items-start! flex-col">
            <el-radio value="Telegram" label="Telegram">Telegram </el-radio>
            <el-radio disabled value="Twitter" label="Twitter"> Twitter </el-radio>
            <el-radio disabled value="facebook" label="facebook"> facebook </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item label="选择关键词" class="flex-1">
        <el-checkbox-group
          v-model="formLabelAlign.inspect_keys"
          class="grid grid-cols-[180px_180px] gap-2 grid-rows-8 content-start"
        >
          <el-checkbox
            v-for="item in keywordsList"
            :key="item.id"
            :value="item.keyword"
            :label="item.keyword"
          >
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
  <div class="flex justify-end items-center gap-4 h-12 border-t border-Neutral-Stroke-Stroke px-4">
    <XButton type="Primary" @click="save(ruleFormRef)"
      ><i class="ri-check-line"></i>新增方案</XButton
    >
    <XButton type="Warning" @click="emits('close')"><i class="ri-close-line"></i>取消</XButton>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormRules, type FormProps, FormInstance } from 'element-plus'
import XButton from '@/components/XButton/index.vue'
import mitts from '@/utils/mitts'
import { addPlan } from '@/apis/monitoringPlan'
import { getStatusKeys, keywordData } from '@/apis/KeyWords'

onMounted(() => {
  getAllKeyword()
})

const value1 = ref(false)

const emits = defineEmits<{
  close: [string?]
}>()

const labelPosition = ref<FormProps['labelPosition']>('top')

const formLabelAlign = reactive({
  plan_name: '',
  tg_user_group_id: 'Telegram',
  inspect_keys: []
})

const rules = ref<FormRules<typeof formLabelAlign>>({
  plan_name: [{ required: true, message: 'Please input planName', trigger: 'blur' }]
})

const ruleFormRef = ref<FormInstance>()

const keywordsList = ref<keywordData[]>()
const getAllKeyword = async () => {
  try {
    const res = await getStatusKeys({
      status: 2,
      page: 1,
      per_page: 9999
    })
    if (res.IsSuccess) {
      keywordsList.value = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (_) {
    console.log(_)
  }
}

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await addPlan(formLabelAlign)
      ElMessage.success('新增成功')
      mitts.emit('updatePlanList')
      emits('close', 'update')
    }
  })
}
</script>

<style scoped lang="less"></style>
