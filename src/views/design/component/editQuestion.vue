<template>
  <div>
    <el-dialog :title="editStatus ==='edit'?'编辑试题':'创建试题'" :visible.sync="isEditQuestion"
               :before-close="dialogClose" top="50px" width=80%>
      <div style="border: solid 1px #f4f4f5">
        <el-scrollbar style="height: 500px" wrap-style="overflow-x:hidden;">
          <div>
            <el-form :inline="true" ref="form"  :model="editQuestion">
              <el-form-item label="试题类型" prop="typeId" style="margin-top: 10px;margin-left: 10px">
                <el-select :disabled="editQuestion.createTime !== undefined || topicType !==undefined" size="medium" v-model="editQuestion.typeId" placeholder="请选择">
                  <el-option
                    v-for="item in optionsType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试题科目" prop="subjectId" style="margin-top: 10px;margin-left: 75px">
                <el-select size="medium" :disabled="editQuestion.createTime !== undefined" v-model="editQuestion.subjectId" placeholder="请选择">
                  <el-option
                    v-for="item in optionsSubject"
                    :key="item.id"
                    :label="item.subjectName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <br>
<!--              <el-form-item style="margin-left: 10px" label="分数" prop="score">-->
<!--                <el-input-->
<!--                  size="small"-->
<!--                  style="width: 200px;" v-model="editQuestion.score"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item  style="margin-left: 10px" label="难度" prop="difficultyId">
                <el-select size="medium" v-model="editQuestion.difficultyId" placeholder="请选择">
                  <el-option
                    v-for="item in optionsLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item  style="margin-right: 10px;margin-left: 10px" label="试题内容" prop="difficultyId">
                <el-row type="flex">
                  <editor-wang justify="end" v-model="editQuestion.stem"></editor-wang>
                </el-row>
              </el-form-item>

<!--              这一部分对于不同试题类型进行不同的设定方式-->
              <div>
                <div v-if="editQuestion.typeId === 1">
