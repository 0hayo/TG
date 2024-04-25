<template>
  <div>
    <div class="w-200px flex flex-col p-16px">
      <el-button type="primary" :icon="Plus">管理员</el-button>
      <el-button class="mt-12px w-80px ml-0!" type="text" :icon="Plus">新增地区</el-button>
      <el-tree class="mt-8px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div class="flex-1 flex flex-col p-16px">
      <p class="text-16px line-height-24px">管理员用户列表</p>
      <el-button class="w-100px mt-16px ml-0!" type="primary" :icon="Plus">添加用户</el-button>
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
import { Plus } from '@element-plus/icons-vue'

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
