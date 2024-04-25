<template>
  <div class="h-full flex justify-center items-center">
    <div>
      <p>主题选择</p>
      <el-radio-group v-model="radio" class="flex gap-16px mt-16px">
        <div>
          <div class="w-100px h-40px bg-[#58ACF2] rounded-4px"></div>
          <el-radio value="1" size="large">主题 1</el-radio>
        </div>
        <div>
          <div class="w-100px h-40px bg-[#58ACF2] rounded-4px"></div>
          <el-radio value="1" size="large">主题 2</el-radio>
        </div>
        <div>
          <div class="w-100px h-40px bg-[#58ACF2] rounded-4px"></div>
          <el-radio value="1" size="large">主题 3</el-radio>
        </div>
      </el-radio-group>
      <p class="mt-24px">模式选择</p>
      <el-radio-group v-model="radio2" class="mt-16px">
        <el-radio-button value="New York">跟随系统</el-radio-button>
        <el-radio-button value="Washington">白天</el-radio-button>
        <el-radio-button value="Los Angeles">夜晚</el-radio-button>
      </el-radio-group>
      <p class="mt-24px">字体大小</p>
      <p class="mt-16px">仅调节方案展示字体大小</p>
      <div
        class="w-448px h-116px flex flex-col gap-8px p-8px mt-16px rounded-4px border-solid border-1px border-[var(--tg-border-color)]"
      >
        <div class="flex justify-between">
          <div class="flex gap-8px">
            <img class="w-20px h-20px" src="../../assets/img/Avatar.png" alt="#" />
            <p>房子周</p>
          </div>
          <p>02:18:23</p>
        </div>
        <div class="grow flex gap-24px">
          <div>春节前，来领个App Store红包吧（如果领到大的不想用，也可以选择充值5块钱</div>
          <img src="../../assets/img/Rectangle6.png" alt="#" />
        </div>
      </div>
      <el-radio-group v-model="radio3" class="mt-16px">
        <el-radio value="1">默认</el-radio>
        <el-radio value="2">大号</el-radio>
        <el-radio value="2">特大号</el-radio>
      </el-radio-group>
      <p class="mt-24px">账户设置</p>
      <el-button class="mt-16px" :icon="User">修改密码</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'

const radio = ref()
const radio2 = ref()
const radio3 = ref()
</script>

<style scoped></style>
