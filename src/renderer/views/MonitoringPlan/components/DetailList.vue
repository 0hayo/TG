<template>
  <div
    class="h-full scroll-smooth overflow-y-auto grid grid-flow-row auto-rows-max px-4 py-2 gap-3"
  >
    <!-- <transition-group name="el-zoom-in-center"> -->
    <div
      v-for="item in monitoringData"
      :key="item.sender_id"
      class="flex-col gap-1 px-4 py-2 rounded text-base-regular border-2 border-transparent cursor-pointer msg_hover"
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
      <!-- <div class="descriptions__cell">
        <div class="descriptions_label">群名</div>
        <div class="descriptions_content">{{ item.channel_name }}</div>
      </div> -->
      <div class="flex-inline gap-2">
        <div class="color-Neutral-Text-Tertiary">发言人</div>
        <div class="color-Primary-Text-Primary">{{ item.sender_name }}</div>
      </div>
      <hr />
      <div class="flex">
        <div class="color-Neutral-Text-Secondary" v-html="item.message_text"></div>
      </div>
      <!-- <div class="">{{ item.message_link }}</div> -->
      <!-- <div class="">{{ item.msg_online_link }}</div> -->
      <!-- <div class="button">
        <el-button
          class="font_family icon-Frame"
          @click="
            handleCopy(
              `用户：${item.sender_name}；用户ID：${item.sender_id}；时间：${item.message_time}；群名：${item.channel_name}；言论：${item.message_text}；`
            )
          "
          >复制举证
        </el-button>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessagesRes, latestKeyMessages } from '@/apis/monitoringPlan'
import usePlanStore from '@/store/common/usePlan'

const emits = defineEmits<{
  handleMsg: [MessagesRes]
}>()

const usePlan = usePlanStore()

const activeMsgId = ref('')

const monitoringData = ref<MessagesRes[]>([])
const queryLatestMessages = async (v: string[]) => {
  try {
    const res = await latestKeyMessages({
      channel_name: 'EG521,11123',
      keywords: v.join(',')
    })
    if (res.IsSuccess) {
      monitoringData.value = res.Data
      monitoringData.value.forEach((item) => {
        item.hit_keyword.forEach((v) => {
          item.message_text = item.message_text.replaceAll(v, `<p id="keyword">${v}</p>`)
        })
      })
      if (monitoringData.value.length > 0) {
        activeMsgId.value = monitoringData.value[0].message_id
        emits('handleMsg', monitoringData.value[0])
      }
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => usePlan.getKeywords,
  (v) => {
    queryLatestMessages(v)
  },
  {
    deep: true,
    immediate: true
  }
)
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
