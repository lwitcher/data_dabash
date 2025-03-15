import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('../views/Overview.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue')
  },
  {
    path: '/data-list',
    name: 'DataList',
    component: () => import('../views/DataList.vue')
  }
]

/**
 * @description 路由实例
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
