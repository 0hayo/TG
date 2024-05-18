<template>
  <div class="flex justify-center items-center p-20">
    <div
      class="w-200 h-112.5 bg-Layout-Card border-rd-4 border-2 border-Layout-white flex-col justify-center shadow-2xl"
    >
      <div class="self-end flex p-3">
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
      <div class="flex flex-1">
        <div class="w-63 p-4 ml-20 grid gap-8">
          <h2 class="text-h4-medium">嗨！欢迎您使用谛听巡查系统</h2>
          <div>
            <p class="text-base-regular">用户名</p>
            <el-input placeholder="用户名"></el-input>
            <p class="text-base-regular">密码</p>
            <el-input placeholder="密码"></el-input>
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

const router = useRouter()

const handle = async () => {
  try {
    const res = await login({
      username: 'j2024',
      password: 'aaa123123'
    })
    if (res.IsSuccess) {
      ElMessage.success(res.Message)
      useUser().setUser(res.Data.access_token)
      router.push('/MonitoringPlan/0')
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
