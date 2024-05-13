<template>
  <div
    class="transition ease-in-out delay-150 duration-500 h-14.5 rounded-1 flex items-center justify-between px-16px border border-Neutral-Stroke-Stroke hover:border-Layout-white hover:shadow-lg"
  >
    <div>
      <p class="text-base-medium">方子舟读者交流群</p>
      <p class="text-sm-regular text-Neutral-Text-Secondary">https://t.me/fangshimin_tg</p>
    </div>
    <iconBtn icon-name="delete-bin-line"></iconBtn>
    <XButton type="Primary" icon-name="add-line">添加</XButton>
  </div>
</template>

<script setup lang="ts">
import XButton from '../XButton/index.vue'
import iconBtn from '../iconbtn/index.vue'
</script>

<style scoped lang="less"></style>
