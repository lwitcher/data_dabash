import { createRouter, createWebHashHistory } from 'vue-router'
// 直接导入组件，不使用懒加载
import Overview from '../views/Overview.vue'
import Analysis from '../views/Analysis.vue'
import DataList from '../views/DataList.vue'

/**
 * @description 路由配置
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview // 使用直接导入的组件
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis // 使用直接导入的组件
  },
  {
    path: '/data-list',
    name: 'DataList',
    component: DataList // 使用直接导入的组件
  },
  // 添加临时重定向路由
  {
    path: '/temp-redirect',
    name: 'TempRedirect',
    component: { render: () => null }
  }
]

/**
 * @description 路由实例
 */
const router = createRouter({
  history: createWebHashHistory(), // 确保使用 hash 模式
  routes
})

// 添加全局导航守卫来处理 Electron 环境中的路由问题
router.beforeEach((to, from, next) => {
  // 强制刷新路由状态
  if (from.name === to.name && from.path === to.path) {
    router.replace({ path: '/temp-redirect' })
    setTimeout(() => {
      router.replace(to)
    }, 10)
    return
  }
  next()
})

export default router
