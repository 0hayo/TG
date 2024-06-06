<template>
  <el-dialog
    v-model="visible"
    class="border border-Layout-White"
    title="新增地区/单位"
    width="500"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="p-24px">
      <el-input v-model="inputValue" placeholder="请输入地区/单位"></el-input>
    </div>
    <template #footer>
      <XButton class="w-25" type="Primary" @click="confirmEdit"> 确定 </XButton>
      <XButton class="w-25" type="Warning" @click="visible = false">取消</XButton>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addOrg, addSite } from '@/apis/user'
import { ref } from 'vue'
import { SitesOrganization } from '@/apis/user'
import XButton from '@/components/XButton/index.vue'

const emits = defineEmits<{
  update: []
}>()

const visible = ref(false)
const inputValue = ref('')

const confirmEdit = async () => {
  if (sites.value?.organizations) {
    try {
      const res = await addOrg({
        site_name: sites.value.name,
        org_name: inputValue.value
      })
      if (res.IsSuccess) {
        visible.value = false
        emits('update')
        ElMessage.success(res.Message)
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const res = await addSite({
        site_name: inputValue.value
      })
      if (res.IsSuccess) {
        visible.value = false
        emits('update')
        ElMessage.success(res.Message)
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const sites = ref<SitesOrganization>()
defineExpose({
  show: (selectSites?: SitesOrganization) => {
    sites.value = selectSites
    visible.value = true
  }
})
</script>

<style scoped></style>