<!--                  <div v-for="(item)  in  radioItems.slice(0 , radioSum)" :key="item.id" style="margin-top: 5px">-->
<!--                    <el-radio style="margin-left: 12px" v-model="editQuestion.answer" :label="item.id">{{item.value}}</el-radio>-->
<!--                    <el-input size="medium" style="width: 80%" v-model="computedChoice(item.id)"></el-input>-->
<!--                  </div>-->
<!--                  <el-row type="flex" justify="center" style="margin: 5px">-->
<!--                    <el-button size="mini" @click="radioSum++">增加选项</el-button>-->
<!--                    <el-button size="mini" @click="radioSum&#45;&#45;">删除选项</el-button>-->
<!--                    <el-button size="mini" @click="showIt">删除选项</el-button>-->
<!--                  </el-row>-->
                  <div>
                    <el-radio-group v-model="editQuestion.answer" >
                      <el-radio style="margin-left: 12px;margin-top: 5px" :label="1">A</el-radio>
                      <el-input size="medium" style="width: 90%;margin-top: 5px" v-model="editQuestion.choice1"></el-input>
                      <el-radio style="margin-left: 12px;margin-top: 5px"  :label="2">B</el-radio>
                      <el-input size="medium" style="width: 90%;margin-top: 5px" v-model="editQuestion.choice2"></el-input>
                      <el-radio style="margin-left: 12px;margin-top: 5px"  :label="3">C</el-radio>
                      <el-input size="medium" style="width: 90%;margin-top: 5px" v-model="editQuestion.choice3"></el-input>
                      <el-radio style="margin-left: 12px;margin-top: 5px"  :label="4">D</el-radio>
                      <el-input size="medium" style="width: 90%;margin-top: 5px" v-model="editQuestion.choice4"></el-input>
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="editQuestion.typeId === 2">
<!--                  <div v-for="(item)  in  checkboxItems.slice(0 , checkboxSum)" :key="item.id" style="margin-top: 5px">-->
<!--                    <el-checkbox style="margin-left: 12px;margin-right: 30px" v-model="item.id" :label="item.value" ></el-checkbox>-->
<!--                    <el-input size="medium" style="width: 80%" v-model="item.input"></el-input>-->
<!--                  </div>-->
<!--                  <el-row type="flex" justify="center" style="margin: 5px">-->
<!--                    <el-button size="mini" @click="checkboxSum++">增加选项</el-button>-->
<!--                    <el-button size="mini" @click="checkboxSum--">删除选项</el-button>-->
<!--                  </el-row>-->
                  <el-checkbox-group v-model="copyCheck" @change="updateCheck($event)">
                    <div  style="margin-top: 5px">
                      <el-checkbox style="margin-left: 12px;margin-right: 30px" :label="1" >A</el-checkbox>
                      <el-input size="medium" style="width: 80%" v-model="editQuestion.choice1"></el-input>
                    </div>
                    <div  style="margin-top: 5px">
                      <el-checkbox style="margin-left: 12px;margin-right: 30px" :label="2" >B</el-checkbox>
                      <el-input size="medium" style="width: 80%" v-model="editQuestion.choice2"></el-input>
                    </div>
                    <div  style="margin-top: 5px">
                      <el-checkbox style="margin-left: 12px;margin-right: 30px" :label="3" >C</el-checkbox>
                      <el-input size="medium" style="width: 80%" v-model="editQuestion.choice3"></el-input>
                    </div>
                    <div  style="margin-top: 5px">
                      <el-checkbox style="margin-left: 12px;margin-right: 30px" :label="4" >D</el-checkbox>
                      <el-input size="medium" style="width: 80%" v-model="editQuestion.choice4"></el-input>
                    </div>
                  </el-checkbox-group>
                </div>

                <div v-if="editQuestion.typeId === 3" style="margin: 10px">
                  <span>选项</span>
                  <el-radio-group v-model="editQuestion.answer" style="margin-left: 40px">
                    <el-radio :label="1">正确</el-radio>
                    <el-radio :label="2">错误</el-radio>
                  </el-radio-group>
                </div>

                <div v-if="editQuestion.typeId === 4" style="margin-top: 10px;margin-left: 75px">
                  <div v-for="(item)  in  copyFillItems.slice(0 , copyFillSum)" :key="item.id" style="margin-top: 5px">
                    <el-input style="width: 80%" placeholder="请输入内容" @change="updateFill(copyFillItems)" v-model="item.input">
                      <template slot="prepend">答案{{ item.id }}</template>
                    </el-input>
                  </div>
                  <el-row type="flex" justify="center" style="margin: 5px">
                    <el-button size="mini" @click="copyFillSum++">增加选项</el-button>
                    <el-button size="mini" @click="copyFillSum--">删除选项</el-button>
                  </el-row>
                </div>

                <div v-if="editQuestion.typeId === 5">
                  <el-row type="flex" style="margin-top: 10px">
                    <span style="margin-right: 10px;margin-left: 10px">试题答案</span>
                    <editor-wang justify="end" v-model="editQuestion.answer"></editor-wang>
                  </el-row>
                </div>
              </div>

              <el-form-item  style="margin-right: 10px;margin-left: 10px" label="试题解析" prop="difficultyId">
                <el-row type="flex" style="margin-top: 10px">
                  <editor-wang justify="end" v-model="editQuestion.remark"></editor-wang>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <el-row type="flex" justify="end" style="margin-top: 5px">
        <el-button @click="editStatus ==='edit'? editSubmit(form):createSubmit(form)">确定</el-button>
        <el-button @click="dialogClose">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import editorWang from './wangEditor'
