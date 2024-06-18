<template>
  <div
    class="h-12 flex justify-between items-center pr-8px border-b border-b-Neutral-Stroke-Stroke"
  >
    <div
      class="flex h-12 items-center justify-between w-116 px-4 border-Neutral-Stroke-Stroke"
      :class="{ 'border-r': route.name === 'MonitoringPlan' }"
    >
      <h6 class="flex gap-1 text-h6-medium"><i class="ri-gps-line"></i>{{ route.meta.title }}</h6>
      <div class="drag flex-1 h-full"></div>
      <iconBtn
        v-if="route.name === 'MonitoringPlan'"
        icon-name="list-settings-line"
        text
        @click="showAddPaln"
      />
    </div>
    <div class="flex-row flex-auto justify-between items-center h-full">
      <XButton
        v-if="route.name === 'MonitoringPlan'"
        class="justify-start"
        text
        icon-name="draft-line"
        @click="handleEditor"
      >
        舆情上报编辑
      </XButton>
      <div class="drag flex-1 h-full"></div>
      <div class="flex-row gap-4">
        <div class="flex">
          <img src="" alt="" />
          <p class="text-Neutral-Text-Primary">{{ user.getUserInfo.name }}</p>
        </div>
        <div>
          <i v-if="ringtones" class="ri-moon-line cursor-pointer" @click="setRingtones(false)"></i>
          <i v-else class="ri-sun-line cursor-pointer" @click="setRingtones(true)"></i>
        </div>
        <div v-if="isElectron" class="flex">
          <iconBtn
            icon-name="subtract-line"
            type="WindowsControls"
            size="lg"
            @click="setWindowSize('min')"
          ></iconBtn>
          <iconBtn
            icon-name="aspect-ratio-line"
            type="WindowsControls"
            size="lg"
            @click="setWindowSize('max')"
          ></iconBtn>
          <iconBtn
            icon-name="close-line"
            type="WindowsControls"
            size="lg"
            @click="setWindowSize('close')"
          ></iconBtn>
        </div>
      </div>
    </div>
  </div>

  <!-- <el-drawer
    ref="drawerRef"
    v-model="showDrawer"
    v-loading="keyParams.loading"
    title="看板过滤"
    :with-header="false"
    size="300"
    @open="openKeyword"
  >
    <div class="filterTitle">关键词过滤</div>
    <el-checkbox-group v-model="keyParams.keywords" class="listbox">
      <el-checkbox
        v-for="v in keyParams.keywordsList"
        :key="v.id"
        :value="v.keyword"
        :label="v.keyword"
        :border="true"
        class="mt-8px"
        style="width: 100%"
      />
    </el-checkbox-group>
    <div class="footer">
      <el-button class="font_family icon-filter" @click="saveKeyword">保存</el-button>
    </div>
  </el-drawer> -->
</template>

<script setup lang="ts">
import useMonitoringData from '@/store/common/monitoringData'
// import { ElDrawer } from 'element-plus'
import XButton from '@/components/XButton/index.vue'
import iconBtn from '@/components/iconbtn/index.vue'
import mitts from '@/utils/mitts'
// import { getAllKey, keywordData } from '@/apis/KeyWords'
// import usePlanStore from '@/store/common/usePlan'
import useUser from '@/store/common/useUser'
import { addDialog } from './dialog'
import AddPlan from '@/views/MonitoringPlan/components/AddPlan.vue'

const route = useRoute()
// const usePlan = usePlanStore()
const user = useUser()
const monitoringData = useMonitoringData()

const isElectron = ref(false)
onBeforeMount(() => {
  isElectron.value = !!window.electronApi
})

const setWindowSize = (type: string) => {
  window.electronApi.setWindowSize(type)
}

const ringtones = computed(() => monitoringData.$state.ringtones)
const setRingtones = (v: boolean) => {
  !v
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
  monitoringData.setRingtones(v)
}

// const showDrawer = ref(false)

// const drawerRef = ref<InstanceType<typeof ElDrawer>>()

// const keyParams = reactive({
//   keywordsList: [] as keywordData[],
//   loading: false,
//   keywords: [] as string[]
// })
// const getAllKeyword = async () => {
//   try {
//     keyParams.loading = true
//     const res = await getAllKey()
//     if (res.IsSuccess) {
//       keyParams.keywordsList = res.Data
//     } else {
//       keyParams.loading = false
//       ElMessage.warning(res.Message)
//     }
//   } catch (_) {
//     keyParams.loading = false
//   }
// }
// const openKeyword = () => {
//   keyParams.keywords = usePlan.getKeywords
//   getAllKeyword()
// }

// const saveKeyword = () => {
//   usePlan.setKeywords(keyParams.keywords)
// }

const handleEditor = () => {
  mitts.emit('editor')
}

const showAddPaln = () => {
  addDialog?.({
    title: '修改监测方案',
    width: '',
    showfooter: false,
    props: {
      type: 'edit'
    },
    component: shallowRef(AddPlan)
  })
}
</script>

<style scoped lang="less">
.drag {
  -webkit-app-region: drag;
}
.listbox {
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  position: relative;
  padding-bottom: 50px;
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 12px;
  &::before {
    content: '';
    position: absolute;
    bottom: 52px;
    left: -24px;
    width: 300px;
    height: 1px;
    border-bottom: 1px solid var(--Layout-Black);
  }
}
</style>
