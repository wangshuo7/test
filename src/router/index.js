import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加前置路由守卫拦截登录
const isLogin = () => {
  return !!localStorage.getItem('token') // 如果token不存在或者token=''|undefined|false ---> false
}
// 如果用户登录了，再去访问登录页面的时候，需要回到首页
router.beforeEach((to) => {
  if (to.name === 'login') {
    if (isLogin()) {
      ElMessage('登录状态有效，不需要重复登录了')
      return { name: 'home' }
    }
  } else if (to.name === 'home') {
    if (!isLogin()) {
      // 如果用户登录了，清空了token，需要回到登录页面
      ElMessage('登录过期！')
      return { name: 'login' }
    }
  }
})

export default router
