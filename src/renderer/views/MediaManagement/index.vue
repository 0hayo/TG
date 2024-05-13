<template>
  <div class="w-full h-full flex-row">
    <div class="w-200px p-16px flex-col gap-2 border-r border-b-Neutral-Stroke-Stroke">
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">媒体</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 font-size-3.5 hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-telegram-fill"></i>Telegram
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 font-size-3.5 hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-twitter-fill"></i>Twitter
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 font-size-3.5 hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-facebook-box-fill"></i>facebook
      </nav>
    </div>
    <div class="w-1rem shrink-0 p-16px groups">
      <p>TG群组查询</p>
      <el-input v-model="input" placeholder="请在此输入你需要查询的群链接" class="mt-16px">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
      <p class="text-16px line-height-24px mt-16px">查询结果</p>
      <div
        class="h-58px border-solid border-1px border-[var(--tg-border-color)] rounded-4px mt-16px flex items-center justify-between px-16px"
      >
        <div>
          <p class="text-3 line-height-22px">方子舟读者交流群</p>
          <p class="text-12px text-#A6A6A6 line-height-20px">https://t.me/fangshimin_tg</p>
        </div>
        <el-button :icon="Plus">启用</el-button>
      </div>
    </div>
    <div class="p-16px flex flex-col" style="width: calc(100% - 550px)">
      <div class="flex gap-24px items-center">
        <p class="text-16px line-height-24px">查询结果</p>
        <el-select placeholder="所有单位" style="width: 200px"> </el-select>
        <el-select placeholder="监测中" style="width: 200px"> </el-select>
      </div>
      <div class="w-full grow mt-16px relative">
        <el-table :data="[]" stripe height="100%" style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="" min-width="100" label="单位" />
          <el-table-column prop="" min-width="100" label="名称" />
          <el-table-column prop="" min-width="100" label="链接" />
          <el-table-column prop="" min-width="100" label="状态" />
          <el-table-column prop="" min-width="100" label="添加时间" />
          <el-table-column prop="" min-width="100" label="添加人" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">取消监测</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="mt-16px"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
</script>
