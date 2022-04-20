<template>
  <div class="top-nav">
    <div class="log" >
      <router-link to="/dashboard" class="router-test"  >
        <div style="padding:2px 0">
          <img width="40"
               src="../../assets/images/img.png" />
          <img width="80"
               src="../../assets/images/sote-o.png"/>
        </div>

      </router-link>

    </div>

    <el-menu
      menu-trigger="hover"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :default-active="activeMenu"
      mode="horizontal"
      @select="handleSelect">
      <div v-for="item in permission_routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path"
          >{{ item.meta ? item.meta.title : item.children[0].meta.title }}
          </el-menu-item>
        </app-link>
      </div>
    </el-menu>

<!--    头像    -->


    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
<!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <img src="../../assets/images/personphoto.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile">
            <el-dropdown-item>个人主页</el-dropdown-item>
          </router-link>
<!--          <a href="https://panjiachen.github.io/vue-element-admin-site/#/" target="_blank">-->
<!--            <el-dropdown-item>Docs</el-dropdown-item>-->
<!--          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { constantRoutes } from '@/router'
import { isExternal } from '@/utils/validate'
import AppLink from './Sidebar/Link'
import { mapGetters } from 'vuex'
import soteO from '@/assets/images/sote-o.svg'

export default {


  components: {
    AppLink,
    soteO,
  },
  data() {
    return {
      routes: constantRoutes
    }
  },

  computed:{
    ...mapGetters(['avatar','permission_routes']),
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      // 如果是首页，首页高亮
      if (path === '/dashboard') {
        return '/'
      }
      // 如果不是首页，高亮一级菜单
      const activeMenu = '/' + path.split('/')[1]
      return activeMenu
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.setSidebarHide(route)

      //得到子级路由
      const route = this.routes.find(item => item.path === key)
      this.$store.commit('permission/SET_CURRENT_ROUTES', route)
      // 把选中路由的子路由保存store


    },
    resolvePath(item) {
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect
        return path
      }

      // 如果有子项，默认跳转第一个子项路由
      let path = ''
      /**
       * item 路由子项
       * parent 路由父项
       */
      const getDefaultPath = (item, parent) => {
        // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
        if (isExternal(item.path)) {
          path = item.path
          return
        }
        // 第一次需要父项路由拼接，所以只是第一个传parent
        if (parent) {
          path += (parent.path + '/' + item.path)
        } else {
          path += ('/' + item.path)
        }
        // 如果还有子项，继续递归
        if (item.children) {
          getDefaultPath(item.children[0])
        }
      }

      if (item.children) {
        getDefaultPath(item.children[0], item)
        return path
      }

      return item.path
    },
    // 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
    initCurrentRoutes() {
      this.setSidebarHide(route)
      const { path } = this.$route
      let route = this.routes.find(
        item => item.path === '/' + path.split('/')[1]
      )
      // 如果找不到这个路由，说明是首页
      if (!route) {
        route = this.routes.find(item => item.path === '/')
      }
      this.$store.commit('permission/SET_CURRENT_ROUTES', route)

    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      if (!route.children || route.children.length === 1) {
        this.$store.dispatch('app/toggleSideBarHide', true)
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false)
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }

  },
  mounted() {
    this.initCurrentRoutes()
  },
}

</script>

<style lang="scss" scoped>
</style>
