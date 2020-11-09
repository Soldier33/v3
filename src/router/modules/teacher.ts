
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
    ]
  },
  
]
  export default teacherRoutes
  