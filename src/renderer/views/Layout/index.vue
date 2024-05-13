<template>
  <div class="flex-row w-full h-100vh overflow-hidden bg-layout-cardbg">
    <Nav></Nav>
    <div class="flex flex-1 flex-col w-full h-full">
      <Header></Header>
      <router-view v-slot="{ Component }">
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

<style scoped lang="less"></style>
