<template>
  <div class="p-16px! flex flex-col">
    <div class="flex items-center gap-2">
      <h6 class="inline-flex items-center h-12 text-h6-medium">方案管理列表</h6>
      <XButton type="Primary" icon-name="add-line">新增方案</XButton>
    </div>
    <div class="relative w-full grow">
      <el-table :data="[]" stripe height="100%" style="position: absolute; width: 100%">
        <el-table-column label="序号" width="60" type="index" />
        <el-table-column prop="" label="方案名称" />
        <el-table-column prop="" label="监测媒体" />
        <el-table-column prop="" label="状态" />
        <el-table-column prop="" label="生效时间" />
        <el-table-column prop="" label="创建人" />
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
</template>

<script setup lang="ts">
import XButton from '@/components/XButton/index.vue'

const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped></style>
