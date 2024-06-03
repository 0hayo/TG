<template>
  <div class="p-16px! flex flex-col">
    <div class="flex items-center gap-2">
      <h6 class="inline-flex items-center h-12 text-h6-medium">方案管理列表</h6>
      <XButton type="Primary" icon-name="add-line" @click="show">新增方案</XButton>
    </div>
    <div class="relative w-full grow">
      <el-table :data="planList" stripe height="100%" style="position: absolute; width: 100%">
        <el-table-column label="序号" width="60" type="index" />
        <el-table-column prop="plan_name" label="方案名称" />
        <el-table-column prop="tg_user_group_id" label="监测媒体" />
        <el-table-column prop="is_active" label="状态" />
        <el-table-column prop="created_at" label="生效时间" />
        <el-table-column prop="" label="创建人" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="{ row }">
            <el-button link type="danger" size="small" @click="deletePlans(row.plan_id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      class="mt-16px justify-end"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import { PlanInfo, deletePlan, getUserPlans } from '@/apis/monitoringPlan'
import XButton from '@/components/XButton/index.vue'
import { addDialog } from '@/components/dialog'
import mitts from '@/utils/mitts'
import AddPlan from '@/views/MonitoringPlan/components/AddPlan.vue'

onMounted(async () => {
  getPlan()
})

const currentPage = ref(1)
const pageSize = ref(10)

const show = () => {
  addDialog({
    title: '新增方案',
    width: '600px',
    component: shallowRef(AddPlan),
    showfooter: false,
    callBack(name: string) {
      if (name === 'update') {
        getPlan()
      }
    }
  })
}

const planList = ref<PlanInfo[]>()
const getPlan = async () => {
  try {
    const res = await getUserPlans()
    if (res.IsSuccess) {
      planList.value = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const deletePlans = async (plan_id: number) => {
  await ElMessageBox.confirm('删除此方案?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  try {
    const res = await deletePlan({
      plan_id
    })
    if (res.IsSuccess) {
      getPlan()
      mitts.emit('updatePlanList')
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
