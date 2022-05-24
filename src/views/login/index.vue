<template>

  <div class="login-container" :style="backStyles">
    <div class="loginText">
      <login-text></login-text>
    </div>
    <el-card shadow="hover" class="loginFormcard" box-shadow="100px">
    <el-form id="loginForm" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img width="60"
               src="../../assets/images/img.png" />
          <img width="80"
               src="../../assets/images/sote-o.png"/>
          考试系统
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
<!--          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
        </span>
      </el-form-item>
      <div style="width: 100%;text-align: right">
        <el-link style="float:left;margin-bottom: 20px;margin-right: 10px" @click="toSimulation()">管理员模拟登录</el-link>
        <el-link
          type="primary"
          style="margin-bottom: 20px;color:#304156;margin-right: 10px"
          @click.native.prevent="forgetPwd"
        >忘记密码</el-link>
      </div>
      <div>
      <el-button :loading="loading" type="primary" style="width:47%;" @click.native.prevent="handleLogin">登录</el-button>
      <el-button :loading="loading" type="plain" style="width:47%;float:right" @click.native.prevent="goToRegister">注册</el-button>
      </div>
    </el-form>
    </el-card>
<!--    <index-li-zi></index-li-zi>-->

  </div>

</template>

<script>
import { validUsername } from '@/utils/validate'
import loginBackImg from '@/assets/login_images/login_back2.jpeg'
import LoginText from '@/views/login/component/LoginText'
// import IndexLiZi from '@/components/IndexLiZi'
export default {
  components:{
    // IndexLiZi,
    LoginText
  },
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入有效用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      backStyles:{
        backgroundImage:`url(${loginBackImg})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        // backgroundSize:'100% 100%',
        position: 'fixed',
        bottom:0
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    toSimulation(){
      this.$router.push({path:'/simulation'})
    },
    goToRegister(){
      this.$router.push({path:'/register'})
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '请输入有效的账号密码',
            message: '请输入有效的账号密码',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    forgetPwd() {
      this.$router.push({ path: '/forgetPwd' } )
    }

  }
}

</script>
<!--<script>-->
<!--import {wallbgcanvas} from '@/assets/js/wallbgcanvas'-->
<!--</script>-->
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#ececec;


@supports (-webkit-mask: none) and (not (cater-color: black)) {
  .login-container .el-input input {
    color: black;
  }
}
.loginText{
  position: absolute;
  width:450px;
  height: 450px;
  left: 25%;
  top: 45%;
  margin:-225px 0 0 -225px;
}
.loginFormcard{
  background:rgba(255,255,255,0.8);
  border-radius: 10px;
  position: absolute;
  width:450px;
  height: 450px;
  left: 70%;
  top: 45%;

  margin:-225px 0 0 -225px;
}
.loginFormcard:hover{
  background:rgba(255,255,255,0.95);
}
/* reset element-ui intro-css */
.login-container {
  //background-image: url("/src/assets/login_images/login_back.jpeg");

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      caret-color: black;

      &:-webkit-autofill {
        box-shadow: 0 0 5px 1000px $bg inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#ececec;
$dark_gray:#889aa4;
//$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #ededed;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 70px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: black;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  //图标？
  .svg-container {
    padding: 6px 5px 6px 15px;
    //color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      //color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
