<script setup lang="ts">
import DialogProvide from '@/components/dialog/index.vue'

const time = ref(false)

onBeforeMount(async () => {
  time.value = new Date().getTime() > new Date('2025-2-10').getTime()
})
</script>

<template>
  <DialogProvide>
    <div v-if="time" class="flag">试用已到期</div>
    <router-view />
  </DialogProvide>
  <audio id="tipAudio" src="./assets/mp3/bo.mp3" controls hidden="true"></audio>
</template>

<style lang="less" scoped></style>
