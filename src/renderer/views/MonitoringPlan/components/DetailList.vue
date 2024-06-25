<template>
  <div
    class="h-full scroll-smooth overflow-y-auto overflow-x-clip grid grid-flow-row auto-rows-max px-4 py-2 gap-3"
  >
    <div
      v-for="item in monitoringData"
      :key="item.message_id"
      class="w-108 flex-col gap-2 px-4 py-2 rounded text-base-regular border-2 border-transparent cursor-pointer msg_hover"
      :class="{ msg_active: activeMsgId === item.message_id }"
      @click="
        () => {
          activeMsgId = item.message_id
          emits('handleMsg', item)
        }
      "
    >
      <div class="flex justify-between">
        <div class="flex-inline gap-2">
          <div class="color-Neutral-Text-Tertiary">命中词</div>
          <div class="color-Danger-Text-Primary">{{ item.hit_keyword }}</div>
        </div>
        <div class="color-Neutral-Text-Tertiary">{{ item.message_time }}</div>
      </div>
      <div class="flex-inline gap-2">
        <div class="color-Neutral-Text-Tertiary">发言人</div>
        <div class="color-Primary-Text-Primary">{{ item.sender_name }}</div>
      </div>
      <div class="flex-inline gap-2">
        <div class="color-Neutral-Text-Tertiary">群名</div>
        <div class="color-Primary-Text-Primary">{{ item.channel_group_name }}</div>
      </div>
      <hr />
      <div class="flex">
        <div
          class="color-Neutral-Text-Secondary text-wrap text-ellipsis overflow-hidden"
          v-html="item.message_text"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessagesRes, PlanInfo, latestKeyMessages } from '@/apis/monitoringPlan'
import useMonitoringData from '@/store/common/monitoringData'
import usePlanStore from '@/store/common/usePlan'
import { useQueryAllGroup } from '@/composable'
import moment from 'moment'
import useUser from '@/store/common/useUser'

const user = useUser()

let timer
useQueryAllGroup(() => {
  planInfo.value = usePlan.getPlanInfo
  queryLatestMessages()
})

onUnmounted(() => {
  clearInterval(timer)
})

const emits = defineEmits<{
  handleMsg: [MessagesRes]
}>()

const usePlan = usePlanStore()

const activeMsgId = ref('')

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const monitoring = useMonitoringData()

const planInfo = ref<PlanInfo>()

const monitoringData = ref<MessagesRes[]>([])

const MAX_MESSAGES = 500 // 设置保留的最大消息数

const queryLatestMessages = async () => {
  if (monitoring.getGroupIds.length === 0) return
  const keywords =
    usePlan.planList.filter((v) => v.plan_id === planInfo.value?.plan_id)[0]?.inspect_keys || []
  if (!keywords) return
  try {
    const res = await latestKeyMessages({
      channel_name: monitoring.getGroupIds.join(','),
      keywords: keywords.join(','),
      time_threshold: moment().format('YYYY-MM-DD 00:00:00')
    })
    if (res.IsSuccess) {
      const newMessages = res.Data

      // 更新 hit_keyword 和 message_text
      newMessages.forEach((item) => {
        item.hit_keyword = item.hit_keyword || []
        item.hit_keyword.forEach((v) => {
          item.message_text = item.message_text.replaceAll(v, `<p id="keyword">${v}</p>`)
        })
      })

      // 合并数据并去重
      const mergedData = [...monitoringData.value]
      newMessages.forEach((newItem) => {
        if (!mergedData.some((existingItem) => existingItem.message_id === newItem.message_id)) {
          mergedData.push(newItem)
        }
      })

      // 按消息时间排序
      // mergedData.sort((a, b) => new Date(b.message_time) - new Date(a.message_time))
      mergedData.sort((a, b) => {
        return new Date(b.message_time).getTime() - new Date(a.message_time).getTime()
      })

      // 保留最新的 MAX_MESSAGES 条消息
      monitoringData.value = mergedData.slice(0, MAX_MESSAGES)

      if (monitoringData.value.length > 0 && !activeMsgId.value) {
        activeMsgId.value = monitoringData.value[0].message_id
        emits('handleMsg', monitoringData.value[0])
      }
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  } finally {
    user.token &&
      setTimeout(() => {
        queryLatestMessages()
      }, 1000)
  }
}
</script>

<style scoped lang="less">
.msg_active {
  border-color: #fff;
  box-shadow:
    0px 0px 18px 0 rgba(59, 130, 246, 0.35),
    0px 0px 12px 0 rgba(59, 130, 246, 0.25),
    0px 0px 6px 0 rgba(59, 130, 246, 0.15);
}
.msg_hover:hover {
  border-color: #fff;
  box-shadow:
    0px 0px 18px 0 rgba(59, 130, 246, 0.35),
    0px 0px 12px 0 rgba(59, 130, 246, 0.25),
    0px 0px 6px 0 rgba(59, 130, 246, 0.15);
}
</style>
