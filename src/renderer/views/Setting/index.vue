<template>
  <div class="h-full flex justify-center p-6">
    <div class="flex-col gap-4 w-146">
      <div class="flex-col gap-2">
        <h6 class="text-h6-medium">主题选择</h6>
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
      </div>
      <div class="flex-col gap-2">
        <h6 class="text-h6-medium">模式选择</h6>
        <el-radio-group v-model="radio2">
          <el-radio-button value="New York">跟随系统</el-radio-button>
          <el-radio-button value="Washington">白天</el-radio-button>
          <el-radio-button value="Los Angeles">夜晚</el-radio-button>
        </el-radio-group>
      </div>
      <div class="flex-col gap-2">
        <h6 class="text-h6-medium">
          字体大小
          <p class="text-base-regular color-Danger-Text-Primary">仅调节方案展示字体大小</p>
        </h6>
        <div
          class="flex-col gap-1 px-4 py-2 rounded text-base-regular border border-transparent hover:bg-Neutral-Fill-PrimaryDebit hover:shadow-2xl cursor-pointer hover:border-Layout-White"
        >
          <div class="flex justify-between">
            <div class="flex-inline gap-2">
              <div class="">命中词</div>
              <div class="">wudi</div>
            </div>
            <div class="">2021</div>
          </div>

          <div class="flex-inline gap-2">
            <div class="">发言人</div>
            <div class="">2222</div>
          </div>
          <hr />
          <div class="flex">
            <div class="h-20 text-clip overflow-hidden">2222</div>
            <img src="../../assets/img/Rectangle6.png" alt="#" />
          </div>
        </div>
        <el-radio-group v-model="radio3" class="mt-16px">
          <el-radio value="1">默认</el-radio>
          <el-radio value="2">大号</el-radio>
          <el-radio value="2">特大号</el-radio>
        </el-radio-group>
      </div>
      <div class="flex-col gap-2">
        <h6 class="text-h6-medium">账户设置</h6>
        <XButton class="self-start" icon-name="draft-line"> 修改密码 </XButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import XButton from '@/components/XButton/index.vue'

const radio = ref()
const radio2 = ref()
const radio3 = ref()
</script>

<style scoped></style>
