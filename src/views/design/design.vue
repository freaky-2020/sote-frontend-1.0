<template>
  <div class="app-container">
<!--    <div class="filter-container" align="center">-->
<!--      <el-button @click="topicNum++" icon="el-icon-circle-plus-outline" type="success">添加大题</el-button>-->
<!--    </div>-->
    <div style="font-size: 30px">
      目前试题共
      <span style="color: red">{{totalNum}}</span>  题  总计
      <span style="color: red">{{totalScore}}</span>分
    </div>
    <div class="filter-container">
      <topic-form style="margin-bottom: 10px" :topicType="1" topicTitle=单选题 :examForm.sync="examForm[1]" :paperId="paperId"></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="2" topicTitle=多选题 :examForm.sync="examForm[2]" :paperId="paperId"></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="3" topicTitle=判断题 :examForm.sync="examForm[3]" :paperId="paperId"></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="4" topicTitle=填空题 :examForm.sync="examForm[4]" :paperId="paperId"></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="5" topicTitle=简答题 :examForm.sync="examForm[5]" :paperId="paperId"></topic-form>
    </div>
    <div style="position:absolute;bottom: 0px;margin-bottom: 5px;transform: translate(-50%);left: 50%" >
      <el-button size="medium" type="primary" icon="el-icon-thumb" @click="toPublish">提交试卷</el-button>
      <el-button size="medium" type="warning" icon="el-icon-setting" @click="isEditTest = true">考试设置</el-button>
      <el-button size="medium" type="info" icon="el-icon-view" @click="toPreview">预览试卷</el-button>
    </div>

    <div>
      <el-dialog title="考试设置" :visible.sync="isEditTest" top="50px" width=60%>
        <div style="border: solid 1px #f4f4f5">
          <el-scrollbar style="height: 500px" wrap-style="overflow-x:hidden;">
            <div>

            </div>
          </el-scrollbar>
        </div>
        <el-row type="flex" justify="end" style="margin-top: 10px">
          <el-button size="medium" @click="editTestSubmit">确定</el-button>
          <el-button size="medium" @click="isEditTest = false">取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import topicForm from '@/views/design/component/topicForm'
import axios from 'axios'
import request from '@/utils/request'
axios.defaults.baseURL=''

export default {
  components: {topicForm},
  data() {
    return {
      paperId:1,
      totalNum:10,
      totalScore:100,
      list: {},
      examForm:{
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
      },
      isEditTest:false,
      isShowTopic:false,
      inputTopic:'',
      topicNum:1,
      newTopic:{
        id:'',
        name:'',
        question:[
          {id:'', main:'',type:'',score:'',answer:''}
        ]
      }
    }
  },

  methods:{
    fetchData() {
      this.listLoading = true
      return request({
        url: '/exam/paper/'+this.paperId+'/get',
        methods: 'Get'
      }).then(response => {
        console.log(response)
        Object.keys(response).forEach(key=>{
          console.log('key:',key,'value:',response[key])
          this.examForm[key] = response[key]
        })
        console.log(this.examForm)
      })
    },
    toPublish(){
      this.$router.push({
        name: 'Tab'
      })
    },
    toPreview(){
      console.log(this.examForm)
      console.log(this.examForm[1])
      // this.$router.push({
      //   name: 'Tab'
      // })
    },
    editTestSubmit(){
      this.isEditTest = false
    },
    // getAllScore(){
    //   let sums = 0
    //   for(let i = 0; i < this.form.length; i++){
    //     sums+=this.form[i].score
    //   }
    //   this.sum = sums
    // },
    // getAllSum(){
    //   let sums = 0
    //   for(let i = 0; i < this.form.length; i++){
    //     sums+=this.form[i].score
    //   }
    //   this.sum = sums
    // }
  },
  created() {
    this.fetchData()
  }
}
</script>

