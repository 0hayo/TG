<template>
  <div class="flex-row w-full h-100vh overflow-hidden bg-Layout-Card">
    <Nav></Nav>
    <div class="w-full">
      <Header></Header>
      <router-view v-slot="{ Component }" style="height: calc(100% - 3rem)">
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
