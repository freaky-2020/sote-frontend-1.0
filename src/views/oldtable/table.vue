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
          @click="add()">添加用户</el-button>
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
        highlight-current-row
        @sort-change="sortChange">
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
              @click="handleEdit(scope.row.userid, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>



    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '1',
      select: '1',
      input: '',
      editIndex: -1,
      tableData: this.$store.state.tableData,
      user: {
        userid: '',
        password: '',
        name: '',
        status: '',
        univ: '',
        unit: ''
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
    handleEdit(id, editUser) {
      this.$router.push({
        name: 'EditUser',
        query: {
          editUser,
          id
        }
      })
    },
    add() {
      this.$router.push({
        name: 'EditUser'
      })
    }
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
.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
</style>
