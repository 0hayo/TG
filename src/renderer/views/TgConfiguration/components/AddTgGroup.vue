<template>
  <div class="flex-col items-center gap-8 !px-20">
    <p class="link">请在下方输入框输入你需要监测的群链接</p>

    <el-input
      ref="inputRef"
      v-model="chatUrl.nickname"
      class="w-280px"
      maxlength="100"
      placeholder="请输入群名"
    ></el-input>
    <el-input
      ref="inputRef"
      v-model="chatUrl.url"
      class="w-280px"
      maxlength="100"
      placeholder="请输入群地址"
    >
      <template #append>
        <el-button
          link
          class="icon font_family icon-add"
          @click="
            () => {
              chatUrls.push(JSON.parse(JSON.stringify(chatUrl)))
              chatUrl.url = ''
              chatUrl.nickname = ''
              inputRef?.focus()
            }
          "
        />
      </template>
    </el-input>

    <div class="w-280px urlList">
      <p v-for="v in chatUrls" :key="v.url">{{ v.nickname + ': ' + v.url }}</p>
    </div>
  </div>

  <div class="flex justify-end !py-10px !mt-10">
    <XButton icon-name="add" class="w-25" :disabled="chatUrls.length <= 0" @handle-btn="handleBtn">
      完成
    </XButton>
  </div>
</template>

<script setup lang="ts">
import { createChannel } from '@/apis'
import XButton from '@/components/XButton/index.vue'
import { SUCCESS_CODE } from '@/constants'
import { getAllGroupKeyword } from '@/utils'

const props = defineProps<{
  chatId: string
}>()

const emit = defineEmits<{
  close: [string]
}>()

onMounted(() => {
  inputRef.value?.focus()
})

const chatUrl = reactive({
  url: '',
  nickname: ''
})
const chatUrls = ref<(typeof chatUrl)[]>([])
const inputRef = ref<HTMLElement>()

const handleBtn = async () => {
  if (!props.chatId) {
    ElMessage.warning('请选择TG账户后再新增TG群')
  }
  try {
    const res = await createChannel({
      chatId: props.chatId,
      groupUrls: chatUrls.value
    })

    if (res.code === SUCCESS_CODE) {
      ElMessage.success('新增成功')
      emit('close', 'update')
      getAllGroupKeyword()
    } else {
      ElMessage.warning(res.message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="less">
.link {
  color: @primary;
}
.urlList {
  p {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid @border-hr;
    color: @Secondary-text;
  }
}
</style>
