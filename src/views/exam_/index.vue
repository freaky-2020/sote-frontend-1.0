<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_date="examDate" />
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <el-scrollbar style="height: 641px" wrap-style="overflow-x:hidden;">
            <Display v-if="flag" :exam_date="examDate"/>
          </el-scrollbar>
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
      examDate: null,
      examValue: null
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
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
</style>
