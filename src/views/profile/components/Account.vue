<template>
  <el-form label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model.trim="account.realName" style="width: 50%;" />
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model.trim="account.userName" :disabled="true" style="width: 50%;" />
    </el-form-item>
    <el-form-item label="学校" prop="name">
      <el-input v-model.trim="account.userUniv" style="width: 50%;" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model.trim="account.userUnit" style="width: 50%;" />
    </el-form-item>
<!--    <el-form-item label="性别" prop="gender">-->
<!--      <el-select v-model="gender" placeholder="请选择" style="width: 40%;">-->
<!--        <el-option :value="0" label="男" />-->
<!--        <el-option :value="1" label="女" />-->
<!--      </el-select>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="出生日期">-->
<!--      <el-input v-model.trim="birthday" style="width: 40%;" />-->
<!--    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="submit">修改</el-button>
<!--      <el-button type="primary" @click="submit">提交</el-button>-->
<!--      <el-button type="primary" @click="submit">取消</el-button>-->
    </el-form-item>
  </el-form>

</template>

<script>
import request from '@/utils/request'

export default {
  props:['account'],
  data(){
    return {
      account: null
    }
  },
  methods: {
    submit() {
      this.submitData()
      this.$message({
        message: '用户信息已更新',
        type: 'success',
        duration: 5 * 1000
      })
    },
    submitData(num) {
      request({
        url: 'auth/user/update',
        method: 'put',
        params: this.account
      }).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
