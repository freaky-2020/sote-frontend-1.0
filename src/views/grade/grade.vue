<template>
<div class="background-container">
  <div  style="margin-right: 17%">
    <h3 class="pagetitle">考生成绩</h3>
    <div style="margin: 15px 0">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 150px">
          <el-option label="学号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-table
      :data="newTableData.slice((page-1)*limit, page*limit)"
      style="width: 100%"
      border
      fit
      :default-sort = "{prop: 'score', order: 'descending'}"
      highlight-current-row>
      <el-table-column
        label="学号"
        sortable
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.user.realName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label=" '成绩'"
        sortable
        align="center">
        <el-table-column
          :label=" '主观题    满分:' + this.tableData[0].maxNonSynScore"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.nonSynScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          :label=" '客观题    满分' + this.tableData[0].maxSynScore"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.synScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label=" '总分      满分' +this.tableData[0].maxScore"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.totalScore }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="状态"
        width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.status === 1">正常结束</el-tag>
            <el-tag size="medium" type="danger" v-if="scope.row.status === 0">缺考</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="info"
            @click="viewDetail(scope.row)">详细信息</el-button>
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

<!--    <pie></pie>-->
  </div>
  <div  class="chart-div" style="height: 350px;width: 200px;position:relative;top:-300px;left: 85%">
    <donut-chart :data="chartData"></donut-chart>
  </div>
</div>

</template>

<script>
import request from '@/utils/request'
import pie from '@/views/grade/components/pie'
import DonutChart from '@/components/Charts/DonutChart'

export default {
  name: 'grade',
  components:{pie,DonutChart},
  data(){
    return{
      page:1,
      examId: this.$route.query.examId,
      limit:10,
      total:0,
      select: '1',
      input: '',
      tableData:[],
      chartData:[
        { value:0,name:'90~100'},
        { value:0,name:'80~89'},
        { value:0,name:'70~79'},
        { value:0,name:'60~69'},
        { value:0,name:'<60'},
      ],
    }
  },
  methods: {
    viewDetail(item){
      this.$router.push({ name: 'Result',
        query: {
          userName:item.user.userName,
          realName:item.user.realName,
          examId:this.examId,
          isTeacher:true
        } })
    },
    fetchData() {
      request({
        url: '/exam/info/result/' + this.$route.query.examId,
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.tableData = response
        this.total = response.length
        this.getChartData()
      }).catch( err =>{
        console.log(err)
      })
    },
    getChartData(){
      let v1=0,v2=0,v3=0,v4=0,v5=0
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].totalScore <60){
          v5 += 1
        }
        else if(this.tableData[i].totalScore<=69){
          v4 += 1
        }
        else if(this.tableData[i].totalScore<=79){
          v3 += 1
        }
        else if(this.tableData[i].totalScore<=89){
          v2 += 1
        }
        else if(this.tableData[i].totalScore<=100){
          v1 += 1
        }
      }
      this.chartData[0].value =v1
      this.chartData[1].value =v2
      this.chartData[2].value =v3
      this.chartData[3].value =v4
      this.chartData[4].value =v5
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
    newTableData: {
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
    this.fetchData()
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
