<template>
  <el-dialog
    v-model="visible"
    class="border border-Layout-white"
    :title="`${type === 'add' ? '创建' : '修改'}用户`"
    width="500"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form class="flex flex-col items-center" :model="userInfo">
      <el-form-item>
        <div>
          <p>账号</p>
          <el-input
            v-model="userInfo.username"
            placeholder="请输入账号"
            style="width: 200px"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <p>姓名</p>
          <el-input
            v-model="userInfo.username"
            placeholder="请输入姓名"
            style="width: 200px"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <p>密码</p>
          <el-input
            v-model="userInfo.password"
            type="password"
            placeholder="请输入密码"
            style="width: 200px"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <p>确认密码</p>
          <el-input
            v-model="userInfo.password"
            type="password"
            placeholder="请输入确认密码"
            style="width: 200px"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <p>生效时间</p>
          <el-date-picker
            type="date"
            placeholder="请选择生效时间"
            style="width: 200px"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <XButton v-if="type === 'add'" class="w-25" type="Primary" @click="confirm">
        新增用户
      </XButton>
      <XButton v-else class="w-25" type="Primary" @click="confirmEdit"> 保存用户 </XButton>
      <XButton class="w-25" type="Warning" @click="visible = false">取消</XButton>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import XButton from '@/components/XButton/index.vue'
import { UserInfo, createUser, updateUser } from '@/apis/user'
import lodash from 'lodash'

const props = defineProps<{
  queryAllUsers: () => void
}>()

const visible = ref(false)
const type = ref<'add' | 'edit'>('add')

const userInfo = reactive<UserInfo>({
  username: 'j2024334',
  password: 'aaa123123',
  organization: '中国联通五一路营业部',
  account_type: '普通用户',
  account_level: '',
  city_category: '',
  created_at: '',
  expiration_date: '',
  font_size: '',
  is_delete: false,
  is_login_blocked: false,
  last_login_at: '',
  name: '',
  organization_type: '',
  theme: '',
  theme_mode: ''
})

const confirm = async () => {
  try {
    const res = await createUser(userInfo)
    if (res.IsSuccess) {
      props.queryAllUsers()
      ElMessage.success(res.Message)
      visible.value = false
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const confirmEdit = async () => {
  try {
    const res = await updateUser(userInfo)
    if (res.IsSuccess) {
      props.queryAllUsers()
      ElMessage.success(res.Message)
      visible.value = false
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

defineExpose({
  show: (row?: UserInfo) => {
    if (row) {
      type.value = 'edit'
      lodash.keys(userInfo).forEach((k) => {
        lodash.set(userInfo, k, row[k])
      })
    } else {
      type.value = 'add'
    }
    visible.value = true
  }
})
</script>

<style scoped></style>
