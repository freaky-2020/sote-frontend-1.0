<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title_content">答题卡</div>
    </div>
    <div v-if="exam_date[1].length!==0">
      <div class="card-content-title">单选题(共{{ exam_date[1].length }}题，合计{{ getAllScore(exam_date[1]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[1]" :key="index+'1'" :type="$store.state.detailDate[question.quesNo-1].answer === null?'info':'primary'" size="mini" class="buton" @click="setNum(index)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[2].length!==0">
      <div class="card-content-title">多选题(共{{ exam_date[2].length }}题，合计{{ getAllScore(exam_date[2]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[2]" :key="index+'2'" :type="$store.state.detailDate[question.quesNo-1].answer === null?'info':'primary'" size="mini" class="buton" @click="setNum(index+exam_date[1].length)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[3].length!==0">
      <div class="card-content-title">判断题(共{{ exam_date[3].length }}题，合计{{ getAllScore(exam_date[3]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[3]" :key="index+'3'" :type="$store.state.detailDate[question.quesNo-1].answer === null?'info':'primary'" size="mini" class="buton" @click="setNum(index+exam_date[1].length+exam_date[2].length)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[4].length!==0">
      <div class="card-content-title">填空题(共{{ exam_date[4].length }}题，合计{{ getAllScore(exam_date[4]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[4]" :key="index+'4'" :type="$store.state.detailDate[question.quesNo-1].answer === null?'info':'primary'" size="mini" class="buton" @click="setNum(index+exam_date[1].length+exam_date[2].length+exam_date[3].length)">{{ question.quesNo }}</el-button>
    </div>
    <div v-if="exam_date[5].length!==0">
      <div class="card-content-title">简答题(共{{ exam_date[5].length }}题，合计{{ getAllScore(exam_date[5]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[5]" :key="index+'5'" :type="$store.state.detailDate[question.quesNo-1].answer === null?'info':'primary'" size="mini" class="buton" @click="setNum(index+exam_date[1].length+exam_date[2].length+exam_date[3].length+exam_date[4].length)">{{ question.quesNo }}</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: ['exam_date', 'quesNos'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      sum: 0,
      details: 1
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
    }
  },
  methods: {
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
    },
    setNum(index) {
      this.$store.commit('setNum', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
}
</style>

