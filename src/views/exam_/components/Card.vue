<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title_content">答题卡</div>
    </div>
    <div v-if="exam_date[1].length!==0">
      <div class="card-content-title">单选题(共{{ exam_date[1].length }}题，合计 {{ getAllScore(exam_date[1]) }} 分)</div>
      <el-button v-for="(question,index)  in exam_date[1]" :type="detailDate[question.quesNo-1].answer === null?'info':'primary'" :key="index+'1'" size="mini" class="buton"
                 @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[2].length!==0">
      <div class="card-content-title">多选题(共{{ exam_date[2].length }}题，合计{{ getAllScore(exam_date[2]) }}分)</div>
      <el-button v-for="(question,index) in exam_date[2]" :key="index+'2'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[3].length!==0">
      <div class="card-content-title">判断题(共{{ exam_date[3].length }}题，合计{{ getAllScore(exam_date[3]) }}分)</div>
      <el-button v-for="(question,index) in exam_date[3]" :key="index+'3'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[4].length!==0">
      <div class="card-content-title">填空题(共{{ exam_date[4].length }}题，合计{{ getAllScore(exam_date[4]) }}分)</div>
      <el-button v-for="(question,index) in exam_date[4]" :key="index+'4'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[5].length!==0">
      <div class="card-content-title">简答题(共{{ exam_date[5].length }}题，合计{{ getAllScore(exam_date[5]) }}分)</div>
      <el-button v-for="(question,index) in exam_date[5]" :key="index+'5'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>

  </el-card>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Card',
  props: ['exam_date','details'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      full_score: 2,
      sum:0,
      detailDate: null,
    }
  },
  methods: {
    // 模拟锚点跳转
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
    },
    goAnchor(selector) { // 参数selector是id选择器（#id）
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      })
    },
    fetchData() {
      request({
        url: 'exam/detail/get/' + this.details,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.detailDate = response
        this.answer_assign()
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    this.fetchData()
    console.log(this.exam_date)
  }
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>

