import { GroupInfo, getAllList } from '@/apis/mediaManagement'
import mitts from '@/utils/mitts'

export const useQueryAllGroup = () => {
  onMounted(() => {
    queryAllList()
    mitts.on('queryAllGroup', () => {
      queryAllList()
    })
  })

  const data = ref<GroupInfo[]>([])

  const queryAllList = async () => {
    try {
      const res = await getAllList({
        page: 1,
        per_page: 999
      })
      if (res.IsSuccess) {
        data.value = res.Data.result || []
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return data
}
