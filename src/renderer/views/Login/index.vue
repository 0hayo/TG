<template>
  <div
    class="bg-[var(--tg-default-bg)] h-full flex justify-center items-center color-[var(--tg-default-color)]"
  >
    <div
      class="login-box w-800px h-450px bg-[var(--tg-login-bg)] flex justify-center items-center gap-150px"
    >
      <div class="w-220px">
        <h2 class="text-24px line-height-32px">嗨！欢迎您使用谛听巡查系统</h2>
        <p class="text-14px line-height-22px mt-32px!">用户名</p>
        <el-input placeholder="用户名"></el-input>
        <p class="text-14px line-height-22px mt-24px!">密码</p>
        <el-input placeholder="密码"></el-input>

        <el-button class="w-full mt-32px!" type="primary" @click="handle">登录</el-button>
      </div>
      <div class="w-192px h-192px login-img"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/store/common/useUser'

const router = useRouter()

const handle = () => {
  useUser().setUser('1')
  router.push('/MonitoringPlan/0')
}
</script>

<style scoped lang="less">
.login-box {
  border-radius: 16px;
  border: 2px solid var(--Colors-Neutral-Border-colorSplit, #fff);
  background: var(--Colors-Neutral-Bg-colorBgLayout, #fbfbfb);
  /* boxShadowSecondary */
  box-shadow:
    0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.login-img {
  background: url('../../assets/img/LOGO.png') no-repeat;
  background-size: 100% 100%;
}
</style>
