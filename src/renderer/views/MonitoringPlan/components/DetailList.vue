<template>
  <div class="list">
    <!-- <transition-group name="el-zoom-in-center"> -->
    <div
      v-for="item in monitoringData"
      :key="item.sender_id"
      class="descriptions"
      @click="emits('handleMsg', item)"
    >
      <div class="descriptions__cell_group">
        <div class="descriptions__cell">
          <div class="descriptions_label">命中词</div>
          <div class="descriptions_content">{{ item.hit_keyword }}</div>
        </div>
        <div class="time">{{ item.message_time }}</div>
      </div>
      <div class="descriptions__cell">
        <div class="descriptions_label">群名</div>
        <div class="descriptions_content">{{ item.channel_name }}</div>
      </div>
      <div class="descriptions__cell">
        <div class="descriptions_label">发言人</div>
        <div class="descriptions_content">{{ item.sender_name }}</div>
      </div>
      <hr />
      <div class="descriptions__cell column">
        <div class="descriptions_label">言论</div>
        <div class="descriptions_content box" v-html="item.message_text"></div>
      </div>
      <div class="button">
        <el-button
          class="font_family icon-Frame"
          @click="
            handleCopy(
              `用户：${item.sender_name}；用户ID：${item.sender_id}；时间：${item.message_time}；群名：${item.channel_name}；言论：${item.message_text}；`
            )
          "
          >复制举证
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleCopy } from '@/utils'
import { MessagesRes, latestKeyMessages } from '@/apis/monitoringPlan'

const emits = defineEmits<{
  handleMsg: [MessagesRes]
}>()

onMounted(() => {
  // setInterval(() => {
  queryLatestMessages()
  // }, 1000)
})

const monitoringData = ref<MessagesRes[]>([])
const queryLatestMessages = async () => {
  try {
    const res = await latestKeyMessages({
      channel_name: 'EG521',
      keywords: '微信,集团'
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
</script>

<style scoped lang="less">
.list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  // padding: 0 24px;
  gap: 12px;
  border-radius: 8px;
  .descriptions {
    position: relative;

    &:hover {
      box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.2);
      .button {
        display: flex;
      }
    }
    .button {
      position: absolute;
      display: none;
      flex-direction: column;
      width: 92px;
      right: 16px;
      top: 48px;
    }
    font-size: 3;
    line-height: 100%;
    background-color: @bg-color-2;
    padding: 16px;
    border-radius: 8px;
    border: 0.5px solid @border-hr;
    display: flex;
    gap: 10px;
    flex-direction: column;
    .descriptions__cell_group {
      display: flex;
      justify-content: space-between;
    }
    hr {
      border: 0.5px solid @border-hr;
    }
    .descriptions__cell {
      display: flex;
      gap: 16px;

      &.column {
        flex-direction: column;
      }
    }
    .descriptions_label {
      color: @Secondary-text;
    }
    .descriptions_content {
      flex: 1;
      color: @primary-text;
      &.box {
        padding: 8px;
        background-color: @bg-color-1;
        border-radius: 4px;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
        line-height: 18px;
        .tag {
          font-weight: normal;
          color: @Danger;
        }
      }
    }
  }
}
</style>
