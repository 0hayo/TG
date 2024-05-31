<template>
  <div
    class="mb-12px transition ease-in-out delay-150 duration-500 h-14.5 rounded-1 flex items-center justify-between px-16px border border-Neutral-Stroke-Stroke hover:border-Layout-white hover:shadow-lg"
  >
    <div>
      <p class="text-base-medium">{{ type === 'group' ? groupName : keyword }}</p>
      <p v-if="type === 'group'" class="text-sm-regular text-Neutral-Text-Secondary">
        {{ keyword }}
      </p>
    </div>
    <iconBtn icon-name="delete-bin-line" @click="emits('delKeyword')"></iconBtn>
    <XButton type="Primary" icon-name="add-line" @click="handleAdd[type]">添加</XButton>
  </div>
</template>

<script setup lang="ts">
import XButton from '../XButton/index.vue'
import iconBtn from '../iconbtn/index.vue'
import { updateStatusKey } from '@/apis/KeyWords'
import { searchTitle, addUserMonitored } from '@/apis/mediaManagement'

const props = defineProps<{
  keyword: string
  type: 'group' | 'keyword'
}>()

const emits = defineEmits<{
  delKeyword: [boolean?]
}>()

onMounted(() => {
  props.type === 'group' && getGroupName()
})

const groupName = ref('')

const handleAdd = {
  group: async () => {
    try {
      const res = await addUserMonitored({
        group_id: props.keyword
      })
      if (res.IsSuccess) {
        ElMessage.success(res.Message)
        emits('delKeyword')
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  },
  keyword: async () => {
    try {
      const res = await updateStatusKey({
        keyword: props.keyword,
        status: 2
      })
      if (res.IsSuccess) {
        ElMessage.success(res.Message)
        emits('delKeyword', true)
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const getGroupName = async () => {
  try {
    const res = await searchTitle({
      tg_group_id: props.keyword
    })
    if (res.IsSuccess) {
      groupName.value = res.Data.group_title
      ElMessage.success(res.Message)
      emits('delKeyword', true)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="less"></style>
