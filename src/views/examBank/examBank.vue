<template>
  <div class="background-container">
    <div v-if="isExam" style="margin: 10px" class="app-container">

      <h3  class="pagetitle" ><i class="el-icon-folder"></i> 试卷库</h3>

      <div style="margin: 10px;">
        <div class="select-container" >
          <div class="select-item">
            <el-select   v-model="queryForm.leftDiff" placeholder="请选择难度下限" style="">
              <el-option
                v-for="item in oldOptionsDiff"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-item">
            <el-select   v-model="queryForm.rightDiff" placeholder="请选择难度上限" style="">
              <el-option
                v-for="item in newOptionsType"
                :key="item"
                :label="item"
                :value="item">
               </el-option>
            </el-select>
          </div>
          <div class="select-item" >
            <!--            <span>科目:</span>-->
            <el-select :disabled="subjectId!==undefined" v-model="queryForm.subjectId" placeholder="请选择科目" style="">
              <el-option
                v-for="item in optionsSubject"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="select-item">
            <!--          <span>试题内容:</span>-->
            <el-input
              v-model="queryForm.paperName"
              placeholder="请输入试卷名"
              style=""></el-input>
          </div>
          <br>
          <div class="select-item" >
            <el-date-picker  type="date" placeholder="选择起始日期" v-model="queryForm.startTime" style="width: 200px;"></el-date-picker>
          </div>
          <div class="select-item" >
            <el-date-picker  type="date" placeholder="选择截止日期" v-model="queryForm.endTime" style="width: 200px;"></el-date-picker>
          </div>
          <div style="float: right; margin:10px 0 15px 0" >
            <el-button  size="medium" @click="fetchExamData" icon="el-icon-search"
                        type="info">查询</el-button>
            <el-button size="medium" @click="clear" icon="el-icon-refresh">清除</el-button>
            <el-button @click="$refs.import.$el.click()"
                       size="medium" type=success icon="el-icon-paperclip">导出</el-button>
          </div>
        </div>
        <JsonExcel
          :data="form.slice((page-1)*limit, page*limit)"
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
          :data="form.slice((page-1)*limit, page*limit)"
          style="width: 100%"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
          ref="tb">
          <el-table-column v-if="isCopy !==undefined" type="selection" width="55" align="center" />
          <el-table-column
            label="试卷科目"
            :formatter="formatter"
            width="150">
          </el-table-column>
          <el-table-column
            label="试卷名称"
            width="150">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span v-html="scope.row.paperName"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="难度系数"
            width="100px">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.difficulty }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="公布时间">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.publicTime }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="引用次数">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.copiedTime }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="topicType === undefined"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="toPreview(scope.row)">详细查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px;float: right;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5,10,20,50,100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import editQuestion from '@/views/design/component/editQuestion'
import AddByText from '@/views/design/component/addByText'
import JsonExcel from 'vue-json-excel'
import request from '@/utils/request'
export default {
  name: 'bank',
  props:['topicType','bankToExamSubmit','subjectId','isCopy','copyPaper'],
  components:{ AddByText,editQuestion,JsonExcel},
  data(){
    return{
      selection:undefined,
      total: 0,
      page: 1,
      limit: 10,
      isExam: true,
      startTime:null,
      endTime:null,
      typeValue:'',
      projectValue:'',
      mainValue:'',
      queryForm:{
        endTime:null,
        leftDiff:null,
        paperName:null,
        rightDiff:null,
        startTime:null,
        subjectId:null,
      },
      form:[
        {
          publicTime:'',
          paperName:'',
          subjectId:'',
          paperId:0,
          copiedTime:0,
          difficulty:'',
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
      oldOptionsDiff:[{
        value: 1,
      }, {
        value: 2,
      }, {
        value: 3,
      }, {
        value: 4,
      }, {
        value: 5,
      }, {
        value: 6,
      }, {
        value: 7,
      }, {
        value: 8,
      }, {
        value: 9,
      }, {
        value: 10,
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
    handleSelectionChange(selection){
      this.selection = selection[0];
      console.log(this.selection)
      if (selection.length > 1) {
        this.$refs.tb.clearSelection();
        this.$refs.tb.toggleRowSelection(selection.pop());
      }
    },
    fetchExamData() {
      request({
        url: '/exam/paper/paperBank',
        method: 'Get',
        params: this.queryForm
      }).then(response => {
        console.log(response)
        this.form = response
        this.total =response.length
      }).catch( err =>{
        console.log(err)
      })
    },
    selectionChange(){

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
    clear(){
      this.queryForm={
        stem:''
      }
      this.fetchExamData()
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
    toPreview(row){
      this.$emit("viewDetails",row.paperId)
    },
    copy() {
      this.$emit("copyPaper",this.selection.paperId)
    }
  },
  computed:{
    newOptionsType(){
      let optionsDiff = []
      for(let i=1;i<=10;i++){
        if(this.queryForm.leftDiff<=i){
          optionsDiff.push(i)
        }
      }
      return optionsDiff
    }
  },
  beforeMount() {
    this.fetchMapSubject()
    this.fetchExamData()
    this.queryForm.subjectId =this.subjectId
  },
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
//.pagetitle{
//  color:#00509d;
//  height: 40px;
//  font-size: 20px;
//  border-bottom: 1px solid lightgrey;
//}
</style>
