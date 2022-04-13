<template>
 <div class="background-container">
   <div class="app-container">
   <div v-if="isExam" style="margin: 10px">

     <h2 class="h2title" style="" ><i class="el-icon-folder"></i>  试题库</h2>
<!--     <span style="font-size:30px;color:#fcb211">试题库</span>-->
   </div>
<!--   <el-divider></el-divider>-->
   <div style="margin: 20px;">
     <div style="margin-bottom: 10px">
       <h4 class="h4title"> 筛选</h4>
       <span>试题内容:</span>
       <el-input
         size="mini"
         v-model="queryForm.stem"
         placeholder="请输入试题内容"
         style="width: 180px;"></el-input>
       <span style="margin-left: 10px">试题类型:</span>
       <el-select size="mini" :disabled="topicType !== undefined" v-model="queryForm.typeId" placeholder="请选择" style="width: 100px">
         <el-option
           v-for="item in optionsType"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
       <span style="margin-left: 10px">试题科目:</span>
       <el-select size="mini" v-model="queryForm.subjectId" placeholder="请选择" style="width: 100px;margin-right: 5px">
         <el-option
           v-for="item in optionsSubject"
           :key="item.id"
           :label="item.subjectName"
           :value="item.id">
         </el-option>
       </el-select>
       <el-button  size="small" @click="fetchData" icon="el-icon-search">查询</el-button>
       <el-button size="small" @click="clear" icon="el-icon-refresh">清除</el-button>
       <div style="float: right;">
<!--         <el-button size="small" @click="isAddByText=true"  >文本增题</el-button>-->
         <el-button size="small" v-if="topicType === undefined" @click="addBySelf"  >新增试题</el-button>
