import { GroupInfo, getAllList } from '@/apis/mediaManagement'
import useMonitoringData from '@/store/common/monitoringData'
import mitts from '@/utils/mitts'

export const useQueryAllGroup = (cb: () => void) => {
  const monitoringData = useMonitoringData()

  onBeforeMount(() => {
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
        monitoringData.setGroupList(res.Data.result)
        cb()
      } else {
        ElMessage.warning(res.Message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return data
}
