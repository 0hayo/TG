<template>
  <div class="h-full flex">
    <div class="w-90 flex-col shrink-0 gap-2 p-16px border-r border-b-Neutral-Stroke-Stroke">
      <h6 class="inline-flex items-center h-12 text-h6-medium">添加关键词</h6>
      <el-input v-model="input" placeholder="输入新的关键词" class="">
        <template #prefix>
          <i class="ri-rss-line"></i>
        </template>
        <template #append><i class="ri-corner-down-left-line"></i></template>
      </el-input>
      <h6 class="inline-flex items-center text-h6-medium">曾用关键词</h6>
      <div class="scroll-smooth overflow-y-auto">
        <div
          class="h-58px border-solid border-1px border-[var(--tg-border-color)] rounded-4px mt-16px flex items-center justify-between px-16px"
        >
          <p>方子舟读者交流群</p>
          <div>
            <el-button link :icon="Delete">删除</el-button>
            <el-button :icon="Plus">启用</el-button>
          </div>
        </div>
        <LinkCard></LinkCard>
      </div>
    </div>
    <div class="grow p-16px flex flex-col">
      <h6 class="inline-flex items-center h-12 text-h6-medium">关键词列表</h6>

      <div class="relative w-full grow mt-16px">
        <el-table :data="[]" stripe height="100%" style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="" label="关键词" />
          <el-table-column prop="" label="状态" />
          <el-table-column prop="" label="启用时间" />
          <el-table-column prop="" label="启用人" />
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
        class="mt-16px justify-end"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus, Search } from '@element-plus/icons-vue'
import LinkCard from '@/components/linkCard/index.vue'

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped></style>
