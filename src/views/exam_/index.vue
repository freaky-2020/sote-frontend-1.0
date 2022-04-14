<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card v-if="flag" :exam_date="examDate" :quesNos="quesNos" :details="$route.query.details"/>
          <!--          目标组件中props中的数据名 = 当前组件的数据-->
        </el-col>
        <el-col :span="15" :xs="24">
          <Display v-if="flag" :exam_date="examDate" :quesNos="quesNos" :details="$route.query.details"/>
        </el-col>
        <el-col :span="3" :xs="24">
          <Countdown v-if="$route.query.isView===undefined" :exam-value="JSON.parse($route.query.examValue)" />
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

export default {
  components: { Card, Display, Countdown },
  data() {
    return {
      flag: false,
      paperId: this.$route.query.paperId,
      examDate: null,
      examValue: null,
      quesNos: null,
      totalNum:10,
      scNum:0,
      tipsFlag:false,
      cutFlag:false,
      exam_id:this.$route.query.examId,
      examinee_id:this.$store.getters.name,
      present_time:1,
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
          alert("强制交卷")
          request({
            url:"exam/invi/updateCheat",
            method:'Get',
            params:{
              exam_id:this.exam_id,
              examinee_id:this.examinee_id,
              present_time:this.present_time,
              isCheat:1
            }
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
  }
}
</script>
<style lang="scss">
</style>
