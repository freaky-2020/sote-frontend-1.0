<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_data="examData" :quesNos="quesNos" />
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag" :exam_data="examData" :quesNos="quesNos"/>
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
      paperId: 1,
      examData: null,
      examValue: null,
      quesNos: null
    }
  },
  created() {
    this.fetchData()
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
