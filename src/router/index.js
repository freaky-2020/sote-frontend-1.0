import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/design',
    component: Layout,
    children: [
      {
        path: 'design',
        name: 'Design',
        component: () => import('@/views/design/design'),
        meta: { title: 'Design', icon: 'el-icon-edit' }
      },
    ]
  },
  {
    path: '/judge',
    component: Layout,
    children: [
      {
        path: 'judge',
        name: 'Judge',
        component: () => import('@/views/judge/judge'),
        meta: { title: 'Judge', icon: 'el-icon-s-check' }
      },
    ]
  },
  {
    path: '/display',
    component: Layout,
    children: [
      {
        path: 'display',
        name: 'Display',
        component: () => import('@/views/display/display'),
        meta: { title: 'Display', icon: 'el-icon-s-check' }
      },
    ]
  },
  {
    path: '/teacherexam',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'teacherExam',
        component: () => import('@/views/exam/index-teacher'),
        meta: { title: '我创建的考试',icon: 'form' }
      },
    ]
  },
  {
    path: '/exam',
    component: Layout,
    children: [
      {
        path: 'index',
        name:'stuExam',
        component: () => import('@/views/exam/index'),
        meta: { title: '我的考试',icon: 'form' }
      },
    ]
  },
  {
    path: '/grade',
    component: Layout,
    children: [
      {
        path: 'grade',
        name: 'Grade',
        component: () => import('@/views/grade/grade'),
        meta: { title: 'Grade', icon: 'el-icon-s-check' }
      },
    ]
  },
  {
    path: '/exam_',
    component: Layout,
    redirect: '/exam/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam_/index'),
        name: 'Exam_',
        meta: { title: 'Exam_', icon: 'user' }
      }
    ]
  },
  {
    path: '/grading',
    component: Layout,
    children: [
      {
        path: 'grading',
        name: 'Grading',
        component: () => import('@/views/grading/grading'),
        meta: { title: 'Grading', icon: 'el-icon-menu' }
      },
    ]
  },
  {
    path: '/bank',
    component: Layout,
    children: [
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/bank/bank'),
        meta: { title: 'Bank', icon: 'el-icon-files' }
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'tab',
        name: 'Tab',
        component: () => import('@/views/table/table'),
        meta: { title: 'Tab', icon: 'table' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'addUser',
        name: 'AddUser',
        component: () => import('@/views/form/AddUser'),
        meta: { title: 'AddForm', icon: 'form' }
      },
      {
        path: 'editUser',
        name: 'EditUser',
        component: () => import('@/views/form/EditUser'),
        meta: { title: 'EditForm', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
