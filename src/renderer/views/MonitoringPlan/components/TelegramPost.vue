<template>
  <div class="w-full h-full overflow-y-auto pb-6 gap-2 relative">
    <div class="sticky top-0 py-4 bg-Layout-Card/90 backdrop-blur-sm flex-col items-center">
      <div class="w-125 pl-9">
        <h2 class="text-h2-medium">{{ currentMsg.channel_name }}</h2>
        <p class="text-xl-regular underline">{{ currentMsg.message_link }}</p>
        <p class="text-h4-medium color-Danger-Text-Primary">
          命中关键词: {{ currentMsg.hit_keyword }}
        </p>
        <p class="text-lg-regular">{{ currentMsg.message_time }}</p>
      </div>
    </div>
    <div ref="telegramContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { MessagesRes } from '@/apis/monitoringPlan'

const props = defineProps<{
  currentMsg: MessagesRes
}>()

onMounted(() => {
  insertTelegramScript()
})

const telegramContainer = ref()

const insertTelegramScript = () => {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://telegram.org/js/telegram-widget.js?22'
  script.setAttribute('data-telegram-post', props.currentMsg.message_link.split('https://t.me/')[1])
  script.setAttribute('data-width', '100%')
  script.setAttribute('data-color', '')
  script.setAttribute('data-dark', '1')
  script.setAttribute('data-dark-color', '')
  telegramContainer.value.appendChild(script)
}
</script>

<style scoped lang="less">
/* 根据需要添加样式 */
</style>
