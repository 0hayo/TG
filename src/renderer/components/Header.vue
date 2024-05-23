<template>
  <div
    class="h-12 flex justify-between items-center pr-8px border-b border-b-Neutral-Stroke-Stroke"
  >
    <div
      class="flex h-12 items-center justify-between w-120 px-4 border-b-Neutral-Stroke-Stroke"
      :class="{ 'border-r': route.name === 'MonitoringPlan' }"
    >
      <h6 class="flex gap-1 text-h6-medium"><i class="ri-gps-line"></i>{{ route.meta.title }}</h6>
      <div class="drag flex-1 h-full"></div>
      <iconBtn
        v-if="route.name === 'MonitoringPlan'"
        icon-name="list-settings-line"
        text
        @click="showDrawer = true"
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
          <p class="text-Neutral-Text-Primary">我是谁</p>
        </div>
        <div>
          <i v-if="ringtones" class="ri-moon-line cursor-pointer" @click="setRingtones(false)"></i>
          <i v-else class="ri-sun-line cursor-pointer" @click="setRingtones(true)"></i>
        </div>
        <div class="flex">
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

  <el-drawer ref="drawerRef" v-model="showDrawer" title="看板过滤" :with-header="false" size="300">
    <div class="filterTitle">关键词过滤</div>
    <!-- <el-checkbox-group v-model="selectKeywordsList" class="listbox">
      <el-checkbox v-for="v in keywordsList" :key="v" :label="v" border />
    </el-checkbox-group> -->
    <div class="footer">
      <el-button class="font_family icon-filter">保存</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import useMonitoringData from '@/store/common/monitoringData'
import { ElDrawer } from 'element-plus'
import moment from 'moment'
import XButton from '@/components/XButton/index.vue'
import iconBtn from '@/components/iconbtn/index.vue'
import mitts from '@/utils/mitts'

const route = useRoute()
const monitoringData = useMonitoringData()

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

const showDrawer = ref(false)

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const handleEditor = () => {
  console.log(111111)

  mitts.emit('editor')
}
</script>

<style scoped lang="less">
.drag {
  -webkit-app-region: drag;
}
</style>
