<script setup lang="ts">
// import Layout from '@/views/Layout/index.vue'
// import DialogProvide from '@/components/dialog/index.vue'
// import Tip from '@/components/Tip.vue'
import { getAllGroupKeyword } from './utils'
import useMonitoringData from '@/store/common/monitoringData'
// import Socket from './utils/websocket'
import { MonitoringData } from './store/types/interface'
// import { v4 as uuidv4 } from 'uuid'
import useConfig from './store/common/config'
import useThemeColors from './store/common/useThemeColors'
import { io } from 'socket.io-client'

const time = ref(false)

const config = useConfig()
const monitoringData = useMonitoringData()
onBeforeMount(async () => {
  const data = await window.getConfig()
  config.setUrl(data)
  monitoringData.setMaxMsg(data.maxMsg)

  const socket = io(data.wsUrl)
  // const socket = io('http://43.134.107.71:10002/message')

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

const srcUrl = ref('')

const themeColors = useThemeColors()
const handle = () => {
  const root = document.querySelector(':root') as any
  Object.keys(themeColors.$state.default).forEach((v) => {
    root?.style.setProperty(v, themeColors.$state.default[v])
  })
}
</script>

<template>
  <!-- <DialogProvide>
    <div v-if="time" class="flag">试用已到期</div>
    <Layout v-else />
  </DialogProvide>
  <audio id="tipAudio" src="./assets/mp3/bo.mp3" controls hidden="true"></audio> -->

  <div class="w-100% h-100% flex gap-20px">
    <div class="w-200px bgColor">
      <p class="h-40px line-heignt-40px text-center" @click="srcUrl = 'https://www.baidu.com'">1</p>
      <p
        class="h-40px line-heignt-40px text-center"
        @click="
          srcUrl =
            'https://web.telegram.org/a/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3DTGcsdome&post=30'
        "
      >
        2
      </p>
      <p
        class="h-40px line-heignt-40px text-center"
        @click="
          srcUrl =
            'https://web.telegram.org/a/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3DTGcsdome&post=31'
        "
      >
        3
      </p>
      <p class="h-40px line-heignt-40px text-center" @click="handle">修改</p>
    </div>
    <webview class="w-full h-100%" :src="srcUrl"></webview>
  </div>
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
