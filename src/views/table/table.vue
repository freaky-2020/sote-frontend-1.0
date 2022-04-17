<template>
  <div class="app-container">
    <div class="filter-container">
      <template>
        <el-radio-group v-model="radio">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">老师</el-radio>
          <el-radio :label="3">学生</el-radio>
        </el-radio-group>
        <template>
          <span style="margin-left: 100px"></span>
        </template>
        <el-button
          size="mini"
          type="success"
          @click="add">添加用户</el-button>
      </template>
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="nnewTable.slice((page-1)*limit, page*limit)"
        style="width: 100%"
        border
        fit
        highlight-current-row>
        <el-table-column
          label="编号"
          sortable
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.realName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.password }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="学校"
          width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userUniv }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="专业"
          width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userUnit }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <div style="margin-top:20px;float: right;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="身份" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option label="管理员" :value="1"></el-option>
              <el-option label="老师" :value="2"></el-option>
              <el-option label="学生" :value="3"></el-option>、
            </el-select>
          </el-form-item>
          <el-form-item prop="userName" label="编号">
            <el-input placeholder="请输入学号" v-model="form.userName" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input placeholder="请输入密码" v-model="form.password" />
          </el-form-item>
          <el-form-item prop="realName" label="名字">
            <el-input placeholder="请输入姓名" v-model="form.realName" />
          </el-form-item>
          <el-form-item prop="userUniv" label="学校">
            <el-input placeholder="请输入学校名" v-model="form.userUniv">
            </el-input>
          </el-form-item>
          <el-form-item prop="userUnit" label="专业">
            <el-input placeholder="请输入专业名" v-model="form.userUnit" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogStatus==='create'?createData(form):updateData(form, form.userName)">确认</el-button>
            <el-button @click="cancel" :befor-close="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import axios from 'axios'

export default {
  data() {
    return {
      list: null,
      total: 0,
      page: 1,
      limit: 10,
      newForm:[],
      listLoading: true,
      radio: 1,
      select: '1',
      input: '',
      editIndex: -1,
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      form: {
        id: '',
        password: '',
        userName:'',
        roleId:'',
        realName: '',
        userStatus: '',
        userUniv: '',
        userUnit: ''
      },
      rules: {
        userName: [
          { required: true,  message: '学号不能为空', trigger: 'change' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, Placeholder:'请输入学号', message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        realName: [
          { required: true, Placeholder:'请输入姓名', message: '名字不能为空', trigger: 'blur' }
        ],
        userUniv: [
          { required: true, Placeholder:'请输入学校名', message: '学校不能为空', trigger: 'blur' }
        ],
        userUnit: [
          { required: true, Placeholder:'请输入专业名', message: '专业不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleDelete(deleteUser) {
      if (confirm('确定删除这个吊人？')) {
        request({
          url: '/auth/user/delete/'+deleteUser.userName,
          method: 'delete',
        }).then(response => {
          console.log(response)
        }).catch( err =>{
          console.log(err)
        })
        console.log(deleteUser)
        this.tableData = this.tableData.filter((u) => {
          return u !== deleteUser
        })
      }
    },
    handleEdit(editUser) {
      let copy = Object.assign({}, editUser)
      console.log(editUser)
      this.form = copy
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    cancel(){
      this.form = JSON.parse(localStorage.getItem('obj'))
      this.dialogFormVisible = false
    },
    add(){
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.form={}
      this.$nextTick()
    },
    updateData(form, id) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          request({
            url: '/auth/user/update',
            method: 'put',
            params:form,
          }).then(response => {
            console.log(response)
          }).catch( err =>{
            console.log(err)
          })
          for(let i=0;i<this.nnewTable.length;i++){
            if(this.nnewTable[i].userName === id){
              this.nnewTable.splice(i,1,form)
            }
          }
          alert('submit!');
          this.dialogFormVisible = false
        } else {
          alert('请按照修改规则修改用户');
          return false;
        }
      })
    },
    createData(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          request({
            url: '/auth/user/add',
            method: 'post',
            params:form,
          }).then(response => {
            console.log(response)
          }).catch( err =>{
            console.log(err)
          })
          this.tableData.push(form)
          this.$notify({
            title: '成功',
            message: '添加用户成功',
            type: 'success'
          });
          this.dialogFormVisible = false
        } else {
          alert('请按照添加规则添加用户');
          return false;
        }
      })
    },
    fetchData() {
      request({
        url: '/auth/user',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.tableData = response
        console.log(this.tableData)
      }).catch( err =>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.page = 1
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
    },
    request(){
      request({
        url: '/auth/user',
        methods: 'post',
        // params:{
        //   size:15
        // }
      }).then(response => {
        console.log(response)
        this.tableData = response
        console.log(this.tableData)
      }).catch( err =>{
        console.log(err)
      })
    }
  },
  computed: {
    newTable() {
      return this.tableData.filter((u) => {
        return u.roleId === this.radio
      })
    },
    nnewTable: {
      get() {
        if (this.select === '1') {
          return this.newTable.filter((u) => {
            return u.userName.indexOf(this.input) !== -1
          })
        } else {
          return this.newTable.filter((u) => {
            if(u.realName === null){
              return null
            }
            return u.realName.indexOf(this.input) !== -1
          })
        }
      }
    }
  },
  beforeMount() {
    this.fetchData()
  },
  beforeUpdate() {
    this.total = this.nnewTable.length
  }
}
</script>
<style>
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
