<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="身份" prop="region">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="老师" value="2"></el-option>
          <el-option label="学生" value="3"></el-option>、
        </el-select>
      </el-form-item>
      <el-form-item prop="userid" label="编号">
        <el-input v-model="form.userid" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item prop="name" label="名字">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="univ" label="学校">
        <el-autocomplete
          v-model="stateSchool"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item prop="unit" label="专业">
        <el-input v-model="form.unit" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form,$route.query.id)">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['editUser', 'id'],
  data() {
    return {
      form: {
        userid: '',
        password: '',
        name: '',
        status: '3',
        univ: '',
        unit: ''
      },
      school: [],
      stateSchool: '',
      department: [],
      stateDepart: '',
      rules: {
        userid: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名字不能为空', trigger: 'change' }
        ],
        univ: [
          { required: true, message: '学校不能为空', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '专业不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit(form, id) {
      console.log(id)
      this.$store.commit('Delete', id)
      this.$store.commit('ADD', form)
      this.$router.push({
        name: 'Tab'
      })
    },
    onCancel() {
      this.$router.push({
        name: 'Tab'
      })
    },
  },
  beforeMount() {
    if (this.$route.query.editUser !== undefined) {
      this.form = this.$route.query.editUser
      this.stateSchool = this.$route.query.editUser.univ
    }
  },
  mounted() {
    this.school = this.loadAllSchool()
    this.department = this.loadAllSchool()
  },
  updated() {
    this.form.univ = this.stateSchool
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

