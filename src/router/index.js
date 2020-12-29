import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/user/Login.vue'
import Home from '../views/Home.vue'
import ErrorPage from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/404', component: ErrorPage },
  {
    path: '/home',
    component: Home,
    redirect: '/index1',
    children: [
      {
      path: '/userInfo',
      component: () => import('../views/user/userInfo.vue')
    },
      // 统计
      {
        path: '/index1',
        component: () => import('../views/index/index1.vue')
      },
      {
        path: '/index2',
        component: () => import('../views/index/index2.vue')
      },
      {
        path: '/index3',
        component: () => import('../views/index/index3.vue')
      },
      {
        path: '/index4',
        component: () => import('../views/index/index4.vue')
      },
      {
        path: '/index5',
        component: () => import('../views/index/index5.vue')
      },
      // 班级管理
      {
        path: '/performance',
        component: () => import('../views/classManage/performance.vue')
      },
      {
        path: '/progress',
        component: () => import('../views/classManage/progress.vue')
      },
      {
        path: '/users-list',
        component: () => import('../views/classManage/usersList.vue')
      },
      {
        path: '/faq',
        component: () => import('../views/classManage/faq.vue')
      },
      {
        path: '/classroomAdd',
        component: () => import('../views/classManage/components/classroomAdd.vue')
      },
      {
        path: '/reportPerformance',
        component: () => import('../views/classManage/components/reportPerformance.vue')
      },
      {
        path: '/perDetial',
        component: () => import('../views/classManage/components/perDetial.vue')
      },
      {
        path:'/classroomList',
        component: () => import('../views/classManage/classroomList.vue')
      },
      {
        path:'/papers-list',
        component: () => import('../views/classManage/papersList.vue')
      },
      {
        path:'/papers-add',
        component: () => import('../views/classManage/components/papersAdd.vue')
      },
      // 我的班级
      {
        path: '/myclass',
        component: () => import('../views/myclass/myclass.vue')
      },
      // 互动课堂
      {
        path: '/classroom',
        component: () => import('../views/classroom/classroom.vue'),
        redirect: '/studentSeat',
        children: [
          {
            path: '/studentSeat',
            component: () => import('../views/classroom/toolList/studentSeat.vue')
          },
          {
            path: '/bookResource',
            component: () => import('../views/classroom/course/bookResource.vue')
          },
          {
            path: '/exercise',
            component: () => import('../views/classroom/course/exercise.vue')
          },
          {
            path: '/homeWork',
            component: () => import('../views/classroom/toolList/homeWork.vue')
          },
          {
            path: '/create-courseware',
            component: () => import('../views/classroom/course/createCourseware.vue')
          },
          {
            path: '/edit-courseware',
            component: () => import('../views/classroom/course/editCourseware.vue')
          },
          {
            path: '/course-wareList',
            component: () => import('../views/classroom/course/courseWareList.vue')
          },
          {
            path: '/course-detail',
            component: () => import('../views/classroom/course//courseDetail.vue')
          },
          {
            path: '/models-detail',
            component: () => import('../views/classroom/course/modelsDetail.vue')
          }
        ]
      },
      // 超级作业
      {
        path: '/publish',
        component: () => import('../views/superAssignment/publish.vue')
      },
      {
        path: '/readTask',
        component: () => import('../views/superAssignment/readTask.vue')
      },
      {
        path: '/prepareTask',
        component: () => import('../views/superAssignment/prepareTask.vue')
      },
      {
        path: '/courseware',
        component: () => import('../views/superAssignment/courseware.vue')
      },
      {
        path: '/exercitation',
        component: () => import('../views/superAssignment/exercitation.vue')
      },
      {
        path: '/mistakes',
        component: () => import('../views/superAssignment/mistakes.vue')
      },
      {
        path: '/taskDetial',
        component: () => import('../views/superAssignment/taskDetial.vue')
      },
      // 系统设置
      {
        path: '/information',
        component: () => import('../views/Apps/information.vue')
      },
      {
        path: '/role',
        component: () => import('../views/Apps/role.vue')
      },
      {
        path: '/account',
        component: () => import('../views/Apps/account.vue')
      },
      {
        path: '/operationLog',
        component: () => import('../views/Apps/operationLog.vue')
      },
      {
        path: '/account/addTeacher',
        component: () => import('../views/Apps/components/addTeacher.vue')
      },
      {
        path: '/role/addRole',
        component: () => import('../views/Apps/components/addRole.vue')
      },
      {
        path: '/role/editRole',
        component: () => import('../views/Apps/components/editRole.vue')
      },
      {
        path: '/account/editTeacher',
        component: () => import('../views/Apps/components/editTeacher.vue')
      },
      // 题库资源
      {
        path: '/establish',
        component: () => import('../views/Question/establish.vue')
      },
      {
        path: '/expand',
        component: () => import('../views/Question/expand.vue')
      },
      {
        path: '/textbook',
        component: () => import('../views/Question/textbook.vue')
      },
      {
        path: '/detail',
        component: () => import('../views/Question/detail.vue')
      },
      {
        path: '/history',
        component: () => import('../views/Question/history.vue')
      },
      // 学科工具
      {
        path: '/drawing',
        component: () => import('../views/Tool/drawing.vue')
      },
      // 学生管理
      {
        path: '/crypto-currencies',
        component: () => import('../views/studentManage/studentList.vue')
      },
      {
        path: '/profile',
        component: () => import('../views/studentManage/profile.vue')
      },
      {
        path: '/editprofile',
        component: () => import('../views/studentManage/addStudent.vue')
      },
      {
        path: '/blog',
        component: () => import('../views/studentManage/blog.vue')
      },
      // 智慧课本
      {
        path: '/wisdomBook',
        component: () => import('../views/wisdomBook/wisdomBook.vue')
      },
      // 在线研学
      {
        path: '/onlineStudies',
        component: () => import('../views/onlineStudies/onlineStudies.vue'),
        children: [
          {
            path: '/BYIM',
            component: () => import('../views/onlineStudies/componts/BYIM.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
