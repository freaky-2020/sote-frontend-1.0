<template>
  <el-card>
    <div slot="header" class="clearfix" v-if="$store.state.isDown === false">
      <div class="title_content">答题卡</div>
    </div>
<!--    <div v-if="exam_date[1].length!==0">-->
<!--      <div class="card-content-title">单选题(共{{ exam_date[1].length }}题，合计{{ getAllScore(exam_date[1]) }}分)</div><br>-->
<!--      <el-button v-for="(question,index) in exam_date[1]" :key="index+'1'" :type="detailDate[question.quesNo-1].answer === null?'info':'primary'" @click="setnum(index)" size="mini" class="buton">{{ question.quesNo }}</el-button>-->
<!--    </div>-->
<!--    <div v-if="exam_date[2].length!==0">-->
<!--      <div class="card-content-title">多选题(共{{ exam_date[2].length }}题，合计{{ getAllScore(exam_date[2]) }}分)</div><br>-->
<!--      <el-button v-for="(question,index) in exam_date[2]" :key="index+'2'" :type="detailDate[question.quesNo-1].answer === null?'info':'primary'" @click="setnum(index+exam_date[1].length)" size="mini" class="buton">{{ question.quesNo }}</el-button>-->
<!--    </div>-->
<!--    <div v-if="exam_date[3].length!==0">-->
<!--      <div class="card-content-title">判断题(共{{ exam_date[3].length }}题，合计{{ getAllScore(exam_date[3]) }}分)</div><br>-->
<!--      <el-button v-for="(question,index) in exam_date[3]" :key="index+'3'" :type="detailDate[question.quesNo-1].answer === null?'info':'primary'" @click="setnum(index+exam_date[1].length+exam_date[2].length)" size="mini" class="buton">{{ question.quesNo }}</el-button>-->
<!--    </div>-->
<!--    <div v-if="exam_date[4].length!==0">-->
<!--      <div class="card-content-title">填空题(共{{ exam_date[4].length }}题，合计{{ getAllScore(exam_date[4]) }}分)</div><br>-->
<!--      <el-button v-for="(question,index) in exam_date[4]" :key="index+'4'" :type="detailDate[question.quesNo-1].answer === null?'info':'primary'" @click="setnum(index+exam_date[1].length+exam_date[2].length+exam_date[3].length)" size="mini" class="buton">{{ question.quesNo }}</el-button>-->
<!--    </div>-->
    <div v-if="exam_date[5].length!==0 && $store.state.isDown === false">
      <div class="card-content-title">简答题(共{{ exam_date[5].length }}题，合计{{ getAllScore(exam_date[5]) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date[5]" :key="index+'5'"
                 :type="detailDate[question.quesNo-1].answer === null?'info':'primary'"
                 @click="setnum(index+exam_date[1].length+exam_date[2].length+exam_date[3].length+exam_date[4].length)"
                 size="mini"
                 class="buton">{{ index+1 }}</el-button>
    </div>

    <div v-if="$store.state.isDown === true">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" style="width: 100px" placeholder="请选择">
          <el-option label="学号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-scrollbar>
        <el-table>

        </el-table>
      </el-scrollbar>
    </div>
  </el-card>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Card',
  props: ['exam_date','quesNos'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      input:'',
      select:'',
      isDown:this.$store.state.isDown,
      sum: 0,
      details: 6,
      detailDate: null
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
    },
    nextDisabled() {
      return this.$store.state.nextDisabled
    }
  },
  watch: {
    num(now, old) {
      if (now === this.quesNos - 1) {
        this.$store.commit('nextDisableTrue')
      } else {
        this.$store.commit('nextDisableFalse')
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
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
    setnum(index) {
      this.$store.commit('setnum', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
}
</style>