import everyQuestion from '@/views/design/component/everyQuestion'
import request from '@/utils/request'
import axios from 'axios'
export default {
  name: 'editQuestion',
  props:[
    'isEditQuestion',
    'question',
    'editStatus',
    'fetchData',
    'check',
    'fillSum',
    'fillItems',
    'topicType',
  ],
  components:{editorWang,everyQuestion},
  data(){
    return{
      copyCheck: this.check,
      copyFillSum: this.$store.state.fillSum,
      copyFillItems: this.$store.state.fillItems,
      isClear:false,
      detail:'',
      currentPage: 4,
      editQuestion:{
      },
      form:[
      ],
      rules:[],
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
        },
      ],
      optionsLevel:[
        {
          value: 1,
          label: '简单'
        }, {
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
      optionsSubject:[],
      valueType:'',
      valueLevel:'',
      score:0,
      //此后为everyQuestion所需数据
      radioItems:[
        {id:1,value:'A',input:'',},
        {id:2,value:'B',input:'',},
        {id:3,value:'C',input:'',},
        {id:4,value:'D',input:'',},
        {id:5,value:'E',input:'',},
        {id:6,value:'F',input:'',},
        {id:7,value:'G',input:'',},
        {id:8,value:'H',input:'',},
        {id:9,value:'I',input:'',},
        {id:10,value:'J',input:'',},
        {id:11,value:'K',input:'',},
        {id:12,value:'L',input:'',},
        {id:13,value:'M',input:'',},
        {id:14,value:'N',input:'',},
        {id:15,value:'O',input:'',},
        {id:16,value:'P',input:'',},
      ],
      radioValue:'',
      radioSum:4,
      checkboxValue:'',
      checkboxSum:4,
      checkboxItems:[
        {id:1,value:'A',input:'',},
        {id:2,value:'B',input:'',},
        {id:3,value:'C',input:'',},
        {id:4,value:'D',input:'',},
        {id:5,value:'E',input:'',},
        {id:6,value:'F',input:'',},
        {id:7,value:'G',input:'',},
        {id:8,value:'H',input:'',},
        {id:9,value:'I',input:'',},
        {id:10,value:'J',input:'',},
        {id:11,value:'K',input:'',},
        {id:12,value:'L',input:'',},
        {id:13,value:'M',input:'',},
        {id:14,value:'N',input:'',},
        {id:15,value:'O',input:'',},
        {id:16,value:'P',input:'',},
      ],
      judgeRadio:'',
    }
  },
  methods:{
    dialogClose(){
      this.$emit("editQuestionclose")
    },
    selectionChange(){

    },
    editSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.question.createTime=null
          this.question.updateTime=null
          if(this.editQuestion.typeId===4){
            this.updateFill(this.copyFillItems)
          }
          axios({
            url: 'api/bank/question/update',
            method: 'put',
            params:this.question,
          }).then(response => {
            console.log(response)
          }).catch( err =>{
            console.log(err)
          })
          this.$emit("editQuestionclose")
          this.$emit("fetchData")
          this.dialogFormVisible = false
        } else {
          alert('请按照添加规则添加用户');
          return false;
        }
      })
    },
    createSubmit(){
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
          if(this.editQuestion.typeId===4){
            this.updateFill(this.copyFillItems)
          }
          axios({
            url: 'api/bank/question/add',
            method: 'post',
            params:this.editQuestion,
          }).then(response => {
            console.log(response)
          }).catch( err =>{
            console.log(err)
          })
          this.$emit("editQuestionclose")
          this.$emit("fetchData")
          this.dialogFormVisible = false
      //   } else {
      //     alert('请按照添加规则添加用户');
      //     return false;
      //   }
      // })
    },
    fetchMapSubject(){
      request({
        url: 'api/bank/subject',
        methods: 'Get',
      }).then(response => {
        this.optionsSubject = response
      }).catch( err =>{
        console.log(err)
      })
    },
    showIt(){
      console.log(this.check)
    },
    updateCheck(e){
      console.log(e)
      let ids = ''
      for(let i=0;i<e.length;i++){
        ids= ids + e[i]
        if(i !== e.length-1){
          ids= ids  + ','
        }
      }
      this.editQuestion.answer = ids
    },
    updateFill(e){
      let ids = ''
      for(let i=0;i<this.fillSum;i++){
        ids= ids + e[i].input
        if(i !== this.fillSum-1){
          ids= ids  + '|'
        }
      }
      this.editQuestion.answer = ids
      console.log(ids)
    }
  },
  beforeMount() {
    this.fetchMapSubject()
    this.editQuestion = this.question
    this.editQuestion.typeId = this.topicType
    console.log(this.$store.state.fillSum)
    // console.log(this.$store.state.fillItems)
    // console.log(this.copyFillItems)
    // console.log(this.copyFillSum)
  },
  updated() {
    this.editQuestion = this.question
    this.copyCheck=this.$store.state.check
    this.copyFillSum = this.$store.state.fillSum
    this.copyFillItems = this.$store.state.fillItems
    // this.copyFillItems=this.fillItems
    // this.copyFillSum=this.fillSum
  },
  watch:{
    copyCheck(newVal) {
      this.$emit('update:check', newVal);
    },
    copyFillSum(newVal) {
      this.$store.commit('updateFillSum',newVal)
    },
    copyFillItems(newVal) {
      this.$store.commit('updateFillItems',newVal)
    }
  }
}
</script>

<style   scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

