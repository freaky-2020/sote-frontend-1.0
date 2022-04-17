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
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        border
        fit
        highlight-current-row
        v-if="this.radio !==3"
        ref="multipleTable">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="修改人编号"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.requestUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目内容"
          width="160">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{getLittleStem(scope.row.stem)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="题目类型"
          width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{mapType[scope.row.typeId]}}</span>
            </div>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          label="难度"-->
<!--          width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <div slot="reference" class="name-wrapper">-->
<!--              <span>{{mapLevel[scope.row.difficultyId]}}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          label="答案"
          width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{getAnswer(scope.row)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="试题科目"
          width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{formatter(scope.row)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="修改时间">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.requireTime }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="viewIt(scope.row,1)">查看</el-button>
            <el-button
              size="mini"
              type="success"
              @click="pass(scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="disPass(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="newTable.slice((page-1)*limit, page*limit)"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        fit
        highlight-current-row
        v-if="this.radio ===3"
        ref="multipleTable">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="修改人编号"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.after.requestUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目内容"
          width="160">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{getLittleStem(scope.row.before.stem)}}</span>
              <br>
              <span style="color: red">{{getLittleStem(scope.row.after.stem)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="题目类型"
          width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{mapType[scope.row.before.typeId]}}</span>
              <br>
              <span style="color: red">{{mapType[scope.row.after.typeId]}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="答案"
          width="100">
          <template slot-scope="scope">
            <span>{{getAnswer(scope.row.before)}}</span>
            <br>
            <span style="color: red">{{getAnswer(scope.row.after)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="试题科目"
          width="100">
          <template slot-scope="scope">
            <span>{{formatter(scope.row.before)}}</span>
            <br>
            <span style="color: red">{{formatter(scope.row.after)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="修改时间">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.after.requireTime }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="viewIt(scope.row,2)">查看</el-button>
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
        <el-dialog  title="具体审批" :visible.sync="isDisplay" top="100px" width="90%">
          <el-scrollbar style="height: 400px" wrap-style="overflow-x:hidden;">
            <Display style="height: 400px"  :questionData="questionData" :val="val"></Display>
          </el-scrollbar>
          <el-footer style="text-align: center;height: 30px" class="dialog-footer">
            <div style="margin-top: 10px">
              <el-button type="primary"  @click="pass(questionData)">通过</el-button>
              <el-button type="danger"  @click="disPass(questionData)">驳回</el-button></div>
          </el-footer>
        </el-dialog>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import Display from '@/views/judge/components/Display'
export default {
  name: 'judge',
  components:{Display},
  data(){
    return{
      total: 0,
      page: 1,
      limit: 10,
      radio: 1,
      isDisplay:false,
      questionData:[],
      val:0,
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
      updateData:[],
      addData:[],
      deleteData:[],
    }
  },
  methods:{
    fetchAll(){
      this.fetchAddData()
      this.fetchDeleteData()
      this.fetchUpdateData()
    },
    fetchAddData() {
      request({
        url: '/bank/required/getRequire/add',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.addData = response
      }).catch( err =>{
        console.log(err)
      })
    },
    fetchDeleteData() {
      request({
        url: '/bank/required/getRequire/delete',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        this.deleteData = response
      }).catch( err =>{
        console.log(err)
      })
    },
    fetchUpdateData() {
      request({
        url: '/bank/required/getRequire/update',
        methods: 'Get',
      }).then(response => {
        console.log(response)
        for(let i=0;i<response.length;i++){
          if(response[i].before === null){
            response[i].before= {
              stem: '本题目在题库中已被删除',
              answer:'',
            }
          }
        }
        this.updateData = response
      }).catch( err =>{
        console.log(err)
      })
    },
    deleteAll(all){
      if(all.length !== 0){
        let ids = ''
        for(let i=0;i<all.length;i++){
          ids= ids + all[i].id
          if(i !== all.length-1){
            ids= ids  + ','
          }
        }
        console.log(ids)
        this.$confirm('此操作将删除所选所有题目，确定吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: '/bank/question/delete',
            method: 'Delete',
            params: {ids}
          }).then(response => {
            console.log(response)
          }).catch( err =>{
            console.log(err)
          })
          for(let i=0;i<all.length;i++){
            this.form = this.form.filter((d) => {
              return d !== all[i]
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }
      else{
        //此处将this.$refs.multipleTable.selection这个数组传给后端并请求新的数据
        this.$message.error('请选择批量删除的题目');
      }
    },
    handleDelete(row){
      this.$confirm('此操作将删除所选题目，确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/bank/question/delete/'+row.id,
          method: 'Delete',
        }).then(response => {
          console.log(response)
        }).catch( err =>{
          console.log(err)
        })
        this.form = this.form.filter((q) => {
          return q !== row
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    pass(row){
      if(row.doWay===1){
        row.decision = 1
        request({
          url: '/bank/required/judge/add',
          method: 'Get',
          params:row
        }).then(response => {
          this.$message({
            type: 'info',
            message: response
          });
          this.fetchAddData()
        }).catch( err =>{
          console.log(err)
        })
      }
      if(row.after !== undefined){
        let rows = []
        rows[0] = row.after
        request({
          url: '/bank/required/judge/update/' +1,
          method: 'Post',
          data: rows,
        }).then(response => {
          this.$message({
            type: 'success',
            message: response
          });
          this.fetchUpdateData()
        }).catch(err => {
          console.log(err)
        })
      }
      else if(row.doWay===3) {
        row.decision = 1
        request({
          url: '/bank/required/judge/delete',
          method: 'Get',
          params: row,
        }).then(response => {
          this.$message({
            type: 'success',
            message: response
          });
          this.fetchAll()
        }).catch(err => {
          console.log(err)
        })
      }
      this.isDisplay =false
    },
    disPass(row){
      if(row.doWay===1){
        row.decision = 0
        request({
          url: '/bank/required/judge/add',
          methods: 'Get',
          params:row
        }).then(response => {
          this.$message({
            type: 'info',
            message: response
          });
          this.fetchAddData()
        }).catch( err =>{
          console.log(err)
        })
      }
      if(row.after !== undefined){
        let rows = []
        rows[0] = row.after
        request({
          url: '/bank/required/judge/update/' +0,
          method: 'Post',
          data: rows,
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          }
        }).then(response => {
          this.$message({
            type: 'info',
            message: response
          });
          this.fetchUpdateData()
        }).catch(err => {
          console.log(err)
        })
      }
      else if(row.doWay===3) {
        row.decision = 0
        request({
          url: '/bank/required/judge/delete',
          methods: 'Get',
          params: row
        }).then(response => {
          this.$message({
            type: 'success',
            message: response
          });
          this.fetchDeleteData()
        }).catch(err => {
          console.log(err)
        })
      }
      this.isDisplay = false
    },
    getLittleStem(stem){
      stem = stem.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
      if(stem === undefined){
        return ''
      }
      else if (stem.length > 14) {
        //最长固定显示4个字符
        return stem.slice(0, 14) + "...";
      }
      return stem
    },
    allPass(){
      if(confirm('确定通过全部选中申请吗')){

      }
    },
    allDisPass(){

    },
    getAnswer(row){
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
        row.answer = row.answer.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
        if (row.answer.length > 10) {
          //最长固定显示4个字符
          return row.answer.slice(0, 10) + "...";
        }
      }
    },
    formatter(row){
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
    viewIt(item,val){
      this.questionData = item
      this.val = val
      this.isDisplay = true
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
      if(this.radio === 1){
        this.total =this.addData.length
        return this.addData
      }
      if(this.radio === 2){
        this.total =this.deleteData.length
        return this.deleteData
      }
      if(this.radio === 3){
        this.total =this.updateData.length
        return this.updateData
      }
    },
  },
  mounted() {
    this.fetchAll()
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
