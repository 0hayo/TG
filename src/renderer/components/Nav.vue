<template>
  <div class="flex-col bg-Layout-sidebar">
    <div class="w-12.5rem h-12 px-4 line-height-3rem color-Neutral-Text-Primary drag">
      <div class="logo"><p class="text-h6-medium">谛听巡查</p></div>
    </div>
    <div class="flex items-center h-9 px-4 color-Neutral-Text-Primary text-sm-medium">
      {{ time }}
    </div>
    <div class="flex-col flex-auto flex-justify-between items-center self-stretch px-4 pb-4">
      <div class="flex-col items-center self-stretch gap-2">
        <div class="flex-row flex-justify-between items-center self-stretch">
          <p class="text-sm-medium color-Neutral-Text-Tertiary">方案</p>
          <IconBtn icon-name="add-line" @click="show"></IconBtn>
        </div>
        <router-link
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/MonitoringPlan/1' }"
        >
          <i class="ri-gps-line"></i>五一方案
        </router-link>
        <router-link
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/MonitoringPlan/2' }"
        >
          <i class="ri-gps-line"></i>六一方案
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
      <div class="flex-col items-center self-stretch gap-2">
        <div class="self-start h-6">
          <p class="text-sm-medium color-Neutral-Text-Tertiary">系统管理</p>
        </div>
        <router-link
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
          class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
          :to="{ path: '/KeyWords' }"
        >
          <i class="ri-t-box-line"></i>关键词管理
        </router-link>
        <router-link
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
        <!-- <p>数据库</p>
        <router-link class="navitem icon font_family icon-add" :to="{ path: '/DataCenter' }">
          数据中心
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBtn from '@/components/iconbtn/index.vue'
import { ADD_DIALOG } from '@/components/dialog'
import AddPlan from '@/views/MonitoringPlan/components/AddPlan.vue'
import { delPlan, queryAllPlan } from '@/apis'
import { PlansRes } from '@/apis/types'
import mitts from '@/utils/mitts'
import usePlanStore from '@/store/common/usePlan'
import { SUCCESS_CODE } from '@/constants'
import moment from 'moment'

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
    title: '新增方案',
    width: '600px',
    component: shallowRef(AddPlan),
    showfooter: true
  })
}

const planList = ref<PlansRes[]>()
const getPlan = async () => {
  // try {
  //   const res = await queryAllPlan()
  //   if (res.code === 0) {
  //     planList.value = res.data
  //     // planList.value.length > 0 && usePlan.setPlan(planList.value[0])
  //   } else {
  //     ElMessage.warning(res.message)
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
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

// const handlePlan = (item: PlansRes) => {
//   usePlan.setPlan(item)
// }

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
</style>
