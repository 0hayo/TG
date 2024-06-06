<template>
  <div v-if="$route.params.planCount == '0'" class="w-full h-full">
    <div class="img"></div>
    <div>暂无无监测方案，<a @click="show"> 请点我添加</a>监测方案</div>
  </div>
  <div v-else class="flex-row flex-1">
    <div class="w-120 border-r border-Neutral-Stroke-Stroke">
      <DetailListVue @handle-msg="handleMsg" />
    </div>
    <div class="flex-1">
      <webview
        v-if="isElectron"
        id="wv"
        ref="webviewRef"
        class="w-full h-full"
        :src="tgSrc"
      ></webview>
      <TelegramPost v-else-if="currentMsg" :key="tgSrc" :current-msg="currentMsg" />
    </div>
    <div :class="showEditor ? 'w-120' : 'w-0'" class="transition-all duration-700 ease-in-out">
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc; height: calc(10vh - 48px)"
          :editor="editorRef"
          :default-config="toolbarConfig"
          mode="default"
        />
        <Editor
          v-model="valueHtml"
          style="height: 80vh; overflow-y: hidden"
          :default-config="editorConfig"
          mode="default"
          @on-created="handleCreated"
        />
      </div>
      <XButton type="Primary" @click="saveDocx">导出word</XButton>
      <iconBtn icon-name="screenshot-line" @click="screenshotStatus = true"></iconBtn>
      <!--截图组件-->
      <screen-short
        v-if="screenshotStatus"
        @destroy-component="destroyComponent"
        @get-image-data="getImg"
      ></screen-short>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ADD_DIALOG } from '@/components/dialog'
import DetailListVue from './components/DetailList.vue'
import AddPlan from './components/AddPlan.vue'
import TelegramPost from './components/TelegramPost.vue'
// import usePlanStore from '@/store/common/usePlan'
// import { updatePlan } from '@/apis'
// import { SUCCESS_CODE } from '@/constants'
// import mitts from '@/utils/mitts'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'
import { MessagesRes } from '@/apis/monitoringPlan'
import mitts from '@/utils/mitts'
import XButton from '@/components/XButton/index.vue'
import iconBtn from '@/components/iconbtn/index.vue'

const isElectron = ref(false)
onBeforeMount(() => {
  isElectron.value = !!window.electronApi
})

const saveDocx = () => {
  asBlob(valueHtml.value).then((data) => {
    saveAs(data, '实施方案.docx')
  })
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const showEditor = ref(false)

// 内容 HTML
const valueHtml = ref('<h1>hello</h1>')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

onMounted(() => {
  mitts.on('editor', () => {
    showEditor.value = !showEditor.value
  })
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const screenshotStatus = ref<boolean>(false)
// 销毁组件函数
const destroyComponent = function (status: boolean) {
  screenshotStatus.value = status
}
// 获取裁剪区域图片信息
const getImg = function (base64: string) {
  console.log('截图组件传递的图片信息', base64)
  valueHtml.value = valueHtml.value + `<img src='${base64}' />`
}

const addDialog = inject(ADD_DIALOG)

const show = () => {
  addDialog?.({
    title: '新增监测方案',
    width: '600px',
    showfooter: false,
    component: shallowRef(AddPlan)
  })
}

const webviewRef = ref()
const tgSrc = ref('')
const tgWight = ref('')
const currentMsg = ref<MessagesRes>()
const handleMsg = async (msg: MessagesRes) => {
  currentMsg.value = msg
  tgSrc.value = msg.msg_online_link
  tgWight.value = msg.message_link
  // valueHtml.value = `用户：${msg.sender_name}；用户ID：${msg.sender_id}；时间：${msg.message_time}；群名：${msg.channel_name}；言论：${msg.message_text}；`

  const image = await webviewRef.value.capturePage()
  console.log(image)
}
</script>

<style scoped lang="less"></style>
