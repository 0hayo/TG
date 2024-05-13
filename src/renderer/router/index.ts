// 导入依赖
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'

// 配置routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404',
      auth: false
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: 'Login',
      auth: false
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      title: 'Layout',
      auth: false
    },
    redirect: '/MonitoringPlan/0',
    children: [
      {
        path: '/MonitoringPlan/:planCount',
        name: 'MonitoringPlan',
        component: () => import('@/views/MonitoringPlan/index.vue'),
        meta: {
          title: '工作台',
          auth: false
        }
      },
      {
        path: '/TgConfiguration',
        name: 'TgConfiguration',
        component: () => import('@/views/TgConfiguration/index.vue'),
        meta: {
          title: 'TgConfiguration',
          auth: false
        }
      },
      {
        path: '/DataCenter',
        name: 'DataCenter',
        component: () => import('@/views/DataCenter/index.vue'),
        meta: {
          title: 'DataCenter',
          auth: false
        }
      },
      {
        path: '/KeyWords',
        name: 'KeyWords',
        component: () => import('@/views/KeyWords/index.vue'),
        meta: {
          title: '关键词管理',
          auth: false
        }
      },
      {
        path: '/Setting',
        name: 'Setting',
        component: () => import('@/views/Setting/index.vue'),
        meta: {
          title: '设置',
          auth: false
        }
      },
      {
        path: '/MediaManagement',
        name: 'MediaManagement',
        component: () => import('@/views/MediaManagement/index.vue'),
        meta: {
          title: '媒体管理',
          auth: false
        }
      },
      {
        path: '/UserManagement',
        name: 'UserManagement',
        component: () => import('@/views/UserManagement/index.vue'),
        meta: {
          title: '用户管理',
          auth: false
        }
      },
      {
        path: '/PlanManagement',
        name: 'PlanManagement',
        component: () => import('@/views/PlanManagement/index.vue'),
        meta: {
          title: '方案管理',
          auth: false
        }
      }
    ]
  }
]

// 配置router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 导出路由
export default router
