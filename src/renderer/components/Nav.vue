<template>
  <div class="flex-col bg-Layout-Sidebar">
    <div class="w-12.5rem h-12 px-4 line-height-3rem color-Neutral-Text-Primary drag">
      <div class="flex gap-2 items-center">
        <img src="../assets/img/logo.svg" alt="lgog" />
        <p class="text-h6-medium">谛听巡查</p>
      </div>
    </div>
    <div class="flex items-center h-9 px-4 color-Neutral-Text-Primary text-sm-medium">
      {{ time }}
    </div>
    <div class="flex-col flex-auto flex-justify-between items-center self-stretch px-4 pb-4">
      <div
        v-if="user.getAccountLevel == UserType.general"
        class="flex-col items-center self-stretch gap-2"
      >
        <div class="flex-row flex-justify-between items-center self-stretch">
          <p class="text-sm-medium color-Neutral-Text-Tertiary">方案</p>
          <IconBtn icon-name="add-line" @click="show"></IconBtn>
        </div>
        <router-link
          v-for="item in planList"
          :key="item.plan_id"
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: `/MonitoringPlan/${item.plan_id}` }"
          @click="handlePlan(item)"
        >
          <i class="ri-gps-line"></i>{{ item.plan_name }}
        </router-link>
      </div>
      <div class="flex-col items-center self-stretch gap-2">
        <div class="self-start h-6">
          <p class="text-sm-medium color-Neutral-Text-Tertiary">系统管理</p>
        </div>
        <router-link
          v-if="user.getAccountLevel == UserType.general"
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/PlanManagement' }"
        >
          <i class="ri-article-line"></i>方案管理
        </router-link>
        <router-link
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/MediaManagement' }"
        >
          <i class="ri-rss-line"></i>媒体管理
        </router-link>
        <router-link
          v-if="user.getAccountLevel == UserType.general"
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/KeyWords' }"
        >
          <i class="ri-t-box-line"></i>关键词管理
        </router-link>
        <router-link
          v-if="user.getAccountLevel !== UserType.general"
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/UserManagement' }"
        >
          <i class="ri-shield-user-line"></i>用户管理
        </router-link>

        <router-link
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/Setting' }"
        >
          <i class="ri-settings-line"></i>设置
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBtn from '@/components/iconbtn/index.vue'
import { ADD_DIALOG } from '@/components/dialog'
import AddPlan from '@/views/MonitoringPlan/components/AddPlan.vue'
import mitts from '@/utils/mitts'
import usePlanStore from '@/store/common/usePlan'
import moment from 'moment'
import { PlanInfo, getUserPlans } from '@/apis/monitoringPlan'
import useUser from '@/store/common/useUser'
import { UserType } from '@/common/types'

const user = useUser()
const usePlan = usePlanStore()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const addDialog = inject(ADD_DIALOG)!

onMounted(async () => {
  mitts.on('updatePlanList', getPlan)
  await getPlan()
})

const show = () => {
  addDialog({
    title: '新增方案',
    width: '',
    component: shallowRef(AddPlan),
    showfooter: false
  })
}

const planList = ref<PlanInfo[]>()
const getPlan = async () => {
  try {
    const res = await getUserPlans()
    if (res.IsSuccess) {
      planList.value = res.Data
      usePlan.setPlanList(res.Data)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

// const deletePlan = async (id: number) => {
//   if (usePlan.$state.id === id) {
//     ElMessage.warning('选中方案无法删除')
//     return
//   }
//   ElMessageBox.confirm('删除此方案?', '提示', {
//     confirmButtonText: '确认',
//     cancelButtonText: '取消',
//     type: 'warning'
//   }).then(async () => {
//     try {
//       // const res = await delPlan(id)
//       // if (res.code === SUCCESS_CODE) {
//       //   ElMessage.success(res.message)
//       //   getPlan()
//       // } else {
//       //   ElMessage.warning(res.message)
//       // }
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }

const handlePlan = (item: PlanInfo) => {
  usePlan.setPlan(item)
}

const time = ref('')
let timer

onMounted(() => {
  timer = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD h:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="less">
.router-link-exact-active {
  background: var(--Primary-Fill-FillActive, #3b82f6);
  color: var(--Neutral-Text-PrimaryDebit, #fafafa);
}
.drag {
  -webkit-app-region: drag;
}
.logo {
}
</style>
