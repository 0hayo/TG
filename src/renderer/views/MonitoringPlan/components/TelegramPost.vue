<template>
  <div class="w-full h-full overflow-y-auto pb-6 gap-2 relative">
    <div class="sticky top-0 py-4 bg-Layout-Card/90 backdrop-blur-sm flex-col items-center">
      <div class="w-125 pl-9">
        <h2 class="text-h2-medium">群名称</h2>
        <p class="text-xl-regular underline">https://t.me/lixuezhu890928</p>
        <p class="text-h4-medium color-Danger-Text-Primary">命中关键词:</p>
        <p class="text-lg-regular">2024年5月12日 20:32:24</p>
      </div>
    </div>
    <div ref="telegramContainer"></div>
  </div>
</template>

<script>
export default {
  name: 'TelegramPost',
  mounted() {
    this.insertTelegramScript()
  },
  methods: {
    insertTelegramScript() {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://telegram.org/js/telegram-widget.js?22'
      script.setAttribute('data-telegram-post', 'EG521/43468979')
      script.setAttribute('data-width', '100%')
      script.setAttribute('data-color', '')
      script.setAttribute('data-dark', '1')
      script.setAttribute('data-dark-color', '')
      this.$refs.telegramContainer.appendChild(script)
    }
  }
}
</script>

<style scoped lang="less">
/* 根据需要添加样式 */
</style>
