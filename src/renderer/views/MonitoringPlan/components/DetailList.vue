<template>
  <section class="overflow-hidden">
    <div class="head">
      <div class="left"></div>
      <div class="title">看板{{ count }}</div>
      <div class="right">
        <el-button class="font_family icon-filter" @click="showDrawer = true">过滤</el-button>
      </div>
    </div>
    <div class="list">
      <!-- <transition-group name="el-zoom-in-center"> -->
      <div v-for="item in monitoringData" :key="item.id" class="descriptions">
        <div class="descriptions__cell_group">
          <div class="descriptions__cell">
            <div class="descriptions_label">命中词</div>
            <div class="descriptions_content">{{ item.keyWords.join('，') }}</div>
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
        <div class="descriptions__cell">
          <div class="descriptions_label">群名</div>
          <div class="descriptions_content">{{ item.groupName }}</div>
        </div>
        <div class="descriptions__cell">
          <div class="descriptions_label">发言人</div>
          <div class="descriptions_content">{{ item.userName }}</div>
        </div>
        <hr />
        <div class="descriptions__cell column">
          <div class="descriptions_label">言论</div>
          <div class="descriptions_content box" v-html="item.message"></div>
        </div>
        <div class="button">
          <el-button
            class="font_family icon-Frame"
            @click="
              handleCopy(
                `用户：${item.userName}；用户ID：${item.userId}；时间：${item.createTime}；群名：${item.groupName}；言论：${item.message}；`
              )
            "
            >复制举证
          </el-button>
        </div>
      </div>
      <!-- </transition-group> -->
    </div>
  </section>
  <el-drawer ref="drawerRef" v-model="showDrawer" title="看板过滤" :with-header="false" size="300">
    <!-- <div class="filterTitle">群过滤</div>
    <el-checkbox-group v-model="selectGroupList" class="listbox">
      <el-checkbox v-for="item in groupList" :key="item.groupId" :label="item.groupName" border>
        {{ item.groupNickname }}
      </el-checkbox>
    </el-checkbox-group> -->
    <div class="filterTitle">关键词过滤</div>
    <el-checkbox-group v-model="selectKeywordsList" class="listbox">
      <el-checkbox v-for="v in keywordsList" :key="v" :label="v" border />
    </el-checkbox-group>
    <div class="footer">
      <el-button class="font_family icon-filter" @click="emits('save', selectKeywordsList, count)"
        >保存</el-button
      >
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import useMonitoringData from '@/store/common/monitoringData'
// import { updatePlan } from '@/apis'
import { handleCopy } from '@/utils'
// import { SUCCESS_CODE } from '@/constants'
import usePlanStore from '@/store/common/usePlan'

const usePlan = usePlanStore()

const props = defineProps<{
  count: number
}>()

const emits = defineEmits<{
  save: [string[], number]
}>()

onMounted(() => {
  const v = usePlan.$state
  if (
    v.filters &&
    v.filters[props.count - 1] &&
    v.filters[props.count - 1].keyWordsList &&
    v.filters[props.count - 1].keyWordsList.length > 0
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // selectGroupList.value = v.filters![props.count - 1].groupList.map((v) => v.id) || []
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectKeywordsList.value = v.filters![props.count - 1].keyWordsList.map((v) => v.id) || []
  }
})

// const selectGroupList = ref<number[]>([])
const selectKeywordsList = ref<string[]>([])

const monitoringData = computed(() => {
  return useMonitoringData().$state.monitoringData.filter(
    (v) =>
      // selectGroupList.value.includes(v.groupId)
      v.keyWords.filter((item) => selectKeywordsList.value.indexOf(item) > -1).length > 0
  )
})
// const groupList = computed(() => useMonitoringData().$state.groupList || [])
const keywordsList = computed(() => useMonitoringData().$state.keywordsList || [])

// const activeName = ref('group')

const showDrawer = ref(false)

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const close = () => {
  showDrawer.value = false
}

defineExpose({
  close
})
</script>

<style scoped lang="less">
section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 24px 0;
  justify-content: flex-start;

  &:hover {
    background-color: @bg-card;

    .head {
      background-color: @bg-card;
      display: flex;
      justify-content: space-between;

      .left,
      .right {
        width: 88px;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .head {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;

    .left,
    .right {
      width: 88px;
      display: none;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 0 24px;
    gap: 12px;
    .descriptions {
      position: relative;

      &:hover {
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.2);
        .button {
          display: flex;
        }
      }
      .button {
        position: absolute;
        display: none;
        flex-direction: column;
        width: 92px;
        right: 16px;
        top: 48px;
      }
      font-size: 3;
      line-height: 100%;
      background-color: @bg-color-2;
      padding: 16px;
      border-radius: 8px;
      border: 0.5px solid @border-hr;
      display: flex;
      gap: 10px;
      flex-direction: column;
      .descriptions__cell_group {
        display: flex;
        justify-content: space-between;
      }
      hr {
        border: 0.5px solid @border-hr;
      }
      .descriptions__cell {
        display: flex;
        gap: 16px;

        &.column {
          flex-direction: column;
        }
      }
      .descriptions_label {
        color: @Secondary-text;
      }
      .descriptions_content {
        flex: 1;
        color: @primary-text;
        &.box {
          padding: 8px;
          background-color: @bg-color-1;
          border-radius: 4px;
          box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
          .tag {
            font-weight: normal;
            color: @Danger;
          }
        }
      }
    }
  }
}
.listbox {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100%;
  overflow: auto;
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 52px;
  &::before {
    content: '';
    position: absolute;
    bottom: 52px;
    left: -24px;
    width: 300px;
    height: 1px;
    border-bottom: 1px solid @border-hr;
  }
}
:deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
}
.filterTitle {
  padding: 5px 10px;
  background-color: #303236;
  border-radius: 4px;
  border: 1px solid #3c3f44 !important;
  color: @primary;
  text-align: center;
}
</style>
