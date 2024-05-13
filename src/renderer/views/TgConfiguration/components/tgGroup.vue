<template>
  <div class="h-full flex flex-col gap-10px">
    <XButton class="w-full" @handle-btn="emit('handleBtn')"
      ><el-icon><Plus /></el-icon>添加群</XButton
    >
    <div v-loading="groupLoading" class="grow h-0 overflow-y-auto">
      <Checkbox
        v-model:modelValue="checkAll"
        :indeterminate="isIndeterminate"
        class="w-full"
        @change="handleCheckAllChange"
      >
        全部
      </Checkbox>
      <el-checkbox-group v-model="selectList" class="w-full" @change="changeGroup">
        <Checkbox
          v-for="item in groupList"
          :key="item.groupId"
          class="w-full"
          :label="item.groupId"
          >{{ item.groupNickname }}</Checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryAllGroup } from '@/apis'
import { GroupRes } from '@/apis/types'
import Checkbox from '@/components/checkbox/index.vue'
import XButton from '@/components/XButton/index.vue'
import { SUCCESS_CODE } from '@/constants'
import { CheckboxValueType } from 'element-plus'

const props = defineProps<{
  selectList: string[]
  chatId: number
}>()

const emit = defineEmits<{
  handleBtn: []
  'update:selectList'
}>()

const selectList = useVModel(props, 'selectList', emit)

watch(
  () => props.chatId,
  (v) => {
    if (!v) return
    selectList.value = []
    checkAll.value = false
    isIndeterminate.value = false
    getAllGroup()
  }
)

const checkAll = ref(false)
const isIndeterminate = ref(false)
const groupList = ref<GroupRes[]>([])

const handleCheckAllChange = (v: boolean) => {
  selectList.value = v ? groupList.value.map((v) => v.groupId) : []
  isIndeterminate.value = false
}

const changeGroup = (v: CheckboxValueType[]) => {
  if (v.length === groupList.value.length) {
    isIndeterminate.value = false
    checkAll.value = true
  } else if (v.length > 0) {
    isIndeterminate.value = true
    checkAll.value = false
  } else {
    isIndeterminate.value = false
    checkAll.value = false
  }
}

const groupLoading = ref(false)
const getAllGroup = async () => {
  groupLoading.value = true
  const res = await queryAllGroup({
    chatIds: [props.chatId]
  })
  if (res.code === SUCCESS_CODE) {
    groupList.value = res.data
    groupLoading.value = false
  }
}

defineExpose({
  getAllGroup
})
</script>

<style scoped></style>
