<template>
  <el-card>
    <div>
      <el-scrollbar style="height: 600px" wrap-style="overflow-x:hidden;">
        <div v-if="val ===1">
          <h2 style="color: lightskyblue" v-html=" '题目内容：' + questionData.stem"></h2>
          <div v-if="questionData.typeId===1">
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer ==='1'?'success':''">A</el-button>
            <span>{{questionData.choice1}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer ==='2'?'success':''">B</el-button>
            <span>{{questionData.choice2}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer ==='3'?'success':''">C</el-button>
            <span>{{questionData.choice3}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer ==='4'?'success':''">D</el-button>
            <span>{{questionData.choice4}}</span><br>
          </div>
          <div v-if="questionData.typeId === 2">
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('1') !==-1?'success':''">A</el-button>
            <span>{{questionData.choice1}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('2') !==-1?'success':''">B</el-button>
            <span>{{questionData.choice2}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('3') !==-1?'success':''">C</el-button>
            <span>{{questionData.choice3}}</span><br>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('4') !==-1?'success':''">D</el-button>
            <span>{{questionData.choice4}}</span><br>
          </div>
          <div v-if="questionData.typeId === 3">
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('1') !==-1?'primary':''">正确</el-button>
            <span>{{questionData.choice1}}</span>
            <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.answer.indexOf('2') !==-1?'primary':''">错误</el-button>
            <span>{{questionData.choice2}}</span><br>
          </div>
          <div v-if="questionData.typeId ===4">
            <span style="color: red">答案：</span>
            <span style="color: red" v-html="questionData.answer"></span>
          </div>
          <div v-if="questionData.typeId ===5">
            <span style="color: red">答案：</span>
            <span style="color: red" v-html="questionData.answer"></span>
          </div>
        </div>

        <div v-if="val === 2">
          <div style="display: inline;width: 45%;float:left; margin-right: 3%;margin-left: 3%;border: 1px solid #bbbbbb;border-radius:10px;">
            <div style="margin: 5px">
              <h2>更改前内容：</h2>
              <h3 style="color: black" v-html=" '题目内容：' + questionData.before.stem"></h3>
              <div v-if="questionData.before.typeId===1">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer ==='1'?'success':''">A</el-button>
                <span>{{questionData.before.choice1}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer ==='2'?'success':''">B</el-button>
                <span>{{questionData.before.choice2}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer ==='3'?'success':''">C</el-button>
                <span>{{questionData.before.choice3}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer ==='4'?'success':''">D</el-button>
                <span>{{questionData.before.choice4}}</span><br>
              </div>
              <div v-if="questionData.before.typeId === 2">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('1') !== -1?'success':''">A</el-button>
                <span>{{questionData.before.choice1}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('2') !== -1?'success':''">B</el-button>
                <span>{{questionData.before.choice2}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('3') !== -1?'success':''">C</el-button>
                <span>{{questionData.before.choice3}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('4') !== -1?'success':''">D</el-button>
                <span>{{questionData.before.choice4}}</span><br>
              </div>
              <div v-if="questionData.before.typeId === 3">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('1') !==-1?'primary':''">正确</el-button>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.before.answer.indexOf('2') !==-1?'primary':''">错误</el-button>
              </div>
              <div v-if="questionData.before.typeId ===4">
                <span style="color: red">答案：</span>
                <span style="color: red" v-html="questionData.before.answer"></span>
              </div>
              <div v-if="questionData.before.typeId ===5">
                <span style="color: red">答案：</span>
                <span style="color: red" v-html="questionData.before.answer"></span>
              </div>
            </div>
          </div>

          <div style="display: inline;width: 45%;float:left;border: 1px solid #bbbbbb;border-radius:10px;">
            <div style="margin: 5px">
              <h2 style="color: #00509d">更改后内容:</h2>
              <h3 style="color: #00509d" v-html=" '题目内容：' + questionData.after.stem"></h3>
              <div v-if="questionData.after.typeId===1">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer ==='1'?'success':''">A</el-button>
                <span>{{questionData.after.choice1}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer ==='2'?'success':''">B</el-button>
                <span>{{questionData.after.choice2}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer ==='3'?'success':''">C</el-button>
                <span>{{questionData.after.choice3}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer ==='4'?'success':''">D</el-button>
                <span>{{questionData.after.choice4}}</span><br>
              </div>
              <div v-if="questionData.after.typeId === 2">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer.indexOf('1') !== -1?'success':''">A</el-button>
                <span>{{questionData.after.choice1}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer.indexOf('2') !== -1?'success':''">B</el-button>
                <span>{{questionData.after.choice2}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer.indexOf('3') !== -1?'success':''">C</el-button>
                <span>{{questionData.after.choice3}}</span><br>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer.indexOf('4') !== -1?'success':''">D</el-button>
                <span>{{questionData.after.choice4}}</span><br>
              </div>
              <div v-if="questionData.after.typeId === 3">
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer === '1'?'primary':''">正确</el-button>
                <el-button round size="mini" style="margin-bottom: 5px;margin-right: 10px" :type="questionData.after.answer === '2'?'primary':''">错误</el-button>
              </div>
              <div v-if="questionData.after.typeId ===4">
                <span style="color: red">答案：</span>
                <span style="color: red" v-html="questionData.after.answer"></span>
              </div>
              <div v-if="questionData.after.typeId ===5">
                <span style="color: red">答案：</span>
                <span style="color: red" v-html="questionData.after.answer"></span>
              </div>
            </div>
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
  props: ['questionData','val','',''],
  data() {
    return {
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
