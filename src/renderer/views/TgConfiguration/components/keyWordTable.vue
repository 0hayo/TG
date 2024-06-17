<template>
  <div class="flex flex-col h-full gap-10px overflow-hidden">
    <div class="flex justify-between head">
      <div class="flex items-center gap-2">
        <span>关键词</span>
      </div>
      <div class="w-120px flex items-center justify-center gap-2">
        <span>操作</span>
      </div>
    </div>
    <div class="grow overflow-hidden">
      <el-table ref="tableRef" v-loading="tableLoading" :data="tableData" height="100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="全部" min-width="180">
          <template #default="scope">
            <div class="flex flex-wrap gap-8px">
              <el-tag v-for="v in scope.row.keywords" :key="v" type="info" class="px-4px!">
                {{ v }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" header-align="center" align="center">
          <template #default="scope">
            <el-button link type="danger" size="small" @click="delKeyword(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteKeywords, queryKeywords } from '@/apis'
import { KeywordsRes } from '@/apis/types'
// import { SUCCESS_CODE } from '@/constants'
// import { getAllGroupKeyword } from '@/utils'
import { ElTable } from 'element-plus'
const props = defineProps<{
  chatId: number
  selectGroup: string[]
}>()

const tableData = ref<KeywordsRes[]>([])

watch(
  () => [props.chatId, props.selectGroup],
  async () => {
    if (!props.chatId) {
      tableData.value = []
      return
    }
    await getKeywords()
  }
)

const tableLoading = ref(false)
const getKeywords = async () => {
  if (props.selectGroup.length === 0) {
    tableData.value = []
    return
  }
  tableLoading.value = true
  const res = await queryKeywords({
    groupIds: props.selectGroup
  })
  // if (res.code === SUCCESS_CODE) {
  //   tableData.value = res.data
  //   tableLoading.value = false
  // }
}

const delKeyword = async (row: KeywordsRes) => {
  ElMessageBox.confirm('删除所选关键词?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await deleteKeywords([
      {
        groupId: row.groupId,
        keywords: row.keywords
      }
    ])
    // if (res.code === SUCCESS_CODE) {
    //   getKeywords()
    //   ElMessage.success('删除成功')
    // } else {
    //   ElMessage.warning(res.message)
    // }
  })
}

const tableRef = ref<InstanceType<typeof ElTable>>()
const delKeywords = async () => {
  const selectionRows = tableRef.value?.getSelectionRows() as KeywordsRes[]
  if (selectionRows.length <= 0) {
    ElMessage.warning('请选择需要删除的关键词')
    return
  }
  ElMessageBox.confirm('删除所选关键词?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const params = selectionRows.map((v) => {
      return {
        groupId: v.groupId,
        keywords: v.keywords
      }
    })
    const res = await deleteKeywords(params)
    // if (res.code === SUCCESS_CODE) {
    //   getKeywords()
    //   ElMessage.success('删除成功')
    // } else {
    //   ElMessage.warning(res.message)
    // }
  })
}

defineExpose({
  getKeywords,
  delKeywords
})
</script>

<style scoped lang="less">
.head {
  height: 32px;
  line-height: 32px;
  // background: @button-fill;
  font-size: 3;
  color: @Secondary-text;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid @button-stroke;
}
</style>
