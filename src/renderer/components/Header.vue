<template>
  <div
    class="drag h-12 flex justify-between items-center pr-8px border border-b-Neutral-Stroke-Stroke"
  >
    <div
      class="flex h-12 items-center justify-between w-36.5rem px-4 border-r border-b-Neutral-Stroke-Stroke"
    >
      <div class="flex">
        <p>sss</p>
        五一方案
      </div>
      <tgButton text>
        <el-icon><Plus /></el-icon>过滤</tgButton
      >
    </div>
    <div class="flex-row gap-4">
      <div class="flex">
        <img src="" alt="" />
        <p class="text-Neutral-Text-Primary">我是谁</p>
      </div>
      <div>
        <el-icon v-if="ringtones" class="cursor-pointer" @click="setRingtones(false)"
          ><Bell
        /></el-icon>
        <el-icon v-else class="cursor-pointer" @click="setRingtones(true)">
          <MuteNotification />
        </el-icon>
      </div>
      <div class="flex">
        <div @click="setWindowSize('min')">
          <el-icon><Minus /></el-icon>
        </div>
        <div @click="setWindowSize('max')">
          <el-icon><FullScreen /></el-icon>
        </div>
        <div @click="setWindowSize('close')">
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMonitoringData from '@/store/common/monitoringData'
import tgButton from '@/components/tgButton/index.vue'

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
</script>

<style scoped lang="less">
.drag {
  -webkit-app-region: drag;
}
</style>
