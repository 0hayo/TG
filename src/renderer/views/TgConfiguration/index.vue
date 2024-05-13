<template>
  <div class="grow flex">
    <TgColumSlot class="flex-1/5" @handle-btn="delAccount">
      <TgAccount ref="accountRef" v-model:chatId="chatId" @handle-btn="addAccount" />
    </TgColumSlot>
    <TgColumSlot class="flex-1/5" title="TG群列表" @handle-btn="delGroup">
      <TgGroup
        ref="groupRef"
        v-model:selectList="selectGroup"
        :chat-id="chatId"
        @handle-btn="addTgGroup"
      />
    </TgColumSlot>
    <TgColumSlot class="flex-3/5" title="监测关键词">
      <KeyWordTable ref="keywordsRef" :chat-id="chatId" :select-group="selectGroup" />
      <template #footer>
        <XButton class="w-full" @handle-btn="addKeyWord">
          <el-icon><Plus /></el-icon> 为所选栏目添加监测关键词
        </XButton>
        <XButton class="w-full" @handle-btn="delKeyWords">
          <el-icon><Delete /></el-icon> 删除所选栏目关键词
        </XButton>
      </template>
    </TgColumSlot>
  </div>
</template>

<script setup lang="ts">
import { ADD_DIALOG } from '@/components/dialog'
import XButton from '@/components/XButton/index.vue'
import TgColumSlot from '@/components/tgColumnSlot/index.vue'
import AddTgAccount from './components/AddTgAccount.vue'
import TgGroup from './components/tgGroup.vue'
import AddTgGroup from './components/AddTgGroup.vue'
import AddTgKeyWord from './components/AddTgKeyWord.vue'
import KeyWordTable from './components/keyWordTable.vue'
import TgAccount from './components/tgAccount.vue'
import { deleteChannel, deleteUser } from '@/apis'
import { ElMessageBox } from 'element-plus'
import { getAllGroupKeyword } from '@/utils'
import { SUCCESS_CODE } from '@/constants'

const chatId = ref<number>(0)
const accountRef = ref<InstanceType<typeof TgAccount>>()
const delAccount = async () => {
  ElMessageBox.confirm('删除所选账户?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await deleteUser(chatId.value)
    if (res.code === SUCCESS_CODE) {
      accountRef.value?.getAllUser()
      ElMessage.success('删除成功')
    }
  })
}

const selectGroup = ref<string[]>([])
const groupRef = ref<InstanceType<typeof TgGroup>>()
const delGroup = async () => {
  ElMessageBox.confirm('删除所选群组?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await deleteChannel({
      chatId: chatId.value,
      groupIds: selectGroup.value
    })
    if (res.code === SUCCESS_CODE) {
      selectGroup.value = []
      groupRef.value?.getAllGroup()
      ElMessage.success('删除成功')
      getAllGroupKeyword()
    }
  })
}

const addDialog = inject(ADD_DIALOG)
// 添加TG账户
const addAccount = () => {
  addDialog?.({
    title: '添加TG账户',
    width: '657px',
    component: shallowRef(AddTgAccount),
    callBack(name: string) {
      if (name === 'update') {
        accountRef.value?.getAllUser()
      }
    }
  })
}
// 添加TG群
const addTgGroup = () => {
  addDialog?.({
    title: '添加TG群',
    width: '657px',
    props: {
      chatId
    },
    component: shallowRef(AddTgGroup),
    callBack(name: string) {
      if (name === 'update') {
        groupRef.value?.getAllGroup()
      }
    }
  })
}

const keywordsRef = ref<InstanceType<typeof KeyWordTable>>()
//添加TG关键词
const addKeyWord = () => {
  addDialog?.({
    title: '添加关键词',
    width: '657px',
    props: {
      chatId,
      selectGroup
    },
    component: shallowRef(AddTgKeyWord),
    callBack(name: string) {
      if (name === 'update') {
        keywordsRef.value?.getKeywords()
      }
    }
  })
}
const delKeyWords = () => {
  keywordsRef.value?.delKeywords()
}
</script>

<style scoped lang="less"></style>
