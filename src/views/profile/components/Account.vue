<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="username" class="input_" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model.trim="photo" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="email" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="学校" prop="name">
      <el-input v-model.trim="school" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="年级">
      <el-input v-model.trim="grade" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.trim="age" style="width: 40%;" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="gender" placeholder="请选择" style="width: 40%;">
        <el-option :value="0" label="男" />
        <el-option :value="1" label="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-input v-model.trim="birthday" style="width: 40%;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="submit">修改</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button type="primary" @click="submit">取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username:'',
          account: 'aa',
          email: 'aa',
          size: 'aa',
          gender: 'aa',
          age: '',
          grade: '',
          school: '',
          photo: ''
        }
      }
    }
  },
  data(){
    return {
      username:'王信',
      account: '19942421321',
      email: '1300913599@upc.com',
      size: '',
      gender: '男',
      age: '22',
      grade: '3',
      school: '中国石油大学华东',
      photo: '12431242',
      birthday:'7.9',
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
    // display() {
    //   this.
    // }
  }
}
</script>

<style scoped lang="scss">
  .input_ >>> .el-input__inner{
    border: 0;
  }
</style>
