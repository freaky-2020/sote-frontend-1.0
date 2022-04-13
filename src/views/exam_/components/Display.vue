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
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer === '1'?'primary':''" @click="detailDate[question.quesNo-1].answer='1'">A</el-button>
          {{ question.choice1 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer ==='2'?'primary' :''" @click="detailDate[question.quesNo-1].answer='2'">B</el-button>
          {{ question.choice2 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer ==='3'?'primary' :''" @click="detailDate[question.quesNo-1].answer='3'">C</el-button>
          {{ question.choice3 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer ==='4'?'primary' :''" @click="detailDate[question.quesNo-1].answer='4'">D</el-button>
          {{ question.choice4 }}
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="nextDisabled" @click="next">下一题</el-button>
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
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer.includes('1')?'primary':''" @click="anwser_group(question.quesNo,'1')">A</el-button>
          {{ question.choice1 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer.includes('2')?'primary':''" @click="anwser_group(question.quesNo,'2')">B</el-button>
          {{ question.choice2 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer.includes('3')?'primary':''" @click="anwser_group(question.quesNo,'3')">C</el-button>
          {{ question.choice3 }}<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer.includes('4')?'primary':''" @click="anwser_group(question.quesNo,'4')">D</el-button>
          {{ question.choice4 }}
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="nextDisabled" @click="next">下一题</el-button>
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
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer === 1?'primary':''" @click="detailDate[question.quesNo-1].answer = 1">A</el-button>
          正确<br>
          <el-button class="circle_btn" size="mini" circle :type="detailDate[question.quesNo-1].answer === 2?'primary':''" @click="detailDate[question.quesNo-1].answer = 2">B</el-button>
          错误<br>
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="nextDisabled" @click="next">下一题</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-for="(question,index) in exam_date[4]" :key="index+'4'">
        <div v-if="num === (index+exam_date[1].length+exam_date[2].length+exam_date[3].length)">
          <div slot="header" class="clearfix">
            <h3 class="box-center">四、填空题(共{{ exam_date[4].length }}题，合计{{ getAllScore(exam_date[4]) }}分)</h3>
          </div>
          <h3 class="box-center" v-html="question.quesNo+'、'+replace_stem_judge(replace_stem(question.stem))" />
          <!--          题干传过来字符串，用{}表示空的位置，使用jquery来替代{}字符为<input type="text">,然后使用v-html来转换为____，题干题干中间可以有多个____，-->
          <!--                另外，input好像都要绑定一个数据v-model，这样正好可以获取用户输入的答案，比如：v-model="ruleForm.resource[index]"-->
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="nextDisabled" @click="next">下一题</el-button>
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
          <el-input v-model="detailDate[question.quesNo-1].answer" type="textarea" :rows="5" resize="none" maxlength="500" />
          <el-row>
            <el-col :span="3">
              <el-button :disabled="preDisabled" @click="prex">上一题</el-button>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="nextDisabled" @click="next">下一题</el-button>
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
  props: ['exam_date'],
  data() {
    return {
      details: 1,
      detailDate: null,
      preDisabled: true, // 上禁用按钮,下禁用在vuex中
    }
  },
  computed: {
    num() {
      return this.$store.state.numx
    },
    nextDisabled() {
      return this.$store.state.nextDisabled
    }
  },
  watch: {
    // 第一题和最后一题禁用按钮
    num(now, old) {
      this.nextDisabled = now === this.detailDate.length - 1
      this.preDisabled = now === 0
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
    anwser_group(no, select) {
      // 存在的话就取消，不存在就添加
      if (this.detailDate[no - 1].answer.includes(select)) {
        // includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        const x = this.detailDate[no - 1].answer.indexOf(select) // 判断数组中是否有选中的id,如果有则去掉
        if (x > -1) {
          this.detailDate[no - 1].answer.splice(x, 1)
        }
      } else {
        this.detailDate[no - 1].answer = this.detailDate[no - 1].answer + ',' + select
      }
    },
    fetchData() {
      request({
        url: 'exam/detail/get/' + this.details,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.detailDate = response
      }).catch(err => {
        console.log(err)
      })
    },
    submitDate(num) {
      request({
        url: 'exam/detail/answer' + '/' + this.details + '/' + num,
        method: 'get',
        params: {
          answer: this.detailDate[num - 1].answer
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
        '  <input v-model="detailDate[question.quesNo-1].answer" type="text" class="input-box__input"/>\n' +
        '</div>')
    },
    next() {
      if (this.num < this.detailDate.length - 1) {
        this.$store.commit('addnum')
      }
      this.submitDate(this.num)
    },
    prex() {
      this.$store.commit('reducenum')
      this.submitDate(this.num)
    },
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
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
