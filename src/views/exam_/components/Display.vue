<template>
  <el-card>
    <div>
      <div v-for="(question,index) in exam_date[1]" :key="index+'1'">
        <div v-if="num === index">
          <div slot="header" class="clearfix">
            <h3 class="box-center">一、单选题(共{{ exam_date[1].length }}题，合计{{ getAllScore(exam_date[1]) }}分)</h3>
          </div>
          <h3 class="box-center">{{ question.quesNo }}、{{ replace_stem(question.stem) }}</h3>
          <!--              <p class="question-score">多选题 0分</p>-->

          <!--              上面的那个id，用来答题卡定位...ques_no代表题号，因为没法直接取得所有试题的序号，只能取出一种题型的序号-->
          <!--              choice也需要再嵌套一层，因为id用来显示是否选中按钮，同时也不同用四个按钮，直接一个for循环-->
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer === '1'?'primary':''"
                     @click="answerOne(question.quesNo-1, '1')">A
          </el-button>
          {{ question.choice1 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer ==='2'?'primary' :''"
                     @click="answerOne(question.quesNo-1, '2')">B
          </el-button>
          {{ question.choice2 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer ==='3'?'primary' :''"
                     @click="answerOne(question.quesNo-1, '3')">C
          </el-button>
          {{ question.choice3 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer ==='4'?'primary' :''"
                     @click="answerOne(question.quesNo-1, '4')">D
          </el-button>
          {{ question.choice4 }}
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-for="(question,index) in exam_date[2]" :key="index+'2'">
        <div v-if="num === (index+exam_date[1].length)">
          <div slot="header" class="clearfix">
            <h3 class="box-center">二、多选题(共{{ exam_date[2].length }}题，合计{{ getAllScore(exam_date[2]) }}分)</h3>
          </div>
          <h3 class="box-center">{{ question.quesNo }}、{{ replace_stem(question.stem) }}</h3>
          <el-button class="circle_btn" size="mini" circle
                     :type="judgeGroup($store.state.detailDate[question.quesNo-1].answer, '1')?'primary':''"
                     @click="answerGroup(question.quesNo-1,'1')">A
          </el-button>
          {{ question.choice1 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="judgeGroup($store.state.detailDate[question.quesNo-1].answer, '2')?'primary':''"
                     @click="answerGroup(question.quesNo-1,2)">B
          </el-button>
          {{ question.choice2 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="judgeGroup($store.state.detailDate[question.quesNo-1].answer, '3')?'primary':''"
                     @click="answerGroup(question.quesNo-1,3)">C
          </el-button>
          {{ question.choice3 }}<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="judgeGroup($store.state.detailDate[question.quesNo-1].answer, '4')?'primary':''"
                     @click="answerGroup(question.quesNo-1,4)">D
          </el-button>
          {{ question.choice4 }}
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-for="(question,index) in exam_date[3]" :key="index+'3'">
        <div v-if="num === (index+exam_date[1].length+exam_date[2].length)">
          <div slot="header" class="clearfix">
            <h3 class="box-center">三、判断题(共{{ exam_date[3].length }}题，合计{{ getAllScore(exam_date[3]) }}分)</h3>
          </div>
          <h3 class="box-center">{{ question.quesNo }}、{{ replace_stem(question.stem) }}</h3>
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer === 1?'primary':''"
                     @click="$store.state.detailDate[question.quesNo-1].answer = 1">A
          </el-button>
          正确<br>
          <el-button class="circle_btn" size="mini" circle
                     :type="$store.state.detailDate[question.quesNo-1].answer === 2?'primary':''"
                     @click="$store.state.detailDate[question.quesNo-1].answer = 2">B
          </el-button>
          错误<br>
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-for="(question,index) in exam_date[4]" :key="index+'4'">
        <div v-if="num === (index+exam_date[1].length+exam_date[2].length+exam_date[3].length)">
          <div slot="header" class="clearfix">
            <h3 class="box-center">四、填空题(共{{ exam_date[4].length }}题，合计{{ getAllScore(exam_date[4]) }}分)</h3>
          </div>
          <h3 class="box-center" v-html="question.quesNo+'、'+replace_stem_judge(replace_stem(question.stem))"/>
          <!--          题干传过来字符串，用{}表示空的位置，使用jquery来替代{}字符为<input type="text">,然后使用v-html来转换为____，题干题干中间可以有多个____，-->
          <!--                另外，input好像都要绑定一个数据v-model，这样正好可以获取用户输入的答案，比如：v-model="ruleForm.resource[index]"-->
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-for="(question,index) in exam_date[5]" :key="index+'5'">
        <div v-if="num === (index+exam_date[1].length+exam_date[2].length+exam_date[3].length+exam_date[4].length)">
          <div slot="header" class="clearfix">
            <h3 class="box-center">五、简答题(共{{ exam_date[5].length }}题，合计{{ getAllScore(exam_date[5]) }}分)</h3>
          </div>
          <h3 class="box-center">{{ question.quesNo }}、{{ replace_stem(question.stem) }}</h3>
          <el-input v-model="$store.state.detailDate[question.quesNo-1].answer" type="textarea" :rows="5" resize="none"
                    maxlength="500"/>
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="$store.state.nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-button style="margin-top: 50px; margin-left: 500px" type="primary" @click="goSubmit(false)">交卷
    </el-button>
  </el-card>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'Display',
  props: ['exam_date', 'quesNos', 'details', 'examId', 'times', 'isCheat'],
  data() {
    return {
      preDisabled: true // 上禁用按钮,下禁用在vuex中
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
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
      this.preDisabled = now === 0
      this.submitDate(old + 1) // 当num值改变时，提交上一个题的答案
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    const inputs = document.querySelectorAll('.input-box__label')
    const labels = document.querySelectorAll('.input-box__input')
    inputs.forEach(function(input, index) {
      labels[index].addEventListener('input', (e) => {
        input.innerHTML = e.target.value
      })
    })
  },
  methods: {
    answerOne(no, select) {
      this.$store.commit('setDetailData_AnswerOne',{no: no, select: select})
    },
    judgeGroup(answer, select){

      if (answer === null){
        return false
      }
      else{
        return answer.includes(select)
      }
    },
    answerGroup(no, select) {
      this.$store.commit('setDetailData_AnswerGroup',{no: no, select: select})
      alert(this.$store.state.detailDate[data.no].answer)
    },
    fetchData() {
      request({
        url: 'exam/detail/get/' + this.details,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.$store.commit('setDetailDate', response)
      }).catch(err => {
        console.log(err)
      })
    },
    submitDate(num) {
      request({
        url: 'exam/detail/answer' + '/' + this.details + '/' + num,
        method: 'get',
        params: {
          answer: this.$store.state.detailDate[num - 1].answer
        }
      }).then(response => {
        console.log(response)
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
        '  <input v-model="$store.state.detailDate[question.quesNo-1].answer" type="text" class="input-box__input"/>\n' +
        '</div>')
    },
    next() {
      if (this.num < this.quesNos - 1) {
        this.$store.commit('addNum')
      }
    },
    prex() {
      this.$store.commit('reduceNum')
    },
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
    },
    goSubmit(isCheat) {
      if (isCheat) {
        this.submitDate(this.num + 1)
        this.$alert('强制交卷', '通知', {
          confirmButtonText: '确定',
        }).then(async ()=>{
          request({
            url: '/exam/stu/submit/' + this.$store.getters.name + '/' + this.examId + '/' + this.times,
            method: 'Get'
          }).then(response => {
          })
          this.$router.push({name:'Dashboard'})
        });
      } else {
        this.$confirm('您确定要交卷吗，交卷后将无法修改', '是否交卷', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async() => {
          this.submitDate(this.num + 1)
          request({
            url: '/exam/stu/submit/' + this.$store.getters.name + '/' + this.examId + '/' + this.times,
            method: 'Get'
          }).then(response => {
            this.$message({
              type: 'success',
              message: ' 提交成功!'
            })
            this.$router.push({name:'Dashboard'})
          })
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.circle_btn {
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}

.blank {
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
