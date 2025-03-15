import { createRouter, createWebHistory } from 'vue-router'

/**
 * @description 路由配置
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
