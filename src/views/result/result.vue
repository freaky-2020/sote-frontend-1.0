<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="8" :xs="24">
          <Card v-if="flag" :exam_date="examDate" :quesNos="quesNos" :userName="$route.query.userName" :realName="$route.query.realName"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag" :exam_date="examDate" :quesNos="quesNos" :isTeacher="isTeacher" @fetchAllQues="fetchAllQues"/>
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
      isTeacher:false,
      paperId: undefined,
      examId:undefined,
      examDate: null,
      quesNos: 0,
    }
  },
  created() {
    this.examId =this.$route.query.examId
    this.isTeacher = this.$route.query.isTeacher
    this.fetchAllQues()
  },
  methods: {
    fetchAllQues(){
      request({
        url: 'exam/stu/getRes/' + this.$route.query.userName+'/'+this.examId,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.examDate = response[0]
        this.$store.commit('setNum', this.examDate.papers[0].quesNo)
        this.getQuesNos()
        this.flag = true
      }).catch(err => {
        console.log(err)
      })
    },
    getQuesNos() {
      this.quesNos = this.examDate.papers.length
    },
  }
}
</script>
<style lang="scss">
</style>
