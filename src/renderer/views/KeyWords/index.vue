<template>
  <div class="h-full flex">
    <div class="w-90 flex-col pt-4 shrink-0 gap-2 border-r border-r-Neutral-Stroke-Stroke">
      <h6 class="px-4 inline-flex items-center h-12 text-h6-medium">添加关键词</h6>
      <el-input
        v-model="keyword"
        class="px-4"
        placeholder="输入新的关键词"
        @keydown.enter="keydownEnter"
      >
        <template #prefix>
          <i class="ri-rss-line"></i>
        </template>
        <template #append><i class="ri-corner-down-left-line" @click="keydownEnter"></i></template>
      </el-input>
      <h6 class="px-4 inline-flex items-center h-12 text-h6-medium">曾用关键词</h6>
      <div class="px-4 pb-4 grow scroll-smooth overflow-y-auto grid gap-2 content-start">
        <LinkCard
          v-for="(item, i) in keysList.data"
          :key="i"
          :keyword="item.keyword"
          type="keyword"
          @update="
            () => {
              getAllKeyword()
              getAllKeywordTwo()
            }
          "
          @del-keyword="() => editStatus(item.keyword, 9)"
        ></LinkCard>
      </div>
    </div>
    <div class="grow p-16px flex flex-col">
      <h6 class="inline-flex items-center h-12 text-h6-medium">关键词列表</h6>

      <div class="relative w-full grow mt-16px">
        <el-table
          :data="tableData.data"
          stripe
          height="100%"
          style="position: absolute; width: 100%"
        >
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="keyword" label="关键词" />
          <el-table-column prop="is_enabled" label="状态">
            <template #default="{ row }"> {{ row.is_enabled ? '启用' : '停用' }}</template>
          </el-table-column>
          <el-table-column prop="added_at" label="启用时间" />
          <el-table-column prop="added_by" label="启用人" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                size="small"
                @click="editStatus(row.keyword, row.is_enabled ? 1 : 2)"
              >
                {{ row.is_enabled ? '停用' : '启用' }}
              </el-button>
              <!-- <el-button link type="primary" size="small" @click="editStatus(row.keyword, 1)">
                删除
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-model:current-page="tableData.currentPage"
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
// import { Delete, Plus } from '@element-plus/icons-vue'
import LinkCard from '@/components/linkCard/index.vue'
import { addKey, getOrgKey, getStatusKeys, keywordData, updateStatusKey } from '@/apis/KeyWords'

onMounted(() => {
  getAllKeyword()
  getAllKeywordTwo()
})

const keyword = ref('')
// const keywords = ref<string[]>([])

const keydownEnter = async () => {
  try {
    const res = await addKey({
      keyword: keyword.value
    })
    if (res.IsSuccess) {
      keyword.value = ''
      getAllKeyword()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

// const getAllKeyword = async () => {
//   try {
//     const res = await getAllKey()
//     if (res.IsSuccess) {
//       tableData.data = res.Data
//     } else {
//       ElMessage.warning(res.Message)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

const tableData = reactive({
  pageSize: 10,
  currentPage: 1,
  data: [] as keywordData[]
})
const getAllKeyword = async () => {
  try {
    const res = await getOrgKey({
      page: tableData.currentPage,
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
}

const keysList = reactive({
  pageSize: 10,
  currentPage: 1,
  data: [] as keywordData[]
})
const getAllKeywordTwo = async () => {
  try {
    const res = await getStatusKeys({
      status: 1,
      page: keysList.currentPage,
      per_page: keysList.pageSize
    })
    if (res.IsSuccess) {
      keysList.data = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const editStatus = async (keyword: string, status: 1 | 2 | 9) => {
  try {
    const res = await updateStatusKey({
      keyword: keyword,
      status
    })
    if (res.IsSuccess) {
      getAllKeyword()
      getAllKeywordTwo()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
