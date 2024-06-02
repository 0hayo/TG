<template>
  <div class="h-full scroll-smooth overflow-y-auto grid px-4 py-2 gap-2">
    <!-- <transition-group name="el-zoom-in-center"> -->
    <div
      v-for="item in monitoringData"
      :key="item.sender_id"
      :class="[
        'flex-col gap-1 px-4 py-2 rounded text-base-regular border border-transparent hover:bg-Neutral-Fill-PrimaryDebit  hover:shadow-2xl cursor-pointer  hover:border-Layout-White'
      ]"
      @click="emits('handleMsg', item)"
    >
      <div class="flex justify-between">
        <div class="flex-inline gap-2">
          <div class="">命中词</div>
          <div class="">{{ item.hit_keyword }}</div>
        </div>
        <div class="">{{ item.message_time }}</div>
      </div>
      <!-- <div class="descriptions__cell">
        <div class="descriptions_label">群名</div>
        <div class="descriptions_content">{{ item.channel_name }}</div>
      </div> -->
      <div class="flex-inline gap-2">
        <div class="">发言人</div>
        <div class="">{{ item.sender_name }}</div>
      </div>
      <hr />
      <div class="flex">
        <div class="h-20 text-clip overflow-hidden" v-html="item.message_text"></div>
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

const monitoringData = ref<MessagesRes[]>([])
const queryLatestMessages = async (v: string[]) => {
  try {
    const res = await latestKeyMessages({
      channel_name: 'EG521,11123',
      keywords: v.join(',')
    })
    if (res.IsSuccess) {
      monitoringData.value = res.Data
      monitoringData.value.length > 0 && emits('handleMsg', monitoringData.value[0])
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

<style scoped lang="less"></style>
