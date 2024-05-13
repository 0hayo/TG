import '@/common/styles/index.less'
import '@/assets/icon/iconfont/iconfont.css'
import 'remixicon/fonts/remixicon.css'
import 'element-plus/dist/index.css'
import 'uno.css'
import router from '@/router'
import pinia from '@/store'
import mitts from '@/utils/mitts'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import useUser from './store/common/useUser'
import useThemeColors from './store/common/useThemeColors'
import screenShort from 'vue-web-screen-shot'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(screenShort, { enableWebRtc: false })
app.mount('#app')

const userInfo = useUser().userInfo
useThemeColors().setDefaultTheme()

// 全局注入mitts
app.config.globalProperties.$mitts = mitts

router.beforeEach((to, _, next) => {
  if (userInfo.id || to.name === 'Login') {
    next()
  } else {
    next('/login')
  }
})
