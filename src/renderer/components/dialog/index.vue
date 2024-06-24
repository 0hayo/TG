<template>
  <slot></slot>
  <Teleport to="body">
    <el-dialog
      v-for="(item, index) in dialogList"
      :key="index"
      v-model="item.visible"
      class="border border-Layout-White"
      :title="item.title"
      :width="item.width"
      destroy-on-close
      :close-on-click-modal="false"
      @close="() => closeDialog(item, index, false)"
    >
      <template #header="{ close, titleId }">
        <div class="flex justify-between items-center h-full">
          <h6 :id="titleId" class="text-h6-medium inline-flex gap-2">
            <i class="ri-gps-line"></i>{{ item.title }}
          </h6>
          <iconBtn icon-name="close-line" @click="close"> </iconBtn>
        </div>
      </template>
      <component
        :is="item.component"
        v-bind="item.props"
        @close="(args) => closeDialog(item, index, false, args)"
      >
        <slot></slot>
      </component>
      <template v-if="item.showfooter" #footer>
        <span class="flex justify-end gap-4">
          <!-- <el-button @click="item.callBack?.('cancel')">
            {{ item.cancelName || '取消' }}
          </el-button>
          <el-button type="primary" @click="item.callBack?.('confirm')">
            {{ item.confirmName || '确认' }}
          </el-button> -->
          <XButton class="w-25" type="Primary" @click="item.callBack?.('confirm')">
            新增方案
          </XButton>
          <XButton class="w-25" type="Warning" @click="closeDialog(item, index, false)"
            >取消</XButton
          >
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { dialogList, closeDialog, addDialog, ADD_DIALOG } from './index'
import iconBtn from '@/components/iconbtn/index.vue'
import XButton from '@/components/XButton/index.vue'

provide(ADD_DIALOG, addDialog)
</script>
