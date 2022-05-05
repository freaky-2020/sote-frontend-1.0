import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Navbar from '@/layout/components/Navbar'
import AppMain from '@/layout/components/AppMain'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/simulation',
    name: 'Simulation',
    component:()=>import('@/views/login/Simulation'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  // {
  //   path: '/analyse',
  //   component: Layout,
  //   children: [
  //     {
  //       path:'index',
  //       component:()=>import('@/views/analyse/index'),
  //       name: 'Analyse',
  //       meta: { title: 'Analyse'}
  //     }
  //
  //   ]
  // },
  {
    path: '/introduction',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '',
        component: () => import('@/views/introduction/x'),
        meta: { title: '欢迎页', icon: 'user', noCache: true }
      }
    ]
  },


]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '主页', icon: 'dashboard', roles: ['ADMIN'] },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index-admin'),
      meta: { title: '主页', icon: 'dashboard', roles: ['ADMIN'] }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '主页', icon: 'dashboard', roles: ['TEACHER'] },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard', roles: ['TEACHER'] }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '主页', icon: 'dashboard', roles: ['STUDENT'] },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index-stu'),
      meta: { title: '主页', icon: 'dashboard', roles: ['STUDENT'] }
    }]

  },
  {
    path: '/judge',
    component: Layout,
    meta: { title: '审批', icon: 'el-icon-s-check', roles: ['ADMIN'] },
    children: [
      {
        path: 'judge',
        name: 'Judge',
        component: () => import('@/views/judge/judge'),
        meta: { title: '题库审批', icon: 'el-icon-s-check', roles: ['ADMIN'] }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: '用户管理', icon: 'el-icon-s-check', roles: ['ADMIN'] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/table'),
        meta: { title: '用户管理', icon: 'el-icon-s-check', roles: ['ADMIN'] }
      }
    ]
  },
  {
    path: '/bank',
    component: Layout,
    meta: { title: '试题管理', icon: 'el-icon-files', roles: ['ADMIN', 'TEACHER'] },
    children: [
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/bank/bank'),
        meta: { title: '试题管理', icon: 'el-icon-files', roles: ['ADMIN', 'TEACHER'] }
      }
    ]
  },
  {
    path: '/examBank',
    component: Layout,
    redirect: '/examBank',
    meta: { title: '试卷库', icon: 'dashboard', roles: ['ADMIN','TEACHER'] },
    children: [{
      path: 'examBank',
      name: 'ExamBank',
      component: () => import('@/views/examBank/examBank'),
      meta: { title: '试卷库', icon: 'dashboard', roles: ['ADMIN','TEACHER'] }
    }]
  },
  {
    path: '/visualization',
    component: () => import('@/views/visualization/index'),

    meta: { title: '数据分析', icon: '', roles: ['ADMIN'] }
  },

  {
    path: '/result',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'result',
        name: 'Result',
        component: () => import('@/views/result/result'),
        meta: { title: '成绩查看', icon: 'clipboard', roles: ['STUDENT', 'TEACHER', 'ADMIN'] }
      }
    ]
  },

  {
    path: '/design',
    component: Layout,
    meta: { title: '设计试卷', icon: 'el-icon-edit', roles: ['TEACHER'] },
    children: [
      {
        path: 'design',
        name: 'Design',
        component: () => import('@/views/design/design'),
        meta: { title: '设计试卷', icon: 'el-icon-edit', roles: ['TEACHER'] }
      }
    ],
    hidden: true
  },
  {
    path: '/teacherexam',
    component: Layout,
    meta: { title: '我创建的考试', icon: 'form', roles: ['TEACHER'] },
    children: [
      {
        path: 'index',
        name: 'teacherExam',
        component: () => import('@/views/exam/index-teacher'),
        meta: { title: '我创建的考试', icon: 'form', roles: ['TEACHER'] }
      }
    ]
  },
  {
    path: '/grading',
    component: Layout,
    meta: { title: '老师给学生批卷', icon: 'el-icon-menu', roles: ['TEACHER'] },
    children: [
      {
        path: 'grading',
        name: 'Grading',
        component: () => import('@/views/grading/grading'),
        meta: { title: '老师给学生批卷', icon: 'el-icon-menu', roles: ['TEACHER'] }
      }
    ],
    hidden: true
  },
  {
    path: '/createexam',
    component: Layout,
    meta: { title: '创建考试', icon: 'clipboard', roles: ['TEACHER'] },
    children: [
      {
        path: 'examinfo',
        name: 'paperinfo',
        component: () => import('@/views/createpaper/examInfo'),
        meta: { title: '创建考试', icon: 'clipboard', roles: ['TEACHER'] }
      }
    ]
  },

  {
    path: '/grade',
    component: Layout,
    meta: { title: '老师查看学生的成绩', icon: 'el-icon-s-check', roles: ['TEACHER'] },
    children: [
      {
        path: 'grade',
        name: 'Grade',
        component: () => import('@/views/grade/grade'),
        meta: { title: '老师查看学生的成绩', icon: 'el-icon-s-check', roles: ['TEACHER'] }
      }
    ],
    hidden: true
  },

  {
    path: '/exam',
    component: Layout,
    meta: { title: '我的考试', icon: 'form', roles: ['STUDENT'] },
    children: [
      {
        path: 'index',
        name: 'stuExam',
        component: () => import('@/views/exam/index'),
        meta: { title: '我的考试', icon: 'form', roles: ['STUDENT'] }
      }
    ]
  },

  {
    path: '/record',
    component: Layout,
    meta: { title: '考试记录', icon: 'form', roles: ['STUDENT'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam/record'),
        meta: { title: '考试记录', icon: 'form', roles: ['STUDENT'] }
      }
    ]
  },
  {
    path: '/exam_',

    meta: { title: '考试主体', icon: 'user', roles: ['STUDENT', 'TEACHER'] },

    component: () => import('@/views/exam_/index'),
    name: 'Exam_',

    hidden: true
  },


  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
