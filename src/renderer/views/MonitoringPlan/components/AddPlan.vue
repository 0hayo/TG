<template>
  <div class="content">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      :rules="rules"
      style="max-width: 460px"
      onsubmit="return false"
    >
      <el-form-item label="方案名称" prop="planName">
        <el-input v-model="formLabelAlign.planName" />
      </el-form-item>
      <el-form-item prop="planType">
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
      </el-form-item>
    </el-form>
  </div>
  <div class="flex justify-center !py-10px !mt-10">
    <XButton class="w-25" type="info" @click="emits('close')"> 取消 </XButton>
    <XButton class="w-25" type="primary" @click="save(ruleFormRef)"> 完成 </XButton>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormRules, type FormProps, FormInstance } from 'element-plus'
import XButton from '@/components/XButton/index.vue'
import { createPlan } from '@/apis'
import { CreatePlanReq } from '@/apis/types'
import mitts from '@/utils/mitts'

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

<style scoped lang="less">
.content {
  display: flex;
  justify-content: center;

  .el-radio-group {
    margin-top: 24px;
    gap: 48px;
  }
  .radiobox {
    img {
      width: 100%;
      height: 100%;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
