<template>
  <div
    v-loading="loading"
    class="transition ease-in-out duration-600 h-14.5 rounded-1 flex items-center justify-between px-16px border-0.5 border-Neutral-Stroke-Stroke hover:border-Layout-White hover:shadow-lg"
  >
    <div class="w-43 flex-col items-start">
      <p class="w-full text-base-medium whitespace-nowrap truncate">
        {{ type === 'group' ? groupName || groupId : keyword }}
      </p>
      <p
        v-if="type === 'group'"
        class="text-sm-regular text-Neutral-Text-Secondary w-full text-base-medium whitespace-nowrap truncate"
      >
        {{ keyword }}
      </p>
    </div>
    <iconBtn icon-name="delete-bin-line" @click="emits('delKeyword')"></iconBtn>
    <XButton type="Primary" icon-name="add-line" @click="handleAdd[type]">添加</XButton>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/store/common/useUser'
import XButton from '../XButton/index.vue'
import iconBtn from '../iconbtn/index.vue'
import { updateStatusKey } from '@/apis/KeyWords'
import { searchTitle, addUserMonitored, suAddGroup } from '@/apis/mediaManagement'
import { UserType } from '@/common/types'

const user = useUser()

const props = defineProps<{
  keyword: string
  groupId?: string
  type: 'group' | 'keyword'
}>()

const emits = defineEmits<{
  delKeyword: [boolean?]
  update: []
}>()

onMounted(() => {
  props.type === 'group' && !props.groupId && getGroupName()
})

const groupName = ref('')
const group_id = ref('')

const handleAdd = {
  group: async () => {
    try {
      const res = await (user.getAccountLevel === UserType.general ? addUserMonitored : suAddGroup)(
        {
          group_url: props.keyword,
          group_name: groupName.value || props.groupId || '',
          group_id: group_id.value || props.keyword.split('https://t.me/')[1]
        }
      )
      if (res.IsSuccess) {
        ElMessage.success(res.Message)
        emits('update')
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
        emits('update')
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const loading = ref(false)
const getGroupName = async () => {
  try {
    loading.value = true
    const res = await searchTitle({
      group_url: props.keyword
    })
    if (res.IsSuccess) {
      groupName.value = res.Data.group_title
      group_id.value = res.Data.group_id
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
      emits('delKeyword')
    }
  } catch (_) {
    emits('delKeyword')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="less"></style>
