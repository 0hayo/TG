<template>
  <div class="flex flex-row w-full h-100vh overflow-hidden bg-white dark:bg-slate-800">
    <Nav></Nav>
    <div class="flex flex-1 flex-col w-full h-full">
      <Header></Header>
      <router-view v-slot="{ Component }" class="layout">
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
  flex: 1;
  display: flex;
  height: calc(100vh - 64px);
  overflow: hidden;
}
</style>
