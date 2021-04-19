
import Layout from '/@/layout/index.vue'

const teacherRoutes = [
  {
    path: '/page/pc',
    component: Layout,
    redirect: '/page/pc/evaluate',
    name: 'teacher',
    children: [
      {
        path: 'evaluate',
        component: () => import('/@/views/teacher/evaluate.vue'),
      },
      {
        path: 'information',
        component: () => import('/@/views/teacher/information.vue'),
      },
      {
        path: 'statistics',
        component: () => import('/@/views/teacher/statistics/index.vue'),
      },
      {
        path: 'historyEvaluate',
        component: () => import('/@/views/teacher/historyEvaluate.vue'),
      },
      {
        path: 'historyAnnounce',
        component: () => import('/@/views/teacher/historyAnnounce.vue'),
      }
    ]
  },
  
]
  export default teacherRoutes
  