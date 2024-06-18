<template>
  <div v-if="planCount == '0'" class="w-full h-full">
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
    <div :class="showEditor ? 'w-140' : 'w-0'" class="transition-all duration-150 ease-in-out">
      <div
        class="w-140 flex justify-between items-center border-b-Neutral-Stroke-Stroke border-b px-2"
      >
        <iconBtn icon-name="login-box-line" @click="handleEditor" />
        <Toolbar
          class="flex bg-transparent h-10"
          style="background-color: transparent"
          :editor="editorRef"
          :default-config="toolbarConfig"
          mode="default"
        />
        <XButton class="p-2" text icon-name="export-line" @click="saveDocx"> 导出word</XButton>
        <XButton class="p-2" text icon-name="export-line" @click="screenshot"> 截图 </XButton>
      </div>

      <Editor
        v-model="valueHtml"
        class="w-140"
        style="height: calc(100vh - 40px); overflow-y: hidden"
        :default-config="editorConfig"
        mode="simple"
        @on-created="handleCreated"
      />

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
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { cloneDeep } from 'lodash'

const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    // 菜单 key
    'headerSelect',
    'fontFamily',
    // 分割线
    '|',
    'color',
    'bgColor',
    // 菜单 key
    'bold',
    'italic',
    'numberedList'
  ]
}

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  // const editorConfig = {                       // JS 语法
  MENU_CONF: {
    fontFamily: {
      fontFamilyList: [
        '方正小标宋简体',
        '黑体',
        '仿宋_GB2312',
        { name: '仿宋', value: '仿宋' },
        'Arial',
        'Tahoma',
        'Verdana'
      ]
    },
    fontSize: {
      fontSizeList: [
        { name: '二号', value: '29px' },
        { name: '三号', value: '21px' }
      ]
    }
  },
  // 其他属性...
  placeholder: '请输入内容...'
}

const handleEditor = () => {
  mitts.emit('editor')
}

const planCount = ref('0')
const isElectron = ref(false)
onBeforeMount(() => {
  planCount.value = useRoute().params.planCount as string
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

const currentMsg = ref<MessagesRes>()
// 内容 HTML
const valueHtml = computed(
  () => `<h1 style="text-align: center;"><span style="font-size: 29px; font-family: 方正小标宋简体;">（自主发现研判）电报网民“
    ${currentMsg.value?.sender_id}”在“${currentMsg.value
      ?.channel_name}”群组称“${currentMsg.value?.hit_keyword.join('、')}
    ”攻击我领导人</span></h1><p><br></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:仿宋_GB2312;">工作发现，${currentMsg
    .value?.message_time}，电报网民“${currentMsg.value?.sender_id}”在“${currentMsg.value
    ?.channel_name}”群组称“${currentMsg.value?.hit_keyword.join('、')}”攻击我领导人。</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:黑体;">一、样本内容</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:仿宋_GB2312;">${currentMsg
    .value?.message_text}</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:黑体;">二、梳理分析</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:仿宋_GB2312;">截止目前**点赞***转发（截止目前暂无转发评论）</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:黑体;">三、链接</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:仿宋_GB2312;">${currentMsg
    .value?.message_link}</span></p>
<p style="text-align:left;text-indent:32pt;line-height:28px;"><span style="font-size:21px;font-family:黑体;">四、附件</span></p>
${msgImg.value}
`
)
const msgImg = ref()

onMounted(() => {
  mitts.on('editor', () => {
    showEditor.value = !showEditor.value
  })
})
// 组件销毁时，也及时销毁编辑器
// onBeforeUnmount(() => {
//   const editor = editorRef.value
//   if (editor == null) return
//   editor.destroy()
// })

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
  // valueHtml.value = valueHtml.value + `<img src='${base64}' />`
}

const addDialog = inject(ADD_DIALOG)

const show = () => {
  addDialog?.({
    title: '新增监测方案',
    width: '',
    showfooter: false,
    component: shallowRef(AddPlan)
  })
}

const webviewRef = ref()
const tgSrc = ref('')
const tgWight = ref('')
const handleMsg = async (msg: MessagesRes) => {
  currentMsg.value = cloneDeep(msg)
  currentMsg.value.message_text = currentMsg.value.message_text
    .replaceAll('<p id="keyword">', '')
    .replaceAll('</p>', '')
  tgSrc.value = msg.msg_online_link
  tgWight.value = msg.message_link
  msgImg.value = ''
}

const screenshot = () => {
  window.electron?.ipcRenderer.send('capture-webview-screenshot')
}

onMounted(() => {
  window.electron?.ipcRenderer.on('screenshot-data', (_, buffer) => {
    const blob = new Blob([buffer], { type: 'image/png' })
    const fileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    fileReader.addEventListener('load', function () {
      const res = fileReader.result
      msgImg.value = `<img src="${res}" />`
    })
  })
})
</script>

<style lang="less">
.w-e-text-container {
  h1 {
    font-size: 20pt;
    font-weight: bold;
  }
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  h3 {
    font-size: 1.17em;
    font-weight: bold;
  }
  h4 {
    font-size: 1em;
    font-weight: bold;
  }
  h5 {
    font-size: 0.83em;
    font-weight: bold;
  }
}
</style>
