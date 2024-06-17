<template>
  <div class="h-full flex flex-col gap-10px">
    <XButton class="w-full" @handle-btn="emit('handleBtn')"
      ><el-icon><Plus /></el-icon> 添加TG账户
    </XButton>
    <div v-loading="userLoading" class="grow h-0 overflow-y-auto">
      <div
        v-for="item in userList"
        :key="item.chatId"
        class="w-full accountBox"
        :class="{ active: chatId === item.chatId }"
        @click="chatId = item.chatId"
      >
        {{ item.nickname }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryAllUser } from '@/apis'
import { UserRes } from '@/apis/types'
import XButton from '@/components/XButton/index.vue'
import { SUCCESS_CODE } from '@/constants'

const props = defineProps<{
  chatId: number
}>()

const emit = defineEmits<{
  handleBtn: []
  'update:chatId'
}>()

const chatId = useVModel(props, 'chatId', emit)

onMounted(() => {
  getAllUser()
})

const userList = ref<UserRes[]>([])

const userLoading = ref(false)
const getAllUser = async () => {
  userLoading.value = true
  const res = await queryAllUser()
  if (res.code === SUCCESS_CODE) {
    userList.value = res.data.length > 0 ? res.data : []
    userLoading.value = false
  }
}

defineExpose({
  getAllUser
})
</script>

<style scoped lang="less">
.accountBox {
  border-bottom: 0.5px solid @border-hr;
  // width: 212px;
  height: 44px;
  line-height: 44px;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
  cursor: pointer;
  &.active {
    background: rgba(78, 167, 252, 0.1);
    // border-bottom: 0.5px solid @primary;
  }
}
</style>
