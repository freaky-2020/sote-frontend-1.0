<template>
  <div>
    <span>{{scNum}}</span>
    <div>
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
  </div>


</template>

<script>
import request from '@/utils/request'
export default {
  name: 'index',
  data(){
    return{
      totalNum:10,
      scNum:0,
      tipsFlag:false,
      cutFlag:false,
      exam_id:1,
      examinee_id:this.$store.getters.name,
      present_time:1,
    }
  },
  methods:{
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

<style scoped>

</style>
