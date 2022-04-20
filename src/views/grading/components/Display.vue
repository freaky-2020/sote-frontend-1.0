<template>
  <el-card>
    <div>
      <div  v-for="(question,index) in exam_date" :key="index+'5'">
        <div v-if="question.quesNo===num">
          <div slot="header" class="clearfix" style="font-size: 20px;">
            <span class="box-center">简答题(共{{ exam_date.length }}题，合计{{ getAllScore(exam_date) }}分)</span>
            <div style="float: right" v-if="$store.state.isDown === true">
              <span style="text-align: right;margin-right: 10px">姓名：{{stuData[userNum].user.realName}}</span>
              <span style="text-align: right">编号：{{stuData[userNum].user.userName}}</span>
            </div>
          </div>
          <h3 class="box-center">{{ index+1 }}、{{ replace_stem(question.stem) }}   ({{question.score}}分)</h3>
          <el-row v-if="$store.state.isDown === false">
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="13">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
            <el-col  :span="4">
              <el-button  type="primary" @click="gradingThis(question.quesNo)">批改此题</el-button>
            </el-col>
            <el-col  :span="4">
              <el-button  type="primary" @click="toMyExam">结束批改</el-button>
            </el-col>
          </el-row>
          <div v-if="$store.state.isDown === true">
            <span></span>
            学生答案：
            <br>
            <br>
            <span style="color: blue;margin-bottom: 10px" >{{stuData[userNum].examDetail.answer}}</span>
            <br>
            <br>
            <span>参考答案：</span>
            <span style="color: blue" v-html="stuData[userNum].examDetail.realAnswer"></span>
          </div>
          <el-row v-if="$store.state.isDown === true">
            <el-col :span="3">
              <el-button size="small" @click="preUser">上一学生</el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="small" @click="nextUser">下一学生</el-button>
            </el-col>

            <el-col :span="14">
              打分：<el-input size="small" style="width: 100px;margin-right: 10px" v-model="stuData[userNum].examDetail.score"></el-input>
            </el-col>
              <el-col :span="2">
                <el-button  size="small" type="primary" @click="submitGrading(stuData[userNum].examDetail.id,3)">保存</el-button>
              </el-col>
              <el-col :span="2">
                <el-button  size="small" type="primary" @click="gradingDown(question.quesNo-1)">结束批改</el-button>
              </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'Display',
  props: ['exam_date','examId', 'quesNos','gradingThis','stuData'],
  data() {
    return {
      isDown:this.$store.state.isDown,
      inputScore:0,
      preDisabled: true, // 上禁用按钮
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
    },
    nextDisabled() {
      return this.$store.state.nextDisabled
    },
    userNum(){
      return this.$store.state.userNum
    }
  },
  watch: {
    // 第一题和最后一题禁用按钮
    num(now, old) {
      if (now === this.quesNos - 1) {
        this.$store.commit('nextDisableTrue')
      } else {
        this.$store.commit('nextDisableFalse')
      }
      this.preDisabled = now === this.exam_date[0].quesNo
    },
    userNum(){

    },
  },
  created() {
    this.fetchData()
  },
  mounted() {
    console.log(this.stuData)
    const inputs = document.querySelectorAll('.input-box__label')
    const labels = document.querySelectorAll('.input-box__input')
    inputs.forEach(function(input, index) {
      labels[index].addEventListener('input', (e) => {
        input.innerHTML = e.target.value
      })
    })
  },
  methods: {
    submitGrading(val,type){
      request({
        url: 'exam/mark/markScore/' + val,
        method: 'get',
        params: {
          score: this.stuData[this.userNum].examDetail.score
        }
      }).then(response => {
        console.log(response)
        this.$message(response)
        if(response === '批阅成功'){
          if(type===1){
            this.$store.commit('reduceUserNum')
          }
          if(type===2){
            this.$store.commit('addUserNum',this.stuData.length-1)
          }
          else{
            this.$emit('gradingThis',val)
          }
        }
        this.inputScore = 0
      }).catch(err => {
        console.log(err)
      })
    },
    ques(no) {
      return 'ques' + no
    },
    replace_stem(stem) {
      return stem.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
    },
    replace_stem_judge(stem) {
      return stem.replaceAll('{}', '<div class="input-box">\n' +
        '  <label class="input-box__label"></label>\n' +
        '  <input v-model="detailDate[question.quesNo-1].answer" type="text" class="input-box__input"/>\n' +
        '</div>')
    },
    next() {
      console.log(this.quesNos)
      console.log(this.num)
      if(this.num === this.quesNos-1){
        alert('已到最后一题请重新选择')
      }
      else{
        this.$store.commit('addNum')
        this.submitDate(this.num)
      }
    },
    prex() {
      this.$store.commit('reduceNum')
      this.submitDate(this.num)
    },
    preUser(){
      this.submitGrading(this.stuData[this.userNum].examDetail.id,1)
    },
    nextUser(){
      this.submitGrading(this.stuData[this.userNum].examDetail.id,2)
    },
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
    },
    gradingThis(item){
      this.$emit('gradingThis',item)
    },
    gradingDown(){
      this.$store.commit('gradingDown')
    },
    toMyExam(){
      if(confirm('是否结束批改？')){
        if(confirm('是否立即公布考试结果?')){
          request({
            url: 'exam/info/publish/' + this.examId,
            method: 'get',
          }).then(response => {
            console.log(response)
          }).catch(err => {
            console.log(err)
          })
        }
        this.$router.push({ name: 'teacherExam', query: {} })
      }
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
</style>
