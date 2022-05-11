<template>
  <el-card>
    <div>
      <el-scrollbar style="height: 600px" wrap-style="overflow-x:hidden;">
        <div v-if="exam_date !==undefined">
          <h3>一、单选题</h3>
          <div  v-for="(question,index) in exam_date.papers" :key="index">
            <div v-if="question.typeId ===1">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer ==='1'?'primary':''">A</el-button>
              <span>{{question.choice1}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer ==='2'?'primary':''">B</el-button>
              <span>{{question.choice2}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer ==='3'?'primary':''">C</el-button>
              <span>{{question.choice3}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer ==='4'?'primary':''">D</el-button>
              <span>{{question.choice4}}</span><br>
              <div>
                <div>
                  <span style="color: green">正确答案：{{map[question.answer]}}</span>
                  <br>
                  <br>
                  <span style="color: red">你的答案：{{map[examDetails[index].answer]}}</span>
                </div>
              </div>
            </div>
            <h3 v-if="exam_date.papers[index].typeId===1 && exam_date.papers[index+1].typeId ===2">二、多选题</h3>
            <div v-if="question.typeId === 2">
              <div v-if="examDetails[index].answer !== null">
                <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer.indexOf('1') !==-1?'primary':''">A</el-button>
                <span>{{question.choice1}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer.indexOf('2') !==-1?'primary':''">B</el-button>
                <span>{{question.choice2}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer.indexOf('3') !==-1?'primary':''">C</el-button>
                <span>{{question.choice3}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer.indexOf('4') !==-1?'primary':''">D</el-button>
                <span>{{question.choice4}}</span><br>
                <span style="color: green">正确答案：{{getAnswer(question.answer)}}</span>
                <br>
                <br>
                <span style="color: red">你的答案：{{getAnswer(examDetails[index].answer)}}</span>
              </div>
              <div v-if="examDetails[index].answer === null">
                <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px">A</el-button>
                <span>{{question.choice1}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px">B</el-button>
                <span>{{question.choice2}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px">C</el-button>
                <span>{{question.choice3}}</span><br>
                <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px">D</el-button>
                <span>{{question.choice4}}</span><br>
                <span style="color: green">正确答案：{{getAnswer(question.answer)}}</span>
                <br>
                <br>
                <span style="color: red">你的答案：{{getAnswer(examDetails[index].answer)}}</span>
              </div>
            </div>
            <h3 v-if="exam_date.papers[index].typeId===2 && exam_date.papers[index+1].typeId ===3">三、判断题</h3>
            <div v-if="question.typeId === 3">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer === '1'?'primary':''">正确</el-button>
              <span>{{question.choice1}}</span>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="examDetails[index].answer === '2'?'primary':''">错误</el-button>
              <span>{{question.choice2}}</span><br>
              <span style="color: green">正确答案：</span>
              <span style="color: green" v-html="question.answer==='1'?'正确':'错误'"></span>
              <br>
              <br>
              <span style="color: red">你的答案：</span>
              <span style="color: red" v-html="examDetails[index].answer==='1'?'正确':'错误'"></span>
            </div>
            <h3 v-if="exam_date.papers[index].typeId===3 && exam_date.papers[index+1].typeId ===4">四、填空题</h3>
            <div v-if="question.typeId ===4">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <span style="color: red">考生答案：{{examDetails[index].answer}}</span>
              <br>
              <br>
              <span style="color: green">正确答案：</span>
              <span style="color: green" v-html="question.answer"></span>
            </div>
            <h3 v-if="exam_date.papers[index].typeId===4 && exam_date.papers[index+1].typeId ===5">五、综合题</h3>
            <div v-if="question.typeId ===5">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <span>考生答案：</span>
              <span style="color: red" v-html="examDetails[index].answer"></span>
              <br>
              <br>
              <span style="color: green">正确答案：</span>
              <span style="color: green" v-html="question.answer"></span>
              <br>
              <br>
              <span>考生得分：   </span>
              <span v-if="isTeacher === undefined">{{examDetails[index].score}}</span>
              <div v-if="isTeacher !== undefined">
                <el-input  style="width: 200px;margin-right: 10px" size="small" v-model="examDetails[index].score"></el-input>
                <el-button size="small" @click="submitGrading(examDetails[index].id,examDetails[index].score)">保存修改</el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="paperData !== undefined">
          <h3>一、单选题</h3>
          <div  v-for="(question,index) in paperData[1]" :key="index">
            <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='1'?'primary':''">A</el-button>
            <span>{{question.choice1}}</span><br>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='2'?'primary':''">B</el-button>
            <span>{{question.choice2}}</span><br>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='3'?'primary':''">C</el-button>
            <span>{{question.choice3}}</span><br>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='4'?'primary':''">D</el-button>
            <span>{{question.choice4}}</span><br>
          </div>
          <h3>二、多选题</h3>
          <div  v-for="(question,index) in paperData[2]" :key="index">
            <div v-if="question.answer !== null">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer.indexOf('1') !==-1?'primary':''">A</el-button>
              <span>{{question.choice1}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer.indexOf('2') !==-1?'primary':''">B</el-button>
              <span>{{question.choice2}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer.indexOf('3') !==-1?'primary':''">C</el-button>
              <span>{{question.choice3}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer.indexOf('4') !==-1?'primary':''">D</el-button>
              <span>{{question.choice4}}</span><br>
            </div>
            <div v-if="question.answer === null">
              <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" >A</el-button>
              <span>{{question.choice1}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" >B</el-button>
              <span>{{question.choice2}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" >C</el-button>
              <span>{{question.choice3}}</span><br>
              <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" >D</el-button>
              <span>{{question.choice4}}</span><br>
            </div>
          </div>
          <h3>三、判断题</h3>
          <div  v-for="(question,index) in paperData[3]" :key="index">
            <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='1'?'primary':''">正确</el-button>
            <el-button size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="question.answer ==='2'?'primary':''">错误</el-button>
          </div>
          <h3>四、填空题</h3>
          <div  v-for="(question,index) in paperData[4]" :key="index">
            <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
            <span style="color: green">正确答案：</span>
            <span style="color: green" v-html="question.answer"></span>
          </div>
          <h3>五、简答题</h3>
          <div  v-for="(question,index) in paperData[5]" :key="index">
            <h5 :id="'a'+question.quesNo" v-html="question.quesNo + '、'+question.stem+'('+question.score+'分)'"> </h5>
            <span style="color: green">正确答案：</span>
            <span style="color: green" v-html="question.answer"></span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-card>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'Display',
  props: ['exam_date','examId', 'quesNos','isTeacher','fetchAllQues','paperData'],
  data() {
    return {
      inputScore:0,
      examDetails:this.exam_date.examDetails,
      map:{
        '1':'A',
        '2':'B',
        '3':'C',
        '4':'D',
      },
      mapAnswer: {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        ',':''
      },
    }
  },
  computed: {
    quesNo(){
      return this.$store.state.quesNo
    },
    sum(){
      return this.$store.state.sum
    }
  },
  watch: {
    sum(){
      this.rollTo()
    }
  },
  created() {
  },
  updated() {
  },
  mounted() {
  },
  methods: {
    getAnswer(answer){
      let newAnswer = ''
      for(let i=0;i<answer.length;i++){
        newAnswer=`${newAnswer}${this.mapAnswer[answer[i]]}`
      }
      return newAnswer
    },
    submitGrading(id,score){
      request({
        url: 'exam/mark/markScore/' + id,
        method: 'get',
        params: {
          score: score
        }
      }).then(response => {
        console.log(response)
        this.$message(response)
        this.$emit('fetchAllQues')
      }).catch(err => {
        console.log(err)
      })
    },
    rollTo(){
      document.querySelector('#a'+this.quesNo).scrollIntoView()
    }
  }
}
</script>

<style lang="scss">
.circle_btn{
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}
.blank{
  border: none;
  padding: 0 5px;
  border-bottom: 1px solid;
}
/* 填空题样式 */
.input-box {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  border: none;
  border-bottom: 1px solid;
  height: 18px;
  min-width: 50px;
  /* font family is very important */
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}

.input-box__label {
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  visibility: hidden;
  font-family: inherit;
  height: 13px;
  padding: 0 10px;
}

.input-box__input {
  box-sizing: border-box;
  position: absolute;
  display: inline-block;
  font-size: inherit;
  font-family: inherit;
  line-height: normal;
  border-bottom: inherit;
  height: 100%;
  width: 100%;
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0 10px;
}
.question-score {
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 2px 8px;
  color: #9d9d9d;
  margin-right: 6px;
  display: inline-block;
}
p{
  display: inline;
  margin: 0px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>
