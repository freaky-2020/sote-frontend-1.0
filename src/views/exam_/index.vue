<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_date="examDate" :quesNos="quesNos" :details="details"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display ref="display" v-if="flag" :exam_date="examDate" :quesNos="quesNos" :details="details" :examId="exam_id" :times="present_time" :isCheat="isCheat" />
        </el-col>
        <el-col :span="3" :xs="24">
          <Countdown v-if="$route.query.isView===undefined" :exam-value="JSON.parse($route.query.examValue)" />
        </el-col>
        <el-col :span="3" :xs="24">
          <Detector/>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="tipsFlag" width="480px" class="commonDialog multi clickLight" center :close-on-click-modal="false">
      <div class="dialogTipsbox" >

        最多只能切屏{{totalNum}}次，你还可切换{{totalNum-scNum-1}}次，
        <br />
        <br />
        超过{{totalNum-scNum-1}}次将强行交卷！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="" @click="updateSc">我知道了</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Card from './components/Card'
import Display from './components/Display'
import Countdown from './components/Countdown'
import request from '@/utils/request'
import Detector from '@/views/exam_/components/detect'

export default {
  components: { Detector, Card, Display, Countdown },
  data() {
    return {
      flag: false,
      paperId: this.$route.query.paperId,
      details: this.$route.query.details,
      examDate: null,
      examValue: null,
      quesNos: null,
      totalNum:this.$route.query.cuttingTimes,
      scNum:0,
      tipsFlag:false,
      cutFlag:false,
      exam_id:this.$route.query.examId,
      examinee_id:this.$store.getters.name,
      present_time:this.$route.query.times,
      isCheat:false
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
    },
    getSc(){
      request({
        url:"exam/invi/getSc",
        method:'Get',
        params:{
          exam_id:this.exam_id,
          examinee_id:this.examinee_id,
          present_time:this.present_time
        }
      }).then(response=>{
        this.scNum=response
      })
    },
    updateSc(){
      this.tipsFlag = false
      request({
        url:"exam/invi/updateSc",
        method:'Get',
        params:{
          exam_id:this.exam_id,
          examinee_id:this.examinee_id,
          present_time:this.present_time,
          scNum:this.scNum+1
        }
      }).then(response=>{

      })

    },
    pageHidden(){
      this.cutFlag=!this.cutFlag
      if(this.cutFlag){
        this.getSc()
        if(this.scNum+1>=this.totalNum){
          this.isCheat=true
          console.log(this.isCheat)
          this.$refs.display.goSubmit(this.isCheat)
          request({
            url:"exam/invi/updateCheat",
            method:'Get',
            params:{
              exam_id:this.exam_id,
              examinee_id:this.examinee_id,
              present_time:this.present_time,
              isCheat:1
            }
          }).then(response=>{
            console.log(response)
          })
        }else{
          this.tipsFlag=true
        }
      }
    },
  },
  mounted() {
    this.getSc()
    // 监听滚动
    // window.addEventListener("scroll", this.handleScroll);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.pageHidden);
    // // 监听页面可见性
    window.addEventListener("visibilitychange", this.pageHidden);
  },
  destroyed() {
    window.removeEventListener("visibilitychange", this.pageHidden);
    // window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.pageHidden);
  },
}
</script>
<style lang="scss">
</style>
