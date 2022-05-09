<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="8" :xs="24">
          <Card v-if="flag"
                @backTo="$emit('backTo')"
                :viewFlag="viewFlag"
                :exam_date="examDate"
                :paperData="paperData"
                :quesNos="quesNos"
                :userName="$route.query.userName"
                :realName="$route.query.realName"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display
            v-if="flag"
            :exam_date="examDate"
            :paperData="paperData"
            :quesNos="quesNos"
            :isTeacher="isTeacher"
            :isView="$route.query.isView"
            @fetchAllQues="fetchAllQues"/>
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
  props:['paperId','isView'],
  components: { Card, Display},
  data() {
    return {
      flag: false,
      isTeacher:false,
      examId:undefined,
      examDate: undefined,
      paperData:undefined,
      viewFlag:undefined,
      quesNos: 0,
    }
  },
  created() {
    this.examId =this.$route.query.examId
    this.isTeacher = this.$route.query.isTeacher
    if(this.$route.query.isView === undefined){
      this.fetchAllQues()
    }
    if(this.$route.query.isView !== undefined || this.isView !== undefined){
      this.fetchPaper()
    }
    if(this.isView !== undefined){
      this.viewFlag = true
    }
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
        this.flag = true
      }).catch(err => {
        console.log(err)
      })
    },
    fetchPaper(){
      let newPaperId = this.$route.query.paperId
      if(this.paperId !==undefined){
        newPaperId = this.paperId
        alert(newPaperId)
      }
      request({
        url: 'exam/paper/' + newPaperId +'/get',
        method: 'get'
      }).then(response => {
        this.paperData = response
        console.log(this.paperData)
        this.flag =true
        this.$store.commit('setNum', this.examDate.papers[0].quesNo)
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style lang="scss">
</style>
