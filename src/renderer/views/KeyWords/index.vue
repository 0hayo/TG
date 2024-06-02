<template>
  <div class="h-full flex">
    <div class="w-90 flex-col shrink-0 gap-2 p-16px border-r border-b-Neutral-Stroke-Stroke">
      <h6 class="inline-flex items-center h-12 text-h6-medium">添加关键词</h6>
      <el-input v-model="keyword" placeholder="输入新的关键词" @keydown.enter="keydownEnter">
        <template #prefix>
          <i class="ri-rss-line"></i>
        </template>
        <template #append><i class="ri-corner-down-left-line" @click="keydownEnter"></i></template>
      </el-input>
      <h6 class="inline-flex items-center text-h6-medium mt-16px">可用关键词</h6>
      <div class="scroll-smooth overflow-y-auto">
        <!-- <div
          class="h-58px border-solid border-1px border-[var(--tg-border-color)] rounded-4px mt-16px flex items-center justify-between px-16px"
        >
          <p>方子舟读者交流群</p>
          <div>
            <el-button link :icon="Delete">删除</el-button>
            <el-button :icon="Plus">启用</el-button>
          </div>
        </div> -->
        <LinkCard v-for="(item, i) in keywords" :key="i" :keyword="item" type="keyword"></LinkCard>
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
                @click="editStatus(row, row.is_enabled ? 1 : 2)"
              >
                {{ row.is_enabled ? '停用' : '启用' }}
              </el-button>
              <el-button link type="primary" size="small" @click="editStatus(row, 9)">
                删除
              </el-button>
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
import { addKey, getAllKey, keywordData, updateStatusKey } from '@/apis/KeyWords'

onMounted(() => {
  getAllKeyword()
})

const keyword = ref('')
const keywords = ref<string[]>([])

const tableData = reactive({
  pageSize: 1,
  currentPage: 10,
  data: [] as keywordData[]
})

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

const getAllKeyword = async () => {
  try {
    const res = await getAllKey()
    if (res.IsSuccess) {
      tableData.data = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const editStatus = async (row: keywordData, status: 1 | 2 | 9) => {
  try {
    const res = await updateStatusKey({
      keyword: row.keyword,
      status
    })
    if (res.IsSuccess) {
      getAllKeyword()
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
