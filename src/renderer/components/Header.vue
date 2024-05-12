<template>
  <div class="drag">
    <div class="left">
      <div class="icon font_family icon-side-bar"></div>
      <p class="title text-aaa">工作台</p>
      <!-- <p>></p> -->
      <!-- <p class="subheading">监测方案一</p> -->
    </div>
    <div class="right">
      <div class="time flex gap-24px">
        <el-icon v-if="ringtones" class="cursor-pointer" @click="setRingtones(false)"
          ><Bell
        /></el-icon>
        <el-icon v-else class="cursor-pointer" @click="setRingtones(true)">
          <MuteNotification />
        </el-icon>
      </div>
      <div class="window">
        <div class="icon font_family icon-Subtract" @click="setWindowSize('min')"></div>
        <div class="icon font_family icon-Maximize" @click="setWindowSize('max')"></div>
        <div class="icon font_family icon-Dismiss" @click="setWindowSize('close')"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMonitoringData from '@/store/common/monitoringData'

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