<!--         <el-button size="small" @click="updateAll($refs.multipleTable.selection)" >批量修改</el-button>-->
         <el-button size="small" v-if="topicType === undefined" @click="deleteAll($refs.multipleTable.selection)"  >批量删除</el-button>
         <el-button size="small" @click="$refs.import.$el.click()">导出</el-button>
       </div>
       <br>
       <div style="margin-top: 5px">
         <el-date-picker size="small" type="date" placeholder="选择起始日期" v-model="queryForm.startTime" style="width: 200px;"></el-date-picker>
         <span>   -   </span>
         <el-date-picker size="small" type="date" placeholder="选择截止日期" v-model="queryForm.endTime" style="width: 200px;"></el-date-picker>
         <span style="margin-left: 10px">难度  </span>
         <el-select size="small" v-model="queryForm.difficultyId" placeholder="请选择">
           <el-option
             v-for="item in optionsLevel"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
       <div>
         <el-button @click="debug">test</el-button>
       </div>
     </div>
     <JsonExcel
       :data="form"
       ref="import"
       :fields="jsonFields"
       type="xls"
       header="试题列表"
       name="试题列表.xls"
       style="display: none"
     >
       <template >________</template>
     </JsonExcel>
     <el-table
       :data="form"
       style="width: 100%"
       border
       fit
       highlight-current-row
       ref="multipleTable"
       @selection-change="selectionChange">
       <el-table-column
         type="selection"
         width="55">
       </el-table-column>
       <el-table-column
         label="题目类型"
         width="100">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ mapType[scope.row.typeId] }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="题目内容"
         width="200">
         <template slot-scope="scope">
           <div slot="reference" class="name-wrapper">
             <span v-html="scope.row.stem"></span>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="答案"
         :formatter="getAnswer"
         width="180">
       </el-table-column>
       <el-table-column
         label="难度"
         width="80">
         <template slot-scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag size="medium">{{ mapLevel[scope.row.difficultyId] }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="试题科目"
         :formatter="formatter"
         width="100">
       </el-table-column>
       <el-table-column
         label="创建时间">
         <template slot-scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag size="medium">{{ scope.row.createTime }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         v-if="topicType === undefined"
         label="操作">
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
   </div>

   <div style="margin-top:20px;float: right;">
     <el-pagination
       background
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="queryForm.cp"
       :page-sizes="[5,10,20,50,100]"
       :page-size="queryForm.size"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
     </el-pagination>
   </div>

   <div>
     <el-dialog title="批量修改" :visible.sync="isUpdateAll" width="60%">
       <el-divider></el-divider>
       <div style="margin: 20px">
         <span>试题分类</span>
         <el-select size="medium" v-model="allProject" placeholder="请选择" style="margin-left: 30px;margin-bottom: 20px;">
           <el-option
             v-for="item in optionsSubject"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         <br>
         <span>试题分数</span>
         <el-input size="medium" v-model="allScore" style="margin-bottom: 20px;width: 30%;margin-left: 30px"></el-input>
         <br>
         <span>试题难度</span>
         <el-select size="medium" v-model="allLevel" placeholder="请选择" style="margin-left: 30px">
           <el-option
             v-for="item in optionsLevel"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         <el-row type="flex" justify="end" style="margin: 10px">
           <el-button @click="dialogSubmit($refs.multipleTable.selection)">确定</el-button>
           <el-button @click="isUpdateAll = false">取消</el-button>
         </el-row>
       </div>
     </el-dialog>
   </div>

   <edit-question :isEditQuestion="isEditQuestion"
                  :editStatus="editStatus"
                  :question= "question"
                  :check.sync="check"
                  :fillItems.sync="fillItems"
                  :fillSum.sync="fillSum"
                  @fetchData="fetchData"
                  @editQuestionclose="editQuestionclose"></edit-question>
   <add-by-text :isAddByText="isAddByText" @addByTextclose="isAddByText = false"></add-by-text>
   </div>
 </div>
</template>

<script>
import editQuestion from '@/views/design/component/editQuestion'
import AddByText from '@/views/design/component/addByText'
import JsonExcel from 'vue-json-excel'
import request from '@/utils/request'
export default {
  name: 'bank',
  props:['topicType','bankToExamSubmit'],
  components:{ AddByText,editQuestion,JsonExcel},
  data(){
    return{
      isExam: true,
      check:this.$store.state.check,
      fillItems:this.$store.state.fillItems,
      fillSum:this.$store.state.fillSum,
      editStatus:'',
      startTime:null,
      endTime:null,
      total: 0,
      isUpdateAll:false,
      isAddByBarn:false,
      isEditQuestion:false,
      isAddByText:false,
      allScore:0,
      allLevel:'',
      allProject:'',
      question:{
        id:'',
        stem:'',
        score:0,
        answer:'',
        subjectId:'',
        remark:'',
        typeId:'',
        choice1:'',
        choice2:'',
        choice3:'',
        choice4:'',
        createTime:'',
        updateTime:'',
        difficultyId:'',
      },
      typeValue:'',
      projectValue:'',
      mainValue:'',
      queryForm:{
        id:null,
        stem:'',
        answer:null,
        subjectId:null,
        remark:null,
        typeId:null,
        choice1:null,
        choice2:null,
        choice3:null,
        choice4:null,
        createTime:null,
        updateTime:null,
        difficultyId:null,
        size:10,
        cp:1,
        startTime:null,
        endTime:null,
      },
      form:[
        {
          id:'',
          stem:'',
          score:0,
          answer:'',
          subjectId:'',
          remark:'',
          typeId:'',
          choice1:'',
          choice2:'',
          choice3:'',
          choice4:'',
          createTime:'',
          updateTime:'',
          difficultyId:'',
        }
      ],
      jsonFields: {  //导出Excel表格的表头设置
        '试题内容': 'stem',
        '答案': 'answer',
        '难度': {
          field:'difficultyId',
          callback:value => {
            return this.mapLevel[value]
          }},
        '试题科目': {
          field:'subjectId',
          callback:value => {
            return this.mapProject[value]
          }
        },
        '试题类型': {
          field:'typeId',
          callback:value => {
            return this.mapType[value]
          }
        }
      },
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
    }
  },
  methods:{
    debug(){
      request({
        url: 'exam/paper/'+1+'/addFromBank',
        method: 'post',
        dataType: 'json',
        data: this.$refs.multipleTable.selection ,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        }
      }).then(response => {
        console.log(response)
      }).catch( err =>{
        console.log(err)
      })
    },
    fetchData() {
      request({
        url: '/bank/question/query',
        method: 'Get',
        params:this.queryForm
      }).then(response => {
        console.log(response)
        this.form = response.records
        this.total =response.total
      }).catch( err =>{
        console.log(err)
      })
    },
    selectionChange(){

    },
    dialogSubmit(all){
      for(let i=0;i<all.length;i++){
        if(this.allScore !== 0){
          all[i].score=this.allScore
        }
        if(this.allProject !== ''){
          all[i].project=this.allProject
        }
        if(this.allLevel !== ''){
          all[i].level=this.allLevel
        }
      }
      this.isUpdateAll = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryForm.size = val
      this.queryForm.cp = 1
      console.log(this.limit)
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryForm.cp = val
      this.fetchData()
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
    updateAll(all){
      console.log(all)
      if(all.length !== 0){
        this.isUpdateAll=true
      }
      else{
        //此处将this.$refs.multipleTable.selection这个数组传给后端并请求新的数据
        this.$message.error('请选择批量修改的题目');
      }
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
    toFile(){
    },
    handleEdit(row){
      console.log(row)
      if(row.typeId===1){
        row.answer = parseInt(row.answer)
      }
      if(row.typeId === 2){
        row.answer = row.answer.toString()
        row.answer = row.answer.split(",")
        row.answer = row.answer.map(Number)
        this.check = row.answer
      }
      if(row.typeId===3){
        row.answer = parseInt(row.answer)
      }
      if(row.typeId===4){
        row.answer = row.answer.split('|')
        this.fillSum = row.answer.length
        for(let i=0;i<row.answer.length;i++){
          this.fillItems[i].input=row.answer[i]
        }
        this.$store.commit('updateFillSum',this.fillSum)
        this.$store.commit('updateFillItems',this.fillItems)
        console.log(row.answer)
      }
      this.question = row
      this.isEditQuestion=true
      this.editStatus='edit'
      this.formatter(row)
    },
    addBySelf(){
      this.question={}
      this.check = []
      this.fillSum = 1
      this.fillItems = [
        {id:1,input:'',},
        {id:2,input:'',},
        {id:3,input:'',},
        {id:4,input:'',},
        {id:5,input:'',},
        {id:6,input:'',},
        {id:7,input:'',},
        {id:8,input:'',},
        {id:9,input:'',},
        {id:10,input:'',},]
      this.$store.commit('updateFillSum',this.fillSum)
      this.$store.commit('updateFillItems',this.fillItems)
      this.editStatus='create'
      this.$nextTick()
      this.isEditQuestion=true
    },
    clear(){
      this.queryForm={
        stem:''
      }
      this.fetchData()
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
    formatter(row){
      for(let i=0;i<this.optionsSubject.length;i++){
        if(this.optionsSubject[i].id===row.subjectId){
          return this.optionsSubject[i].subjectName
        }
      }
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
        return row.answer.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
      }
    },
    editQuestionclose(){
      this.isEditQuestion = false
      this.fetchData()
    },
    bankToExam() {
      this.$emit("bankToExamSubmit",this.$refs.multipleTable.selection)
    }
  },
  beforeMount() {
    this.fetchData()
    this.fetchMapSubject()
    this.queryForm.typeId = this.topicType
    console.log(this.$store.state.fillItems)
    console.log(this.fillItems)
    console.log(this)
  },
  updated() {
    console.log(this.$refs.multipleTable.selection)
  }
}
</script>

<style>
p {
  margin: 0;
}
JsonExcel{
  margin: 0;
}
</style>
