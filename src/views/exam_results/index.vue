<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="7" :xs="24">
          <Card v-if="flag" :exam_date="examDate" :quesNos="quesNos" />
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag" :exam_date="examDate" :quesNos="quesNos"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Card from './components/Card'
import Display from './components/Display'
import request from '@/utils/request'

export default {
  components: { Card, Display},
  data() {
    return {
      flag: false,
      paperId: 1,
      examDate: null,
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
