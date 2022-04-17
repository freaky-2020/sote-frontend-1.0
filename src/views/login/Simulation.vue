<template>
  <div class="login-container" :style="backStyles">
    <el-card shadow="hover" class="loginFormcard" box-shadow="100px">
      <el-form id="loginForm" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
               auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">
            <img width="60"
                 src="../../assets/images/img.png"/>
            <img width="80"
                 src="../../assets/images/sote-o.png"/>
            考试系统
          </h3>
        </div>
        <el-radio-group style="margin-bottom: 10px" v-model="role">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">老师</el-radio>
        </el-radio-group>
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
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
          <svg-icon icon-class="password"/>
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
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
        </el-form-item>

        <div>
          <el-button :loading="loading" type="primary" style="width:47%;" @click.native.prevent="handleLogin">登录
          </el-button>
          <el-button :loading="loading" type="primary" style="width:47%;" @click.native.prevent="handleReturn">返回
          </el-button>
        </div>
      </el-form>
    </el-card>
    <!--    <index-li-zi></index-li-zi>-->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import loginBackImg from '@/assets/login_images/login_back2.jpeg'
import request from '@/utils/request'

export default {
  name: 'Simulation',
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
      role: 1,
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
      backStyles: {
        backgroundImage: `url(${loginBackImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // backgroundSize:'100% 100%',
        position: 'fixed',
        bottom: 0
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
    handleReturn(){
      this.$router.push({path:'login'})
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
          request({
            url: '/auth/user/referee',
            method: 'Get',
            params: {
              userName: this.loginForm.username,
              password: this.loginForm.password
            }
          }).then(response => {
            if (response === true) {
              if (this.role === 1) {
                this.loading = true
                this.$store.dispatch('user/login', { username: '17864230', password: 123456 }).then(() => {
                  this.$router.push({ path: this.redirect || '/' })
                  this.loading = false
                }).catch(() => {
                  this.loading = false
                })
              } else {
                this.loading = true
                this.$store.dispatch('user/login', { username: '1901040301', password: 123456 }).then(() => {
                  this.$router.push({ path: this.redirect || '/' })
                  this.loading = false
                }).catch(() => {
                  this.loading = false
                })
              }
            } else {
              this.$notify({
                title: '账号或密码错误',
                message: '账号或密码错误',
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          this.$notify({
            title: '请输入正确的账号密码',
            message: '请输入正确的账号密码',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    forgetPwd() {
      this.$router.push({ path: '/forgetPwd' })
    }

  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ececec;


@supports (-webkit-mask: none) and (not (cater-color: black)) {
  .login-container .el-input input {
    color: black;
  }
}

.loginFormcard {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  position: absolute;
  width: 450px;
  height: 450px;
  left: 50%;
  top: 50%;

  margin: -225px 0 0 -225px;
}

.loginFormcard:hover {
  background: rgba(255, 255, 255, 0.95);
}

/* reset element-ui css */
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
$bg: #ececec;
$dark_gray: #889aa4;
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
