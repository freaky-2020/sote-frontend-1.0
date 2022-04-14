<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 15px;margin-left: 10%;margin-right: 10%">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 200px">
          <el-option label="学号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table
      :data="newTable.slice((page-1)*limit, page*limit)"
      style="width: 80%;margin-left: 10%"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="学号"
        sortable
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.user.realName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="专业"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.user.userUnit }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="成绩"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.score }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="viewDetail(scope.row)">详细查看</el-button>
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
    <pie></pie>
  </div>
</template>

<script>
import request from '@/utils/request'
import pie from '@/views/grade/components/pie'
export default {
  name: 'grade',
  components:{pie},
  data(){
    return{
      select: '1',
      input: '',
      tableData: [
        {
          user:{
            id: 1,
            password: "123456",
            realName: "wadsafasf",
            roleId: 1,
            userName: "1904011106",
            userStatus: 1,
            userUnit: "计算机科学与技术学院",
            userUniv: "中国石油大学(华东)",
          },
          score:70,
        },
      ],
      total: 0,
      page: 1,
      limit: 10,
    }
  },
  methods: {
    viewDetail(){

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
  },
  computed: {
    newTable: {
      get() {

        if (this.select === '1') {
          return this.tableData.filter((u) => {
            return u.user.userName.indexOf(this.input) !== -1
          })
        } else {
          return this.tableData.filter((u) => {
            if(u.realName === null){
              return null
            }
            return u.user.realName.indexOf(this.input) !== -1
          })
        }
      }
    }
  },
  beforeMount() {
    // this.fetchData()
  },
  beforeUpdate() {
  },
  watch:{
    newTable(){
      this.total = this.newTable.length
    }
  }
}
</script>

<style scoped>

</style>
