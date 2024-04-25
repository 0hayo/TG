<template>
  <div class="w-full">
    <div class="w-200px shrink-0 p-16px">
      <p class="text-12px line-height-20px">社交软件</p>
      <div class="mt-8px flex flex-col gap-8px">
        <p class="media">Telegram</p>
        <!-- <p>Twitter-x</p>
        <p>Facebook</p> -->
      </div>
    </div>
    <div class="w-350px shrink-0 p-16px groups">
      <p class="text-16px line-height-24px">TG群组查询</p>
      <el-input v-model="input" placeholder="请在此输入你需要查询的群链接" class="mt-16px">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
      <p class="text-16px line-height-24px mt-16px">查询结果</p>
      <div
        class="h-58px border-solid border-1px border-[var(--tg-border-color)] rounded-4px mt-16px flex items-center justify-between px-16px"
      >
        <div>
          <p class="text-14px line-height-22px">方子舟读者交流群</p>
          <p class="text-12px text-#A6A6A6 line-height-20px">https://t.me/fangshimin_tg</p>
        </div>
        <el-button :icon="Plus">启用</el-button>
      </div>
    </div>
    <div class="p-16px flex flex-col" style="width: calc(100% - 550px)">
      <div class="flex gap-24px items-center">
        <p class="text-16px line-height-24px">查询结果</p>
        <el-select placeholder="所有单位" style="width: 200px"> </el-select>
        <el-select placeholder="监测中" style="width: 200px"> </el-select>
      </div>
      <div class="w-full grow mt-16px relative">
        <el-table :data="[]" stripe height="100%" style="position: absolute; width: 100%">
          <el-table-column label="序号" width="60" type="index" />
          <el-table-column prop="" min-width="100" label="单位" />
          <el-table-column prop="" min-width="100" label="名称" />
          <el-table-column prop="" min-width="100" label="链接" />
          <el-table-column prop="" min-width="100" label="状态" />
          <el-table-column prop="" min-width="100" label="添加时间" />
          <el-table-column prop="" min-width="100" label="添加人" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">取消监测</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="mt-16px"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
</script>

<style scoped lang="scss">
.media {
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  background: #58acf2;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  color: #fff;
}
.groups {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
}
</style>
