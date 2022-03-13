<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="编号">
        <el-input v-model="form.userid" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="身份" prop="region">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="老师" value="2"></el-option>
          <el-option label="学生" value="3"></el-option>、
        </el-select>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="form.univ" />
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.unit" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        password: '',
        name: '',
        status: '3',
        univ: '',
        unit: ''
      }
    }
  },
  methods: {
    onSubmit(form, index) {
      this.$store.commit('ADD', form)
      this.$router.push({
        name: 'Tab'
      })
    },
    onCancel() {
      this.$router.push({
        name: 'Tab'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

