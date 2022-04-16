<template>
  <div class="background-container">
    <div class="app-container">
    <div style="margin: 10px">
      <h3 class="h3title">
      <i class="el-icon-s-check"></i>
      <span >题库审批</span>
      </h3>
    </div>
<!--    <el-divider></el-divider>-->
    <div style="margin: 20px;">
      <el-radio-group v-model="radio">
        <el-radio :label="1">增加操作</el-radio>
        <el-radio :label="2">删除操作</el-radio>
        <el-radio :label="3">修改操作</el-radio>
      </el-radio-group>
      <div style="float: right;margin-bottom: 10px">
        <el-button type="primary" size="medium" @click="allPass">批量通过</el-button>
        <el-button type="danger" size="medium" @click="allDisPass">批量驳回</el-button>
      </div>
      <el-table
        :data="newTable.slice((page-1)*limit, page*limit)"
        style="width: 100%"
        border
        fit
        highlight-current-row
        ref="multipleTable">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="修改人编号"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目内容"
          min-width="45%">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-html="scope.row.question.stem"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="答案"
          :formatter="getAnswer"
          min-width="30">
        </el-table-column>
        <el-table-column
          label="试题科目"
          :formatter="formatter"
          width="170">
        </el-table-column>
        <el-table-column
          label="修改时间"
          min-width="25%">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.updateTime }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="240px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="viewIt(scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="pass(scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="disPass(scope.row)">驳回</el-button>
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

      <div>
        <el-dialog  title="题库导题" :visible.sync="isDisplay" top="100px"  width="90%">
          <el-scrollbar style="height: 400px" wrap-style="overflow-x:hidden;">
            <display ></display>>
          </el-scrollbar>
          <el-footer style="text-align: center;height: 20px" class="dialog-footer">
            <el-button type="primary" size="small" @click="pass">通过</el-button>
            <el-button type="info" size="small" @click="disPass">驳回</el-button>
          </el-footer>
        </el-dialog>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import display from '@/views/display/display'
export default {
  name: 'judge',
  components:{display},

  data(){
    return{
      total: 0,
      page: 1,
      limit: 10,
      radio: 1,
      mapLevel: {
        1: '简单',
        2: '适中',
        3: '困难',
        4: '压轴'
      },
      mapAnswer: {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        ',':''
      },
      mapProject: {},
      mapType:{
        1: '单选题',
        2: '多选题',
        3: '判断题',
        4: '填空题',
        5: '综合题'
      },
      optionsType: [{
        value: 1,
        label: '单选题'
      }, {
        value: 2,
        label: '多选题'
      }, {
        value: 3,
        label: '判断题'
      }, {
        value: 4,
        label: '填空题'
      }, {
        value: 5,
        label: '综合题'
      }],
      optionsSubject:[
      ],
      optionsLevel:[
        {
          value: 1,
          label: '简单'
        },{
          value: 2,
          label: '适中'
        }, {
          value: 3,
          label: '较难'
        }, {
          value: 4,
          label: '压轴'
        }
      ],
      updateItems:[
        {
          updateType:1,
          userName:'3',
          question:{
            answer: "2",
            bankId: 1,
            choice1: "2",
            choice2: "2x",
            choice3: "0dd",
            choice4: "∞",
            difficultyId: 1,
            id: 1,
            makerId: 3,
            paperId: 1,
            quesNo: 1,
            remark: "",
            score: 10,
            stem: "<p>y=x^2+1关于x的导数为？</p>",
            subjectId: 1,
            typeId: 1
          },
          updateTime:'123124',
        },
        {
          updateType:2,
          userName:'2',
          question:{
            answer: "2",
            bankId: 1,
            choice1: "2",
            choice2: "2x",
            choice3: "0dd",
            choice4: "∞",
            difficultyId: 1,
            id: 1,
            makerId: 3,
            paperId: 1,
            quesNo: 1,
            remark: "",
            score: 10,
            stem: "<p>y=x^2+1关于x的导数为？</p>",
            subjectId: 1,
            typeId: 1
          },
          updateTime:'4124124',
        },
        {
          updateType:3,
          userName:'1',
          question:{
            answer: "2",
            bankId: 1,
            choice1: "2",
            choice2: "2x",
            choice3: "0dd",
            choice4: "∞",
            difficultyId: 1,
            id: 1,
            makerId: 3,
            paperId: 1,
            quesNo: 1,
            remark: "",
            score: 10,
            stem: "<p>y=x^2+1关于x的导数为？</p>",
            subjectId: 1,
            typeId: 1
          },
          updateTime:'124124',
        }
      ]
    }
  },
  methods:{
    fetchData() {
      request({
        url: '/bank/judge/get',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.tableData = response
        console.log(this.tableData)
      }).catch( err =>{
        console.log(err)
      })
    },
    pass(){
      request({
        url: '/bank/judge/pass',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.tableData = response
        console.log(this.tableData)
      }).catch( err =>{
        console.log(err)
      })
    },
    disPass(){

    },
    allPass(){

    },
    allDisPass(){

    },
    getAnswer(rows){
      let row =rows.question
      if(row.typeId===1){
        return this.mapAnswer[row.answer]
      }
      else if(row.typeId===2){
        let newAnswer = ''
        for(let i=0;i<row.answer.length;i++){
          newAnswer=`${newAnswer}${this.mapAnswer[row.answer[i]]}`
        }
        return newAnswer
      }
      else if(row.typeId === 3){
        if(row.answer === "1"){
          return '正确'
        }
        else return '错误'
      }
      else if(row.typeId === 4){
        return row.answer
      }
      else{
        return row.answer.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
      }
    },
    formatter(rows){
      let row =rows.question
      for(let i=0;i<this.optionsSubject.length;i++){
        if(this.optionsSubject[i].id===row.subjectId){
          return this.optionsSubject[i].subjectName
        }
      }
    },
    fetchMapSubject(){
      request({
        url: '/bank/subject',
        methods: 'Get',
      }).then(response => {
        this.optionsSubject =response
      }).catch( err =>{
        console.log(err)
      })
    },
    viewIt(){

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
    newTable() {
      return this.updateItems.filter((u) => {
        return u.updateType === this.radio
      })
    },
  },
  mounted() {
    this.fetchMapSubject()
  }
}
</script>

<style scoped>
.h3title{
  color: #00509d;
//background-color: lightgrey;
  height: 40px;
  border-bottom: 1px solid lightgrey;
}
</style>
