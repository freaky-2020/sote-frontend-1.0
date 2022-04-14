<template>
  <div class="background-container">
<!--    <div style="position: fixed;background-color:#FFFFFF;width: 200px" >-->

<!--    </div>-->
  <div class="app-container" style="width:100%;padding: 20px 0;background-color: transparent">
    <div class="column side">
      <h4 style="color: #00509d">试卷概况:</h4><br/>
      <div>
        试题共<el-tag type="danger" style="color: #f19e00;font-size: 18px">{{totalNum}} </el-tag>题
      </div>
      <div>
      总计<el-tag type="danger" style="color:#f19e00;font-size: 18px">{{totalScore}} </el-tag>分
      </div>
    </div>
    <div class="column middle">
  <!--    <div class="filter-container" align="center">-->
  <!--      <el-button @click="topicNum++" icon="el-icon-circle-plus-outline" type="success">添加大题</el-button>-->
  <!--    </div>-->
      <h3 class="pagetitle">设计试卷试题</h3>
  <!--    这一部分是计算总分 总题目数的部分-->
<!--      <div style="font-size: 30px">-->
<!--        目前试题共-->
<!--        <span style="color: red">{{totalNum}}</span>  题  总计-->
<!--        <span style="color: red">{{totalScore}}</span>分-->
<!--      </div>-->
      <div class="filter-container">
        <el-collapse v-model="activeNames" @change="">
          <el-collapse-item class="item-menu" title="单选题" name="1">
            <template slot="title">
              <span style="float:left;font-weight:520;font-size:15px;color:#003b6e;">单选题</span>
            </template>
            <topic-form  v-if="isFetched" :topicType="1" topicTitle=单选题 :examForm.sync="examForm[1]"
                         :scoreSums.sync="scoreItems[0]" :paperId="paperId" @fetchData="fetchData"></topic-form>
          </el-collapse-item>
          <el-collapse-item title="" name="2">
            <template slot="title">
              <span style="float:left;font-weight:520;font-size:15px;color:#003b6e;">多选题</span>
            </template>
            <topic-form  v-if="isFetched" :topicType="2" topicTitle=多选题 :examForm.sync="examForm[2]"
                         :scoreSums.sync="scoreItems[1]" :paperId="paperId" @fetchData="fetchData"></topic-form>
          </el-collapse-item>
          <el-collapse-item title="" name="3">
            <template slot="title">
              <span style="float:left;font-weight:520;font-size:15px;color:#003b6e;">判断题</span>
            </template>
            <topic-form  v-if="isFetched" :topicType="3" topicTitle=判断题 :examForm.sync="examForm[3]"
                         :scoreSums.sync="scoreItems[2]" :paperId="paperId" @fetchData="fetchData"></topic-form>
          </el-collapse-item>
          <el-collapse-item title="" name="4">
            <template slot="title">
              <span style="float:left;font-weight:520;font-size:15px;color:#003b6e;">填空题</span>
            </template>
            <topic-form  v-if="isFetched" :topicType="4" topicTitle=填空题 :examForm.sync="examForm[4]"
                         :scoreSums.sync="scoreItems[3]" :paperId="paperId" @fetchData="fetchData"></topic-form>
          </el-collapse-item>
          <el-collapse-item title="" name="5">
            <template slot="title">
              <span style="float:left;font-weight:520;font-size:15px;color:#003b6e;">简答题</span>
            </template>
            <topic-form  v-if="isFetched" :topicType="5" topicTitle=简答题 :examForm.sync="examForm[5]"
                         :scoreSums.sync="scoreItems[4]" :paperId="paperId" @fetchData="fetchData"></topic-form>
          </el-collapse-item>
        </el-collapse>
        <el-footer height="80px">
          <div style="position:relative;margin:40px;transform: translate(-50%);left: 50%" >
            <el-button size="medium" type="primary" icon="el-icon-thumb" @click="designDialog =true">提交试卷</el-button>
            <el-button size="medium" type="info" icon="el-icon-view" @click="toPreview">预览试卷</el-button>
          </div>
        </el-footer>


      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="designDialog"
      width="30%"
      center>
      <span>提交试卷后无法修改，确认提交试卷吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="designDialog = false">取 消</el-button>
    <el-button type="primary" @click="toPublish">确 定</el-button>
    </span>
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
      activeNames: ['1'],
      designDialog:false,
      isFetched:false,
      keys:1,
      paperId:11,
      totalNum:0,
      totalScore:0,
      list: {},
      examForm:{
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
      },
      scoreItems:[0,0,0,0,0],
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
        this.isFetched = true
        let sums = 0
        Object.keys(response).forEach(key=>{
          console.log('key:',key,'value:',response[key])
          this.examForm[key] = response[key]
          sums = sums + response[key].length
        })
        this.totalNum = sums
      })
    },
    toPublish(){
      this.designDialog =false
      this.$router.push({
        name: 'teacherExam'
      })
    },
    toPreview(){
      this.$router.push({
        name: 'Exam_',
        query:{
          paperId:this.paperId,
          isView:true,
        }
      })
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
  },
  watch:{
    scoreItems:{
      handler: function(newVal) {
        let sums = 0
        for(let i=0;i<5;i++){
          sums =sums + this.scoreItems[i]
        }
        this.totalScore = sums
        console.log(this.scoreItems)
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style lang="scss">
topic-form{
  margin-bottom: 10px;
}
.pagetitle{
  color:#00509d;
  height: 40px;
  font-size: 20px;
  border-bottom: 1px solid lightgrey;
}

/* 创建三个不相等的列 */
* {
  box-sizing: border-box;
}
.background-container{
  .column {

    //float: left;
    margin: 0 10px;
    background: #FFFFFF;
  }

  /* 左右两侧宽度 */
  .column.side {
    position: absolute;
    top: 20px;left: 10%;
    width: 15%;
    padding: 10px 20px 30px 20px;
  }

  /* 中间区域宽度 */
  .column.middle {
    position: relative;
    top: -20px;left: 20%;
    height: 100%;
    width: 80%;
    background: #FFFFFF;
    padding: 10px 5%;
  }

  /* 列后面清除浮动 */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  /* 响应式布局 - 宽度小于600px时设置上下布局 */
  @media screen and (max-width: 600px) {
    .column.side, .column.middle {
      width: 100%;
    }
  }
}



</style>
