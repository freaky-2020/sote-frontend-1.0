<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title_content">答题卡</div>
    </div>
    <div v-if="exam_date[1].length!==0">
      <div class="card-content-title">单选题(共{{ exam_date[1].length }}题，合计 未知 分)</div><br>
      <el-button v-for="(question,index) in exam_date[1]" :key="index+'1'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[2].length!==0">
      <div class="card-content-title">多选题(共{{ exam_date[2].length }}题，合计{{ full_score }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[2]" :key="index+'2'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[3].length!==0">
      <div class="card-content-title">判断题(共{{ exam_date[3].length }}题，合计{{ full_score }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[3]" :key="index+'3'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[4].length!==0">
      <div class="card-content-title">填空题(共{{ exam_date[4].length }}题，合计{{ full_score }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[4]" :key="index+'4'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[5].length!==0">
      <div class="card-content-title">简答题(共{{ exam_date[5].length }}题，合计{{ full_score }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[5]" :key="index+'5'" size="mini" class="buton" @click="goAnchor('#ques'+question.quesNo)">{{ question.quesNo }}</el-button>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: ['exam_date'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      full_score: 2
    }
  },
  methods: {
    // 模拟锚点跳转
    goAnchor(selector) { // 参数selector是id选择器（#id）
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
}
</style>

