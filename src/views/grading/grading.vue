<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="8" :xs="24">
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
import request from '@/utils/request'

export default {
  components: { Card, Display},
  data() {
    return {
      flag: false,
      paperId: 9,
      examId:9,
      examDate: null,
      examValue: null,
      stuTable:[
        {

        },
        {

        },
      ]
    }
  },
  created() {
    this.fetchData()
    // this.paperId =this.$route.query.paperId
    // this.examId=this.$route.query.examId
    // alert(this.paperId)
    // alert(this.examId)
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
    },
    // fetchAllQues(){
    //   request({
    //     url: 'exam/mark/' + this.paperId + '/get',
    //     method: 'get'
    //   }).then(response => {
    //     console.log(response)
    //     this.examDate = response
    //     this.flag = true
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    fetchHand(){

    }
  }
}
</script>
<style lang="scss">
</style>
