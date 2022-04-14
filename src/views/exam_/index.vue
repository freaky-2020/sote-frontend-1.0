<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_date="examDate" :quesNos="quesNos" />
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag" :exam_date="examDate" :quesNos="quesNos" />
        </el-col>
        <el-col :span="3" :xs="24">
          <Countdown v-if="$route.query.isView===undefined" :exam-value="JSON.parse($route.query.examValue)" />
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
      paperId: 11,
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
        this.examDate = response
        this.flag = true
        this.getQuesNos()
      }).catch(err => {
        console.log(err)
      })
    },
    getQuesNos() {
      this.quesNos = this.examDate[1].length + this.examDate[2].length + this.examDate[3].length + this.examDate[4].length + this.examDate[5].length
    }
  }
}
</script>
<style lang="scss">
</style>
