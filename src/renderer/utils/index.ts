// import { queryAllGroup, queryKeywords } from '@/apis'
// import { GroupRes } from '@/apis/types'
// import { SUCCESS_CODE } from '@/constants'
// import useMonitoringData from '@/store/common/monitoringData'

export const getAllGroupKeyword = async () => {
  // const groupList = ref<GroupRes[]>([])
  // const keywordsList = ref<string[]>([])
  // Promise.all([
  //   queryAllGroup({
  //     chatIds: []
  //   }),
  //   queryKeywords({
  //     groupIds: []
  //   })
  // ]).then((res) => {
  //   if (res[0].code === SUCCESS_CODE) {
  //     groupList.value = groupList.value.concat(res[0].data)
  //   }
  //   if (res[1].code === SUCCESS_CODE) {
  //     res[1].data.forEach((v) => {
  //       keywordsList.value = keywordsList.value.concat(v.keywords)
  //     })
  //   }
  //   const monitoringData = useMonitoringData()
  //   monitoringData.setGroupList(groupList.value)
  //   monitoringData.setKeywordsList(Array.from(new Set(keywordsList.value)))
  // })
}

export const handleCopy = (copy_text: string) => {
  const input_dom = document.createElement('input') //创建input元素
  input_dom.value = copy_text.replaceAll('<b style="color: #eb5757">', '').replaceAll('</b>', '') //添加需要复制的内容到value属性
  document.body.appendChild(input_dom) //向页面底部追加输入框
  input_dom.select() //选择input元素
  document.execCommand('Copy') //执行复制命令
  ElMessage.success('复制成功！') //弹出提示信息，不同组件可能存在写法不同

  //复制之后再删除元素，否则无法成功赋值
  input_dom.remove() //删除动态创建的节点
}
