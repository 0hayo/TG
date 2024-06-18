<template>
  <div
    class="flex-row w-full min-w-1280px h-100vh overflow-hidden bg-Layout-Card color-Neutral-Text-Primary layout"
  >
    <Nav></Nav>
    <div class="w-full overflow-hidden">
      <Header></Header>
      <router-view v-slot="{ Component }" style="height: calc(100% - 3rem); overflow-y: hidden">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue'
import Header from '@/components/Header.vue'
</script>

<style scoped lang="less">
.layout {
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  border-radius: 8px;
}
</style>
