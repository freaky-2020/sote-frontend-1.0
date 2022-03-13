<template>
  <div class="app-container">
    <div class="filter-container">
      <template>
        <el-radio-group v-model="radio">
          <el-radio label="1">管理员</el-radio>
          <el-radio label="2">老师</el-radio>
          <el-radio label="3">学生</el-radio>
        </el-radio-group>
        <template>
          <span style="margin-left: 100px"></span>
        </template>
        <el-button
          size="mini"
          type="success"
          @click="add">添加用户</el-button>
      </template>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="nnewTable"
        style="width: 100%"
        border
        fit
        highlight-current-row>
        <el-table-column
          label="学号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userid }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="180">
          <template slot-scope="scope">
            <el-popover placement="top">
              <p>密码: {{ scope.row.password }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.password }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="学校"
          width="180">
          <template slot-scope="scope">
            <el-popover placement="top">
              <p>学校: {{ scope.row.univ }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.univ }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="专业"
          width="180">
          <template slot-scope="scope">
            <el-popover placement="top">
              <p>专业: {{ scope.row.unit }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.unit }}</el-tag>
              </div>
            </el-popover>
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

<!--      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="身份" prop="region">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="老师" value="2"></el-option>
              <el-option label="学生" value="3"></el-option>、
            </el-select>
          </el-form-item>
          <el-form-item prop="userid" label="编号">
            <el-input placeholder="请输入学号" v-model="form.userid" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input placeholder="请输入密码" v-model="form.password" />
          </el-form-item>
          <el-form-item prop="name" label="名字">
            <el-input placeholder="请输入姓名" v-model="form.name" />
          </el-form-item>
          <el-form-item prop="univ" label="学校">
            <el-input placeholder="请输入学校名" v-model="form.univ">
            </el-input>
          </el-form-item>
          <el-form-item prop="unit" label="专业">
            <el-input placeholder="请输入专业名" v-model="form.unit" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogStatus==='create'?createData(form):updateData(form, form.userid)">确认</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      listLoading: true,
      radio: '1',
      select: '1',
      input: '',
      editIndex: -1,
      tableData: this.$store.state.tableData,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      form: {
        userid: '',
        password: '',
        name: '',
        status: '',
        univ: '',
        unit: ''
      },
      rules: {
        userid: [
          { required: true,  message: '学号不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, Placeholder:'请输入学号', message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度必须在5到10之间', trigger: 'blur' }
        ],
        name: [
          { required: true, Placeholder:'请输入姓名', message: '名字不能为空', trigger: 'blur' }
        ],
        univ: [
          { required: true, Placeholder:'请输入学校名', message: '学校不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, Placeholder:'请输入专业名', message: '专业不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleDelete(deleteUser) {
      if (confirm('确定删除这个吊人？')) {
        console.log(deleteUser)
        this.tableData = this.tableData.filter((u) => {
          return u !== deleteUser
        })
      }
    },
    handleEdit(editUser) {
      this.form = editUser
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    add(){
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.form={}
      this.$nextTick()
    },
    updateData(form, id) {
      this.$store.commit('Delete', id)
      this.$store.commit('ADD', form)
      this.dialogFormVisible = false
    },
    createData(form) {
      this.$store.commit('ADD', form)
      this.dialogFormVisible = false
    },
    // getList() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //   })
    // },
  },
  computed: {
    newTable() {
      return this.tableData.filter((u) => {
        return u.status === this.radio
      })
    },
    nnewTable: {
      get() {
        if (this.select === '1') {
          return this.newTable.filter((u) => {
            return u.userid.indexOf(this.input) !== -1
          })
        } else {
          return this.newTable.filter((u) => {
            return u.name.indexOf(this.input) !== -1
          })
        }
      }
    }
  },
}
</script>
<style>
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
</style>
