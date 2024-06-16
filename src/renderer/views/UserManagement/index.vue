<template>
  <div class="w-full h-full flex-row">
    <div class="w-200px p-4 flex-col gap-2 border-r border-b-Neutral-Stroke-Stroke">
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">管理员</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
        :class="{ adminActive: userType === 'admin' }"
        @click="handleAdmin"
      >
        <i class="ri-user-line"></i>管理员
      </nav>
      <div class="self-start">
        <p class="font-size-12px color-Neutral-Text-Tertiary">用户单位</p>
      </div>
      <nav
        class="flex self-stretch items-center h-8 gap-1 border-rd-1 px-2 text-base-medium hover:bg-Neutral-Fill-FillHover hover:color-Neutral-Text-PrimaryDebit"
        @click="addAreaRef?.show(selectSites)"
      >
        <i class="ri-add-line"></i>新增地区
      </nav>
      <el-tree
        class="mt-8px"
        :data="data"
        :props="defaultProps"
        highlight-current
        @node-click="handleNodeClick"
      />
    </div>
    <div class="flex-1 flex flex-col p-16px">
      <div class="flex items-center gap-2">
        <h6 class="inline-flex items-center h-12 text-h6-medium">管理员用户列表</h6>
        <XButton type="Primary" icon-name="add-line" @click="addUserRef?.show()">新增用户</XButton>
      </div>
      <div class="relative w-full grow">
        <el-table :data="tableData" stripe height="100%" style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="account_level" label="角色" />
          <el-table-column prop="username" label="登录账号" />
          <el-table-column prop="organization" label="所属单位" />
          <el-table-column prop="expiration_date" label="生效时间" />
          <el-table-column prop="is_login_blocked" label="禁止登录">
            <template #default="{ row }"> {{ row.is_login_blocked ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="addUserRef?.show(row)">
                编辑
              </el-button>
              <el-button link type="danger" size="small" @click="delUser(row.username)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="mt-16px justify-end"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      /> -->
    </div>
  </div>

  <AddUser
    ref="addUserRef"
    :user-type="userType"
    :query-all-users="queryAllUsers"
    :select-sites="selectSites"
    :city-category="cityCategory"
  />

  <AddArea ref="addAreaRef" @update="querySitesOrganizations" />
</template>

<script setup lang="ts">
import XButton from '@/components/XButton/index.vue'
import {
  SitesOrganization,
  UserInfo,
  deleteUser,
  getAllUsers,
  getSitesOrganizations
} from '@/apis/user'
import AddUser from './components/AddUser.vue'
import AddArea from './components/AddArea.vue'

onMounted(() => {
  queryAllUsers()
  querySitesOrganizations()
})

// const currentPage = ref(1)
// const pageSize = ref(9999)

const tableData = ref<UserInfo[]>()
const queryAllUsers = async () => {
  try {
    const res = await getAllUsers()
    if (res.IsSuccess) {
      tableData.value = res.Data
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const addUserRef = ref<InstanceType<typeof AddUser>>()

const data = ref<SitesOrganization[]>()

const defaultProps = {
  children: 'organizations',
  label: 'name'
}
const querySitesOrganizations = async () => {
  try {
    const res = await getSitesOrganizations()
    if (res.IsSuccess) {
      data.value = res.Data.regions
      data.value.forEach((item) => {
        item.organizations.forEach((v) => {
          v.id = v.org_id
          v.name = v.org_name
        })
      })
      console.log(data.value)
    }
  } catch (error) {
    console.log(error)
  }
}

const selectSites = ref<SitesOrganization>()
const cityCategory = ref('')
const handleNodeClick = (row: SitesOrganization) => {
  selectSites.value = row
  if (!selectSites.value.organizations) {
    data.value?.forEach((v) => {
      v.organizations.forEach((j) => {
        if (selectSites.value?.id === j.id) {
          cityCategory.value = v.name
        }
      })
    })
  }
  userType.value = 'user'
}

const addAreaRef = ref<InstanceType<typeof AddArea>>()

const userType = ref<'user' | 'admin'>('admin')
const handleAdmin = () => {
  userType.value = 'admin'
  selectSites.value = undefined
}

const delUser = async (username: string) => {
  await ElMessageBox.confirm('删除此用户?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  try {
    const res = await deleteUser({
      username
    })
    if (res.IsSuccess) {
      queryAllUsers()
      ElMessage.success(res.Message)
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.adminActive {
  background: red;
  color: white;
}
</style>
