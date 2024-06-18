<template>
  <div class="h-100vh w-full flex justify-center items-center">
    <div
      class="w-full h-full bg-Layout-Card border-rd-4 border-2 border-Layout-White flex-col justify-center shadow-2xl"
    >
      <div v-if="isElectron" class="self-end flex p-3">
        <iconBtn
          icon-name="subtract-line"
          type="WindowsControls"
          size="lg"
          @click="setWindowSize('min')"
        ></iconBtn>
        <iconBtn
          icon-name="aspect-ratio-line"
          type="WindowsControls"
          size="lg"
          @click="setWindowSize('max')"
        ></iconBtn>
        <iconBtn
          icon-name="close-line"
          type="WindowsControls"
          size="lg"
          @click="setWindowSize('close')"
        ></iconBtn>
      </div>
      <div class="w-full flex items-center flex-1 gap-x-80px">
        <div class="w-63 p-4 ml-20 grid h-400px">
          <h2 class="text-h4-medium">嗨！欢迎您使用谛听巡查系统</h2>
          <div>
            <p class="text-base-regular">用户名</p>
            <el-input v-model="params.username" placeholder="用户名"></el-input>
            <p class="text-base-regular mt-24px">密码</p>
            <el-input v-model="params.password" type="password" placeholder="密码"></el-input>
            <!-- <p v-if="isElectron" class="text-base-regular">代理地址</p>
            <el-input v-if="isElectron" v-model="params.proxyUrl" placeholder="代理地址"></el-input> -->
          </div>

          <XButton class="w-full" type="Primary" @click="handle">登 录</XButton>
        </div>
        <div class="w-192px h-192px login-img"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/store/common/useUser'
import iconBtn from '@/components/iconbtn/index.vue'
import XButton from '@/components/XButton/index.vue'
import { login } from '@/apis/login'
import { UserType } from '@/common/types'
import usePlanStore from '@/store/common/usePlan'

const router = useRouter()
const planStore = usePlanStore()

const isElectron = ref(false)
onBeforeMount(() => {
  isElectron.value = !!window.electronApi
})

const params = reactive({
  username: 'a123',
  password: '123'
  // proxyUrl: planStore.proxyUrl
})

const handle = async () => {
  try {
    const res = await login(params)
    if (res.IsSuccess) {
      ElMessage.success(res.Message)
      useUser().setToken(res.Data.access_token)
      useUser().setUserInfo(res.Data.user_info)
      // planStore.setProxyUrl(params.proxyUrl)
      // isElectron && window.electron.ipcRenderer.send('setProxy', params.proxyUrl)
      if (res.Data.user_info.account_level === UserType.general) {
        const id = planStore.getPlanInfo?.plan_id || 0
        router.push(`/MonitoringPlan/${id}`)
      } else {
        router.push('/MediaManagement')
      }
      isElectron && setWindowSize('max')
    } else {
      ElMessage.warning(res.Message)
    }
  } catch (error) {
    console.log(error)
  }
}

const setWindowSize = (type: string) => {
  window.electronApi.setWindowSize(type)
}
</script>

<style scoped lang="less">
.login-img {
  background: url('../../assets/img/LOGO.png') no-repeat;
  background-size: 100% 100%;
}
</style>
