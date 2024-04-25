<script setup lang="ts">
// import Layout from '@/views/Layout/index.vue'
import DialogProvide from '@/components/dialog/index.vue'
// import Tip from '@/components/Tip.vue'
import { getAllGroupKeyword } from './utils'
import useMonitoringData from '@/store/common/monitoringData'
// import Socket from './utils/websocket'
import { MonitoringData } from './store/types/interface'
// import { v4 as uuidv4 } from 'uuid'
// import useConfig from './store/common/config'
// import useThemeColors from './store/common/useThemeColors'
import { io } from 'socket.io-client'

const time = ref(false)

// const config = useConfig()
const monitoringData = useMonitoringData()
onBeforeMount(async () => {
  // const data = await window.getConfig()
  // config.setUrl(data)
  // monitoringData.setMaxMsg(data.maxMsg)

  // const socket = io(data.wsUrl)
  const socket = io('http://43.134.107.71:10002/message')

  socket.connect()

  socket.on('connect', () => {
    console.log('connected')
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  socket.on('message', async (...args: MonitoringData[]) => {
    console.log(args)

    const data = args[0]
    if (monitoringData.$state.ringtones) {
      // const warningAudioDom = document.getElementById('tipAudio') as HTMLAudioElement
      // // 触发播放
      // warningAudioDom?.play()
      // // 消息通知
      // ElNotification({
      //   title: data.groupName,
      //   dangerouslyUseHTMLString: true,
      //   message: h(Tip, { data })
      // })
      new Notification(data.groupName, { body: data.message, renotify: true, tag: '1' })
    }
    data.keyWords.forEach((v) => {
      data.message = data.message.replaceAll(v, `<b style="color: #eb5757">${v}</b>`)
    })
    monitoringData.pushMonitoringData(data)
  })

  getAllGroupKeyword()

  time.value = new Date().getTime() > new Date('2025-2-10').getTime()
})
</script>

<template>
  <DialogProvide>
    <div v-if="time" class="flag">试用已到期</div>
    <router-view />
  </DialogProvide>
  <audio id="tipAudio" src="./assets/mp3/bo.mp3" controls hidden="true"></audio>
</template>

<style lang="less" scoped>
.flag {
  width: 100vw;
  height: 100vh;
  text-align: center;
  line-height: 100vh;
}

.bgColor {
  background-color: var(--el-bg);
}
</style>
