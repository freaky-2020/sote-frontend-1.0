<template>
  <div class="background-container">
    <div v-if="isExam" style="margin: 10px" class="app-container">

      <h3  class="pagetitle" ><i class="el-icon-folder"></i> 试题库</h3>

      <div style="margin: 20px;">
        <div class="select-container" >
          <div class="select-item">
            <!--            <span>试题类型:</span>-->
            <el-select  :disabled="topicType !== undefined" v-model="queryForm.typeId" placeholder="请选择类型" style="">
              <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-item" >
<!--            <span>科目:</span>-->
            <el-select  v-model="queryForm.subjectId" placeholder="请选择科目" style="">
              <el-option
                v-for="item in optionsSubject"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="select-item">
            <span style="margin-left: 10px"></span>
            <el-select  v-model="queryForm.difficultyId" placeholder="请选择难度">
              <el-option
                v-for="item in optionsLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-item">
            <!--          <span>试题内容:</span>-->
            <el-input
              v-model="queryForm.stem"
              placeholder="请输入试题内容"
              style=""></el-input>
          </div>
<!--          <div style="float: right;">-->
<!--            &lt;!&ndash;         <el-button size="medium" @click="isAddByText=true"  >文本增题</el-button>&ndash;&gt;-->
<!--            <el-button size="medium" v-if="topicType === undefined" @click="addBySelf"  >新增试题</el-button>-->
<!--            &lt;!&ndash;         <el-button size="medium" @click="updateAll($refs.multipleTable.selection)" >批量修改</el-button>&ndash;&gt;-->
<!--            <el-button size="medium" v-if="topicType === undefined" @click="deleteAll($refs.multipleTable.selection)"  >批量删除</el-button>-->
<!--            <el-button size="medium" @click="$refs.import.$el.click()">导出</el-button>-->
<!--          </div>-->
          <br>
          <div class="select-item" >
            <el-date-picker  type="date" placeholder="选择起始日期" v-model="queryForm.startTime" style="width: 200px;"></el-date-picker>
          </div>
          <div class="select-item" >
<!--            <span>   -   </span>-->
            <el-date-picker  type="date" placeholder="选择截止日期" v-model="queryForm.endTime" style="width: 200px;"></el-date-picker>
          </div>
          <div style="float: right; margin:10px 0 15px 0" >
            <el-button  size="medium" @click="fetchData" icon="el-icon-search"
                        type="info">查询</el-button>
            <el-button size="medium" @click="clear" icon="el-icon-refresh"
            >清除</el-button>
          </div>        </div>
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
            width="40px">
          </el-table-column>
          <el-table-column
            label="题目类型"
            width="95">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ mapType[scope.row.typeId] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="题目内容"
            min-width="45%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span v-html="scope.row.stem"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="答案"
            :formatter="getAnswer"
            min-width="25%">
          </el-table-column>
          <el-table-column
            label="难度"
            width="75px">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ mapLevel[scope.row.difficultyId] }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="试题科目"
            :formatter="formatter"
            min-width="20%">
          </el-table-column>
          <el-table-column
            width="105px"
            label="创建时间">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.createTime }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="topicType === undefined"
            width="150px"
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

    </div>

    <div style="z-index: auto;position: absolute; top:20%;left: 90%">
      <div style="position:fixed">
        <!--         <el-button size="medium" @click="isAddByText=true"  >文本增题</el-button>-->
        <el-tooltip  v-if="topicType === undefined" class="item" effect="light" content="创建试题" placement="right-end">
          <el-button v-if="topicType === undefined" @click="addBySelf"
                     type="primary" icon="el-icon-plus" circle></el-button>
        </el-tooltip>      <br/><br />
        <el-tooltip  v-if="topicType === undefined" class="item" effect="light" content="批量删除" placement="right-end">
          <el-button  v-if="topicType === undefined" @click="deleteAll($refs.multipleTable.selection)"
                      type="danger" icon="el-icon-delete" circle></el-button>
        </el-tooltip>      <br/><br />
        <el-tooltip  v-if="topicType === undefined" class="item" effect="light" content="导出题库" placement="right-end">
          <el-button @click="$refs.import.$el.click()"
                     type=info icon="el-icon-paperclip" circle></el-button>
        </el-tooltip>
      </div>
    </div>

    <el-divider></el-divider>




    <div >
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
        this.$store.commit('updateCheck', row.answer);
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

<style lang="scss" scoped>
p {
  margin: 0;
}
JsonExcel{
  margin: 0;
}
.select-item{
  width: 25%;
  margin:10px 0 10px 0;
  display:inline-block;

  el-select {
    //width: 80%;
  }
  el-input{
    //width: 85%;
  }

}
.pagetitle{
  color:#00509d;
  height: 40px;
  font-size: 20px;
  border-bottom: 1px solid lightgrey;
}
</style>
