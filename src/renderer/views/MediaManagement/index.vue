<template>
  <div class="w-full h-full flex-row">
    <div class="w-200px p-4 flex-col gap-2 border-r border-r-Neutral-Stroke-Stroke">
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">媒体</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium bg-Primary-Fill-Fill color-neutral-50"
      >
        <i class="ri-telegram-fill"></i>Telegram
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium color-Neutral-Text-Tertiary cursor-not-allowed"
      >
        <i class="ri-twitter-fill"></i>Twitter
      </nav>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium color-Neutral-Text-Tertiary cursor-not-allowed"
      >
        <i class="ri-facebook-box-fill"></i>facebook
      </nav>
    </div>
    <div class="w-90 flex-col gap-2 pt-4 border-r border-r-Neutral-Stroke-Stroke">
      <h6 class="px-4 inline-flex items-center h-12 text-h6-medium">TG群组查询</h6>
      <el-input
        v-model="groupInput"
        class="px-4"
        placeholder="输入需要查询的群链接"
        @keydown.enter="addGroup"
      >
        <template #prefix>
          <i class="ri-link-m"></i>
        </template>
        <template #append><i class="ri-corner-down-left-line" @click="addGroup"></i></template>
      </el-input>
      <h6 class="px-4 inline-flex items-center text-h6-medium">查询结果</h6>
      <div class="px-4 scroll-smooth grid gap-2 content-start">
        <LinkCard
          v-for="(item, i) in newGroupList"
          :key="item"
          :keyword="item"
          type="group"
          @del-keyword="
            () => {
              newGroupList.splice(i, 1)
            }
          "
        />
      </div>
      <h6 class="px-4 inline-flex items-center text-h6-medium">可监测群组</h6>
      <div class="px-4 pb-4 grow scroll-smooth overflow-y-auto grid gap-2 content-start">
        <LinkCard
          v-for="(item, i) in allActiveList"
          :key="i"
          :keyword="item.group_url"
          :group-id="item.group_name"
          type="group"
          @del-keyword="
            () => {
              queryAllActive()
              groupTableData[user.getAccountLevel]?.()
            }
          "
        />
      </div>
    </div>
    <div class="grow p-16px flex flex-col">
      <div class="flex gap-24px items-center">
        <h6 class="inline-flex items-center h-12 text-h6-medium">TG群组监测列表</h6>
        <el-select placeholder="所有单位"> </el-select>
        <el-select placeholder="监测中"> </el-select>
      </div>
      <div class="w-full grow relative">
        <el-table :data="tableData.data" stripe style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="" min-width="100" label="单位" />
          <el-table-column prop="group_id" min-width="100" label="名称" />
          <el-table-column prop="group_url" min-width="100" label="链接" />
          <el-table-column prop="status" min-width="100" label="状态" />
          <el-table-column prop="added_at" min-width="100" label="添加时间" />
          <el-table-column prop="added_by" min-width="100" label="添加人" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button
                v-if="user.getAccountLevel === '3'"
                link
                type="primary"
                size="small"
                @click="setUserMonitoreds(row, false)"
              >
                取消监测
              </el-button>
              <el-button
                v-if="user.getAccountLevel === '3'"
                link
                type="primary"
                size="small"
                @click="addGroups(row)"
              >
                重新申请
              </el-button>
              <el-button
                v-if="user.getAccountLevel !== '3'"
                link
                type="primary"
                size="small"
                @click="updateTgStatus(row)"
              >
                通过
              </el-button>
              <el-button
                v-if="user.getAccountLevel !== '3'"
                link
                type="danger"
                size="small"
                @click="deleteGroups(row)"
              >
                删除
              </el-button>
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
import {
  GroupInfo,
  addTgGroup,
  adminGetAllGroups,
  deleteGroup,
  getAllActive,
  getUserMonitored,
  updateTggroupStatus
} from '@/apis/mediaManagement'
import LinkCard from '@/components/linkCard/index.vue'
import useUser from '@/store/common/useUser'
import { setUserMonitored } from '@/apis/mediaManagement'
import { UserType } from '@/common/types'

const user = useUser()

onMounted(() => {
  groupTableData[user.getAccountLevel]?.()
  queryAllActive()
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

const getAdminGetAllGroups = async () => {
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
}

const groupTableData = {
  [UserType.root]: getAdminGetAllGroups,
  [UserType.admin]: getAdminGetAllGroups,
  [UserType.general]: async () => {
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

const allActiveList = ref<GroupInfo[]>()
const queryAllActive = async () => {
  try {
    const res = await getAllActive()
    if (res.IsSuccess) {
      allActiveList.value = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const setUserMonitoreds = async (row: GroupInfo, b: boolean) => {
  try {
    const res = await setUserMonitored({
      group_url: row.group_url,
      new_status: b
    })
    if (res.IsSuccess) {
      groupTableData[user.getAccountLevel]?.()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const updateTgStatus = async (row: GroupInfo) => {
  try {
    const res = await updateTggroupStatus({
      group_url: row.group_url,
      new_status: '2'
    })
    if (res.IsSuccess) {
      groupTableData[user.getAccountLevel]?.()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteGroups = async (row: GroupInfo) => {
  try {
    const res = await deleteGroup({
      group_url: row.group_url
    })
    if (res.IsSuccess) {
      groupTableData[user.getAccountLevel]?.()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const addGroups = async (row: GroupInfo) => {
  try {
    const res = await addTgGroup({
      group_url: row.group_url,
      group_id: row.group_id,
      group_name: row.group_name
    })
    if (res.IsSuccess) {
      groupTableData[user.getAccountLevel]?.()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
