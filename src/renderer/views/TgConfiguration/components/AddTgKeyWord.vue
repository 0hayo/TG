<template>
  <div class="flex-col items-center gap-8 !px-20">
    <p class="link">请在下方输入框输入你需要监测的关键词</p>

    <el-input ref="inputRef" v-model="keyword" class="w-280px" maxlength="30">
      <template #append>
        <el-button
          link
          class="icon font_family icon-add"
          @click="
            () => {
              if (!keyword) return
              keywordList.push(keyword)
              keyword = ''
              inputRef?.focus()
            }
          "
        />
      </template>
    </el-input>

    <div class="w-280px urlList flex flex-wrap gap-10px">
      <el-tag
        v-for="(v, i) in keywordList"
        :key="v"
        closable
        type="info"
        @close="
          () => {
            console.log(i)
            keywordList.splice(i, 1)
          }
        "
      >
        {{ v }}
      </el-tag>
    </div>
  </div>

  <div class="flex justify-end !py-10px !mt-10">
    <XButton
      icon-name="add"
      class="w-25"
      :disabled="keywordList.length <= 0"
      @handle-btn="addKeyword"
    >
      完成
    </XButton>
  </div>
</template>

<script setup lang="ts">
import { addKeywords } from '@/apis'
import XButton from '@/components/XButton/index.vue'
import { SUCCESS_CODE } from '@/constants'
import { getAllGroupKeyword } from '@/utils'

const props = defineProps<{
  chatId: string
  selectGroup: string[]
}>()

const emit = defineEmits<{
  close: [string]
}>()

onMounted(() => {
  inputRef.value?.focus()
})

const keyword = ref('')
const keywordList = ref<string[]>([])
const inputRef = ref<HTMLElement>()

const addKeyword = async () => {
  const res = await addKeywords({
    groupIds: props.selectGroup,
    keywords: keywordList.value
  })
  if (res.code === SUCCESS_CODE) {
    ElMessage.success('新增成功')
    emit('close', 'update')
    getAllGroupKeyword()
  } else {
    ElMessage.warning(res.message)
  }
}

defineExpose({
  addKeyword
})
</script>

<style scoped lang="less">
.link {
  // color: @primary;
}
.urlList {
  max-height: 150px;
  padding: 5px 0;
  overflow-y: auto;
  .el-tag {
    padding: 0 8px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    border: 1px solid @button-stroke;
    color: @Secondary-text;
  }
}
</style>
