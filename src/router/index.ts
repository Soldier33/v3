import { createRouter, createWebHashHistory } from 'vue-router'
import teacherRoutes from './modules/teacher.ts'
import presidentRoutes from './modules/president.ts'
import Layout from '/@/layout/index.vue'
import store from '/@/store'
import { Notify } from 'vant'



const constantRoutes = [
  {
    path: '/',
    component: () => import('/@/views/login.vue')
  },
  {
    path: '/personal',
    component: Layout,
    name: 'personal',
    children: [
      {
        path: 'index',
        component: () => import('/@/views/personal.vue'),
      },
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...teacherRoutes, ...presidentRoutes]
})

router.beforeEach((to, from, next) => {
  // 获取角色
  if (store.state.role) {
    next()
  } else {
    if (!sessionStorage.getItem("role") && to.fullPath !== '/') {
      Notify({ type: 'danger', message: '登陆超时，请重新登陆' })
    } else {
      const user = {
        username: sessionStorage.getItem("username"),
        school: sessionStorage.getItem("school"),
        role: sessionStorage.getItem("role"),
        schoolId: sessionStorage.getItem("schoolId"),
      }
      store.commit('setMsg', user)
      // 获取周次
      const currentWeek = sessionStorage.getItem("currentWeek")
      if (currentWeek) {
        store.commit('setCurrentWeek', currentWeek)
      }
      next()
    }
  }
})

export default router