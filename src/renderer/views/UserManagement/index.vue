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
        <p class="font-size-12px color-Neutral-Text-Tertiary">用户单位</p>
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
        <el-table :data="tableData" stripe height="100%" style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="account_level" label="角色" />
          <el-table-column prop="username" label="登录账号" />
          <el-table-column prop="city_category" label="所属单位" />
          <el-table-column prop="expiration_date" label="生效时间" />
          <el-table-column prop="is_login_blocked" label="禁止登录">
            <template #default="{ row }"> {{ row.is_login_blocked ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">编辑</el-button>
              <el-button link type="danger" size="small">删除</el-button>
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
import XButton from '@/components/XButton/index.vue'
import { UserInfo, getAllUsers } from '@/apis/user'

onMounted(() => {
  queryAllUsers()
})

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

const tableData = ref<UserInfo[]>()
const queryAllUsers = async () => {
  try {
    const res = await getAllUsers()
    if (res.IsSuccess) {
      tableData.value = res.Data
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
