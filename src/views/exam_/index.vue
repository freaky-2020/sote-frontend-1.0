<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_date="examData" :quesNos="quesNos" :details="$route.query.details"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display ref="display" v-if="flag" :exam_date="examData" :quesNos="quesNos" :details="details" :examId="exam_id" />
        </el-col>
        <el-col :span="3" :xs="24">
          <!--          <Countdown :exam-value="JSON.parse($route.query.examValue)" />-->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Card from './components/Card'
import Display from './components/Display'
import Countdown from './components/Countdown'
import request from '@/utils/request'

export default {
  components: { Card, Display, Countdown },
  data() {
    return {
      flag: false,
      examData: null,
      paperId: this.$route.query.paperId,
      details: this.$route.query.details,
      examDate: null,
      examValue: null,
      quesNos: null
    }
  },
  created() {
    this.fetchData()
    let examValue = JSON.parse(this.$route.query.examValue)
    this.paperId = examValue.examInfo.paperId
  },
  methods: {
    fetchData() {
      request({
        url: 'exam/paper/' + this.paperId + '/get',
        method: 'get'
      }).then(response => {
        console.log(response)
        this.examData = response
        this.flag = true
        this.getQuesNos()
      }).catch(err => {
        console.log(err)
      })
    },
    getQuesNos() {
      this.quesNos = this.examData[1].length + this.examData[2].length + this.examData[3].length + this.examData[4].length + this.examData[5].length
    }
  }
}
</script>
<style lang="scss">
</style>
