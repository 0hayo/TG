<template>
  <div class="header">
    <div class="left">
      <div class="icon font_family icon-side-bar"></div>
      <p class="title text-aaa">工作台</p>
      <!-- <p>></p> -->
      <!-- <p class="subheading">监测方案一</p> -->
    </div>
    <div class="right">
      <div class="time flex gap-24px">
        <p>{{ time }}</p>
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
import moment from 'moment'

const monitoringData = useMonitoringData()

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
.header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid @border-hr;
  overflow: hidden;
  -webkit-app-region: drag;

  .left {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: 1px;
    color: @title-text;
    gap: 4px;
    -webkit-app-region: no-drag;

    .subheading {
      font-size: 14px;
      color: @primary-text;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: end;
    -webkit-app-region: no-drag;
    .time {
      font-size: 14px;
      padding-bottom: 8px;
      line-height: 14px;
      color: @Secondary-text;
    }
    .window {
      position: absolute;
      right: 0;
      top: 0;
      display: inline-flex;
      padding: 4px 16px;
      align-items: flex-start;
      gap: 16px;
      border-radius: 0px 0px 0px 38px;
      border: 1px solid @border-hr;
      background: @bg-color-2;

      .icon {
        font-size: 12px;
      }
    }
  }
}
</style>
