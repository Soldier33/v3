
import Layout from '/@/layout/index.vue'

const presidentRoutes = [
  {
    path: '/page/pc/s',
    component: Layout,
    redirect: '/page/pc/s/teacherScore',
    name: 'president',
    children: [
      {
        path: 'teacherScore',
        component: () => import('/@/views/president/teacherScore.vue'),
      },
      {
        path: 'familyScore',
        component: () => import('/@/views/president/familyScore.vue'),
      }
    ]
  },
  
]

export default presidentRoutes
  