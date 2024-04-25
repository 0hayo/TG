<template>
  <div class="h-full flex">
    <div
      class="w-360px border-r-solid border-r-1px border-[var(--tg-border-color)] p-16px shrink-0"
    >
      <div>添加关键词</div>
      <el-input v-model="input" placeholder="Type something" class="mt-16px">
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>
      <div class="mt-20px">可用关键词</div>
      <div
        class="h-58px border-solid border-1px border-[var(--tg-border-color)] rounded-4px mt-16px flex items-center justify-between px-16px"
      >
        <p>方子舟读者交流群</p>
        <div>
          <el-button link :icon="Delete">删除</el-button>
          <el-button :icon="Plus">启用</el-button>
        </div>
      </div>
    </div>
    <div class="grow p-16px flex flex-col">
      <div>正在使用关键词</div>
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
        class="mt-16px"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus, Search } from '@element-plus/icons-vue'

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped></style>
