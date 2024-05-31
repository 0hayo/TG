<template>
  <div class="w-full h-full flex-row">
    <div class="w-200px p-4 flex-col gap-2 border-r border-b-Neutral-Stroke-Stroke">
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">媒体</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-telegram-fill"></i>Telegram
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-twitter-fill"></i>Twitter
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
      >
        <i class="ri-facebook-box-fill"></i>facebook
      </nav>
    </div>
    <div class="w-90 flex-col shrink-0 gap-2 p-16px border-r border-b-Neutral-Stroke-Stroke">
      <h6 class="inline-flex items-center h-12 text-h6-medium">TG群组查询</h6>
      <el-input v-model="groupInput" placeholder="输入需要查询的群链接" @keydown.enter="addGroup">
        <template #prefix>
          <i class="ri-link-m"></i>
        </template>
        <template #append><i class="ri-corner-down-left-line" @click="addGroup"></i></template>
      </el-input>
      <h6 class="inline-flex items-center text-h6-medium">查询结果</h6>
      <div class="scroll-smooth overflow-y-auto grid gap-3">
        <LinkCard
          v-for="(item, i) in newGroupList"
          :key="i"
          :keyword="item"
          type="group"
          @del-keyword="
            () => {
              newGroupList.splice(i, 1)
            }
          "
        ></LinkCard>
      </div>
    </div>
    <div class="grow p-16px flex flex-col">
      <div class="flex gap-24px items-center">
        <h6 class="inline-flex items-center h-12 text-h6-medium">TG群组监测列表</h6>
        <el-select placeholder="所有单位"> </el-select>
        <el-select placeholder="监测中"> </el-select>
      </div>
      <div class="w-full grow relative">
        <el-table
          :data="tableData.data"
          stripe
          height="100%"
          style="position: absolute; width: 100%"
        >
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="" min-width="100" label="单位" />
          <el-table-column prop="group_name" min-width="100" label="名称" />
          <el-table-column prop="group_link" min-width="100" label="链接" />
          <el-table-column prop="status" min-width="100" label="状态" />
          <el-table-column prop="added_at" min-width="100" label="添加时间" />
          <el-table-column prop="added_by" min-width="100" label="添加人" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">取消监测</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-model:current-page="tableData.pageNum"
        v-model:page-size="tableData.pageSize"
        class="mt-16px justify-end"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GroupInfo, adminGetAllGroups, getUserMonitored } from '@/apis/mediaManagement'
import LinkCard from '@/components/linkCard/index.vue'
import useUser from '@/store/common/useUser'

const user = useUser()

onMounted(() => {
  console.log(groupTableData[user.getAccountLevel]())
})

const tableData = reactive({
  pageNum: 1,
  pageSize: 10,
  data: [] as GroupInfo[]
})

const groupInput = ref('')
const newGroupList = ref<string[]>([])

const addGroup = () => {
  if (newGroupList.value?.includes(groupInput.value)) {
    ElMessage.warning(`${groupInput.value} 已添加！`)
    return
  }
  newGroupList.value?.unshift(groupInput.value)
  groupInput.value = ''
}

const groupTableData = {
  管理员: async () => {
    try {
      const res = await adminGetAllGroups({
        page: tableData.pageNum,
        per_page: tableData.pageSize
      })
      if (res.IsSuccess) {
        tableData.data = res.Data
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  },
  普通用户: async () => {
    try {
      const res = await getUserMonitored()
      if (res.IsSuccess) {
        tableData.data = res.Data
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
