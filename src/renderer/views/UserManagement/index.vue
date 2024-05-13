<template>
  <div class="w-full h-full flex-row">
    <div class="w-200px p-4 flex-col gap-2 border-r border-b-Neutral-Stroke-Stroke">
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">管理员</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-user-line"></i>管理员
      </nav>
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">单位</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-add-line"></i>新增地区
      </nav>
      <el-tree class="mt-8px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div class="flex-1 flex flex-col p-16px">
      <div class="flex items-center gap-2">
        <h6 class="inline-flex items-center h-12 text-h6-medium">管理员用户列表</h6>
        <XButton type="Primary" icon-name="add-line">新增用户</XButton>
      </div>
      <div class="relative w-full grow">
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
import { Plus } from '@element-plus/icons-vue'
import XButton from '@/components/XButton/index.vue'

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '岳阳',
    children: [
      {
        label: '岳阳楼区'
      },
      {
        label: '岳阳临湘'
      },
      {
        label: '岳阳县'
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped></style>
