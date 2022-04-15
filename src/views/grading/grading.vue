<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="8" :xs="24">
          <Card v-if="flag &&this.paperId && this.stuData!==undefined" :exam_date="examDate" :quesNos="quesNos"
                @gradingThis="gradingThis" :stuData="stuData"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag &&this.paperId && this.stuData!==undefined" :exam_date="examDate" :examId="examId" :quesNos="quesNos"
                   @gradingThis="gradingThis" :stuData="stuData"/>
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
      paperId: undefined,
      examId:undefined,
      examDate: null,
      examValue: null,
      stuData:[],
      quesNos: 0,
    }
  },
  created() {
    this.paperId = this.$route.query.paperId
    this.examId =this.$route.query.examId
    this.fetchAllQues()
  },
  methods: {
    fetchAllQues(){
      request({
        url: 'exam/mark/allQues/' + this.paperId,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.examDate = response
        this.$store.commit('setNum', response[0].quesNo)
        this.getQuesNos()
        this.flag = true
      }).catch(err => {
        console.log(err)
      })
    },
    gradingThis(item){
      this.stuData = undefined
      this.$store.commit('gradingThis')
      request({
        url: 'exam/mark/hand/' + this.examId + '/' + item,
        method: 'get',
      }).then(response => {
        console.log(response)
        this.stuData = response
      }).catch(err => {
        console.log(err)
      })
    },
    getQuesNos() {
      this.quesNos = this.examDate.length+this.examDate[0].quesNo
    }
  },
  updated() {
    console.log(this.stuData)
  }
}
</script>
<style lang="scss">
</style>
