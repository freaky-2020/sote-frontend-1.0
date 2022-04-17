<template>

<!--  <div class="register-container" >-->
  <div class="register-container" :style="backStyles">
    <el-card shadow="hover" class="formcard" box-shadow="100px">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="账号"
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
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleregister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div style="height:30px; width: 100%;text-align: right">
        <router-link
          style="margin-bottom: 20px;color:#304156;margin-right: 10px"
          to="/login"
        >返回登录</router-link>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注 册</el-button>

    </el-form>
    </el-card>
  </div>

</template>

<script>
import { validUsername } from '@/utils/validate'
import request from '@/utils/request'
import loginBackImg from '@/assets/login_images/login_back2.jpeg'

export default {
  name: 'register',
  data() {

    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少是6位'))
      } else {
        callback()
      }
    }
    return {
      backStyles:{
        backgroundImage:`url(${loginBackImg})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        // backgroundSize:'100% 100%',
        position: 'fixed',
        bottom:0
      },
      registerForm: {
        username: undefined,
        password: undefined,
        No: undefined
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
    handleRegister() {
      //
      request({
        url: '/auth/user/add',
        method: 'Post',
        params: {
          roleId:3,
          userStatus:1,
          userName: this.registerForm.username,
          password: this.registerForm.password
        }
      }).then(response => {
        if (response ===true ) {
          this.$notify({
            title: '注册成功',
            message: '注册成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/login')
        } else {
          this.$notify({
            title: '注册失败',
            message: '账号已存在',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#efefef;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: black)) {
  .register-container .el-input input {
    color: black;
  }
}
//显示时按钮样式
.el-button--primary { //需要更改的按钮类型
  background: #304156 !important;
  border-color: #304156 !important;
}
//移入时按钮样式
.el-button--primary:hover {
  background: #5979a0 !important;
  border-color: #304156 !important;
  color: #FFF !important;
}
.formcard{
  background:rgba(255,255,255,0.8);
  border-radius: 10px;
  position: absolute;
  width:500px;
  height: 500px;
  left: 50%;
  top: 50%;

  margin:-250px 0 0 -250px;
}
.formcard:hover{
  background:rgba(255,255,255,0.95);
}
/* reset element-ui css */
.register-container {

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
      //color: black;
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
    color: black;
  }
}
</style>

<style lang="scss" scoped>
$bg:#ececec;
$dark_gray:#889aa4;
//$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
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
      font-size: 26px;
      //color: $light_gray;
      margin: 0px auto 40px auto;
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
