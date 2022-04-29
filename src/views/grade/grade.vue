<template>
<div class="background-container">
  <div>
    <h3 class="pagetitle">考生成绩</h3>
    <el-card class="box-card" style="display: inline-block;height: 400px;width: 25%">
      <div slot="header" class="clearfix">
        <span>分数分段表</span>
      </div>
      <div style="margin-top: -5px">
        <el-table
          size="mini"
          :data="scoreData"
          style="width: 100%"
          border
          :cell-style="{padding:'2px'}"
          fit
          highlight-current-row>
          <el-table-column
            label="得分率"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.getRate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="人数"
            width="70">
            <template slot-scope="scope">
              <span>{{ scope.row.sCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="比率">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.proportion*100+'%'}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="display: inline-block;height: 400px;width: 30%">
      <div slot="header" class="clearfix">
        <span>分数分段饼图</span>
      </div>
      <div  class="chart-div">
        <donut-chart :data="chartData" style="width: 250px;height: 300px;margin-left: 40px"></donut-chart>
      </div>
    </el-card>
    <el-card class="box-card" style="display: inline-block;height: 400px;width: 45%">
      <div slot="header" class="clearfix">
        <span>分数分段折线图</span>
      </div>
      <div  class="chart-div">
<!--        <grade-chart :scoreData="scoreData"></grade-chart>-->
      </div>
    </el-card>
    <div style="text-align: center">
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 15%">
        <div slot="header" class="clearfix">
          <span>交卷人数/总人数</span>
        </div>
        {{scoreList.postNum}}/{{scoreList.totalNum}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 10%">
        <div slot="header" class="clearfix">
          <span>及格人数</span>
        </div>
        {{scoreList.passNum}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 12%">
        <div slot="header" class="clearfix">
          <span>及格分数/总分</span>
        </div>
        <span style="color: red">{{scoreList.passScore}}</span>
        /{{scoreList.totalScore}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>及格率</span>
        </div>
        {{Math.round(scoreList.passRate*10000)/100+'%'}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>优秀率</span>
        </div>
        {{Math.round(scoreList.greatRate*10000)/100+'%'}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>得分率</span>
        </div>
        {{Math.round(scoreList.getRate*10000)/100 +'%'}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>最高分</span>
        </div>
        {{scoreList.max}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>最低分</span>
        </div>
        {{scoreList.min}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>平均分</span>
        </div>
        {{scoreList.average}}
      </el-card>
      <el-card class="box-card" style="display: inline-block;height: 120px;width: 9%">
        <div slot="header" class="clearfix">
          <span>难度</span>
        </div>
        {{scoreList.diff}}
      </el-card>
    </div>
    <div>
      <div>
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
          :cell-style="{'text-align':'center'}"
          :default-sort = "{prop: 'rank'}"
          highlight-current-row>
          <el-table-column
            label="排名"
            prop="rank"
            sortable
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.rank }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="学号"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.user.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            width="90">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.user.realName }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label=" '成绩'"
            align="center">
            <el-table-column
              :label=" '客观题    满分:' + this.tableData[0].maxNonSynScore"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.nonSynScore }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="score"
              :label=" '主观题    满分:' + this.tableData[0].maxSynScore"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.synScore }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label=" '总分      满分:' +this.tableData[0].maxScore"
              width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.totalScore }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            width="90">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="success" v-if="scope.row.status === 1">正常结束</el-tag>
                <el-tag size="medium" type="warning" v-if="scope.row.status === 0">缺考</el-tag>
                <el-tag size="medium" type="danger" v-if="scope.row.status === -1">疑似作弊</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label=" '监考数据'"
            align="center">
            <el-table-column
              label="切屏次数"
              width="80">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" type="success" >{{ scope.row.cuttingTime }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="切屏时长 /s"
              width="100">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" type="success" >{{ scope.row.totalCuttingTime }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="离开次数"
              width="90">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" type="success" >{{ scope.row.leaveTimes }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="离开时长 /s"
              width="100">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" type="success" >{{ scope.row.undetectedTime }}</el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-data-analysis"
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
      </div>
    </div>
<!--    <pie></pie>-->
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
      scoreData:[
        {getRate: '90%-100%',sCount:0,proportion:0,},
        {getRate: '80%-90%',sCount:0,proportion:0,},
        {getRate: '70%-80%',sCount:0,proportion:0,},
        {getRate: '60%-70%',sCount:0,proportion:0,},
        {getRate: '50%-60%',sCount:0,proportion:0,},
        {getRate: '40%-50%',sCount:0,proportion:0,},
        {getRate: '30%-40%',sCount:0,proportion:0,},
        {getRate: '20%-30%',sCount:0,proportion:0,},
        {getRate: '10%-20%',sCount:0,proportion:0,},
        {getRate: '0%-10%',sCount:0,proportion:0,},
      ],
      scoreList:{
        postNum:0,
        totalNum:0,
        passNum:0,
        passScore:0,
        totalScore:0,
        passRate:0,
        greatRate:0,
        getRate:0,
        max:0,
        min:0,
        average:0,
        diff:0,
      },
      examId: this.$route.query.examId,
      limit:10,
      total:0,
      select: '1',
      input: '',
      tableData:[],
      chartData:[
        { value:0,name:'90%~100%'},
        { value:0,name:'80%~89%'},
        { value:0,name:'70%~79%'},
        { value:0,name:'60%~69%'},
        { value:0,name:'<60%'},
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
    fetchScoreData(){
      request({
        url: '/exam/analysis/segment/' + this.$route.query.examId,
        methods: 'Get',
      }).then(response => {
        console.log(response)
        for(let i=0;i<10;i++){
          this.scoreData[i].sCount = response[i].scount
          this.scoreData[i].proportion = response[i].proportion
        }
      }).catch( err =>{
        console.log(err)
      })
    },
    fetchScoreList(){
      request({
        url: '/exam/analysis/data/' + this.$route.query.examId,
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.scoreList = response
      }).catch( err =>{
        console.log(err)
      })
    },
    getChartData(){
      let v1=0,v2=0,v3=0,v4=0,v5=0
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].totalScore/this.tableData[i].maxScore*100 <60){
          v5 += 1
        }
        else if(this.tableData[i].totalScore/this.tableData[i].maxScore*100 <=69){
          v4 += 1
        }
        else if(this.tableData[i].totalScore/this.tableData[i].maxScore*100 <=79){
          v3 += 1
        }
        else if(this.tableData[i].totalScore/this.tableData[i].maxScore*100 <=89){
          v2 += 1
        }
        else if(this.tableData[i].totalScore/this.tableData[i].maxScore*100 <=100){
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
    this.fetchScoreData()
    this.fetchScoreList()
    console.log(this.scoreData)
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
