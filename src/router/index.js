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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/design',
    component: Layout,
    children: [
      {
        path: 'design',
        name: 'Design',
        component: () => import('@/views/design/design'),
        meta: { title: '设计试卷', icon: 'el-icon-edit' }
      },
    ],
    hidden: true,
  },
  {
    path: '/stu',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index-stu'),
      meta: { title: '主页', icon: 'dashboard' }
    }]

  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index-admin'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/design',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'design',
  //       name: 'Design',
  //       component: () => import('@/views/design/design'),
  //       meta: { title: '设计试卷', icon: 'el-icon-edit' }
  //     },
  //   ]
  // },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: true,
  },
  {
    path: '/judge',
    component: Layout,
    children: [
      {
        path: 'judge',
        name: 'Judge',
        component: () => import('@/views/judge/judge'),
        meta: { title: '审批', icon: 'el-icon-s-check' }
      },
    ]
  },
  // {
  //   path: '/display',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'display',
  //       name: 'Display',
  //       component: () => import('@/views/display/display'),
  //       meta: { title: '考试主体', icon: 'el-icon-s-check' }
  //     },
  //   ]
  // },
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
        meta: { title: '查看成绩', icon: 'el-icon-s-check' }
      },
    ]
    ,
    hidden: true,
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
        meta: { title: '考试主体', icon: 'user' }
      }
    ],
    hidden: false
  },
  {
    path: '/exam_results',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam_results/index'),
        name: 'Exam_results',
        meta: { title: '考试结果', icon: 'user' }
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
        meta: { title: '老师给学生批卷', icon: 'el-icon-menu' }
      },
    ],
    hidden: true
  },
  {
    path: '/fillblank',
    component: Layout,
    children: [{
      path: 'fillblank',
      name: 'Grading',
      component:()=> import('@/views/exam_/components/fillblank'),
    }],
    hidden: true
  },
  {
    path: '/bank',
    component: Layout,
    children: [
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/bank/bank'),
        meta: { title: '试题管理', icon: 'el-icon-files' }
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/createexam',
    component: Layout,
    children: [
      {
        path: 'examinfo',
        name: 'paperinfo',
        component: () => import('@/views/createpaper/examInfo'),
        meta: { title: '创建试卷', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam/record'),
        meta: { title: '考试记录',icon: 'form' }
      },

    ],
    hidden: true,
  },
  {
    path: '/visualization',
    component: () => import('@/views/visualization/index'),
    hidden: false,
    meta: { title: '可视化',icon: '' }

  },



  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     },
  //     {
  //       path: 'tab',
  //       name: 'Tab',
  //       component: () => import('@/views/table/table'),
  //       meta: { title: 'Tab', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
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
  //   path: '/exam_publish',
  //   component: Layout,
  //   redirect: '/exam_publish/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/exam_publish/index'),
  //       name: 'Exam_publish',
  //       meta: { title: 'Exam_publish', icon: 'user' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  // {
  //   path: '/Invigilate',
  //   component: Layout,
  //   name: '监考',
  //   meta: { title: '监考', icon: 'link' },
  //   children: [
  //     {
  //       path: 'index',
  //       component: ()=>import('@/views/Invigilate/index'),
  //       name: '监考',
  //       meta: { title: '监考页', icon: 'link' }  //页面需要的权限
  //     }]
  // },
  // {
  //   path: '/detect',
  //   component: Layout,
  //   name: '检测',
  //   meta: { title: '检测', icon: 'link' },
  //   children: [
  //     {
  //       path: 'index',
  //       component: ()=>import('@/views/detect/index'),
  //       name: '检测',
  //       meta: { title: '检测页', icon: 'link' }  //页面需要的权限
  //     }]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { title: '权限测试', icon: 'link',roles: ['STUDENT'] }, //页面需要的权限
    children: [
      {
        path: 'index',
        component: ()=>import('@/views/permission/index'),
        name: '权限测试页',
        meta: { title: '权限测试页', icon: 'link',roles: ['STUDENT'] }  //页面需要的权限
      }]
  },
  {
    path: '/design',
    component: Layout,
    children: [
      {
        path: 'design',
        name: 'Design',
        component: () => import('@/views/design/design'),
        meta: { title: '设计试卷', icon: 'el-icon-edit' }
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register'),
    hidden: true,
  },
  {
    path: '/judge',
    component: Layout,
    children: [
      {
        path: 'judge',
        name: 'Judge',
        component: () => import('@/views/judge/judge'),
        meta: { title: '审批', icon: 'el-icon-s-check' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

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
