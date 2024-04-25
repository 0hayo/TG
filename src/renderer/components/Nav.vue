<template>
  <div class="siderbar">
    <div class="logobox">
      <div class="logo"><p>TG信息监测平台</p></div>
    </div>
    <div class="navbox">
      <div class="box-1 box">
        <p>工作台</p>
        <div class="navitem" @click="show">
          <el-icon><Plus /></el-icon>新增监测方案
        </div>
        <router-link
          class="navitem icon font_family icon-telegram"
          :to="{ path: '/MonitoringPlan/1' }"
        >
          方案1
        </router-link>
        <router-link
          class="navitem icon font_family icon-telegram"
          :to="{ path: '/MonitoringPlan/2' }"
        >
          方案2
        </router-link>
        <!-- <router-link
          v-for="item in planList"
          :key="item.id"
          class="navitem"
          :class="{ active: usePlan.$state.id === item.id }"
          :to="{
            path: `/MonitoringPlan/${item.planType}`,
            query: {
              planType: item.planType,
              filters: JSON.stringify(item.filters)
            }
          }"
          @click="handlePlan(item)"
        >
          <div class="flex justify-between grow">
            <div class="flex items-center gap-2px">
              <el-icon><Memo /></el-icon>
              {{ item.planName }}
            </div>

            <el-icon @click="deletePlan(item.id)"><Delete /></el-icon>
          </div>
        </router-link> -->
      </div>
      <div class="box-2 box">
        <p>系统管理</p>
        <router-link
          class="navitem icon font_family icon-telegram"
          :to="{ path: '/MediaManagement' }"
        >
          媒体管理
        </router-link>
        <router-link
          class="navitem icon font_family icon-telegram"
          :to="{ path: '/UserManagement' }"
        >
          用户管理
        </router-link>
        <router-link
          class="navitem icon font_family icon-telegram"
          :to="{ path: '/PlanManagement' }"
        >
          方案管理
        </router-link>
        <router-link class="navitem icon font_family icon-telegram" :to="{ path: '/KeyWords' }">
          关键词管理
        </router-link>
        <router-link class="navitem icon font_family icon-telegram" :to="{ path: '/Setting' }">
          设置
        </router-link>
        <!-- <p>数据库</p>
        <router-link class="navitem icon font_family icon-add" :to="{ path: '/DataCenter' }">
          数据中心
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ADD_DIALOG } from '@/components/dialog'
import AddPlan from '@/views/MonitoringPlan/components/AddPlan.vue'
import { delPlan, queryAllPlan } from '@/apis'
import { PlansRes } from '@/apis/types'
import mitts from '@/utils/mitts'
import usePlanStore from '@/store/common/usePlan'
import { SUCCESS_CODE } from '@/constants'

const usePlan = usePlanStore()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const addDialog = inject(ADD_DIALOG)!

onMounted(async () => {
  mitts.on('updatePlanList', getPlan)
  await getPlan()
  usePlan.setPlan(planList[0])
})

const show = () => {
  addDialog({
    title: '新增监测方案',
    width: '500px',
    component: shallowRef(AddPlan)
  })
}

const planList = ref<PlansRes[]>()
const getPlan = async () => {
  try {
    const res = await queryAllPlan()
    if (res.code === 0) {
      planList.value = res.data
      // planList.value.length > 0 && usePlan.setPlan(planList.value[0])
    } else {
      ElMessage.warning(res.message)
    }
  } catch (error) {
    console.log(error)
  }
}

const deletePlan = async (id: number) => {
  if (usePlan.$state.id === id) {
    ElMessage.warning('选中方案无法删除')
    return
  }
  ElMessageBox.confirm('删除此方案?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const res = await delPlan(id)
      if (res.code === SUCCESS_CODE) {
        ElMessage.success(res.message)
        getPlan()
      } else {
        ElMessage.warning(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

const handlePlan = (item: PlansRes) => {
  usePlan.setPlan(item)
}
</script>

<style scoped lang="less">
.siderbar {
  display: flex;
  flex-direction: column;
  width: 240px;
  min-width: 240px;
  border-right: 1px solid @border-hr;
  .logobox {
    height: 64px;
    padding: 16px;
    .logo {
      width: 204px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      border: 1px solid #1f2023;
      box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.3) inset;
      font-size: 16px;
      font-family: 500;
      p {
        background: linear-gradient(270deg, #4ea7fc 0%, #fff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .navbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;

    p {
      font-size: 12px;
      font-weight: 500;
      color: @Secondary-text;
    }
    .box {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .box-2 {
      margin-top: auto;
      padding-bottom: 48px;
    }
  }
  .navitem {
    color: @primary-text;
    cursor: pointer;
    display: flex;
    padding: 5px 8px;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      border-radius: 4px;
      background: @nav-hover;
    }
    &.active {
      // color: red;
      border-radius: 4px;
      background: @nav-hover;
    }
  }
}
</style>
