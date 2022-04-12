<template>
<!--  <ul class="paper" v-loading="loading">-->
  <ul class="paper">
    <li class="item" v-for="(item,index) in displayExam" :key="index">
      <h4 @click="toExam(item)">{{item.examInfo.examName}}</h4>
      <p class="examName">科目：{{item.examInfo.subjectName}}---{{item.examInfo.examNote}}</p>
      <div class="info">
        <span>考试口令：{{item.examInfo.word}}  </span>
        <el-button type="text" icon="el-icon-document-copy" @click="handleCopy(item.examInfo.word,$event)">
        </el-button>
        <br/>
        <span>允许考试&nbsp;{{item.examInfo.allowableTime}}&nbsp;次 允许切屏&nbsp;{{item.examInfo.cuttingTimes}}&nbsp;次</span>
        <br/>
        <i class="el-icon-time"></i><span>{{item.examInfo.startTime.slice(0,16)}}到{{item.examInfo.deadline.slice(0,16)}}可进入</span>
<!--        <i class="iconfont icon-icon-time"></i><span>限时{{item.durationTime}}分钟</span>-->
        <span>   考试时长{{item.examInfo.durationTime}}分钟</span>
        <div class="nomargin" style="float: right">
          <el-dropdown>
            <el-button  class="nomargin" icon="el-icon-edit" size="mini">编辑<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>编辑考试信息</el-dropdown-item>
              <el-dropdown-item>设计考试题目</el-dropdown-item>
              <el-dropdown-item >删除考试</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button  class="nomargin" icon="el-icon-document-checked" size="mini">批阅</el-button>
          <el-button  class="nomargin" icon="el-icon-s-data" size="mini">成绩分析</el-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import request from '@/utils/request'
import clip from '@/utils/clipboard'

export default {
  data() {
    return {
      userName:1904011106,
    }
  },
  props:[
    'displayExam'
  ],
  methods:{
    toExam(item) {
      // request({
      //   url:'/exam/stu/start/'+this.userName+'/'+item.examInfo.examId+'/'+(item.time+1),
      //   method:'Get',
      //
      // }).then(res=>{
      //   console.log(res)
      // })

      // this.$router.push({path: '/examMsg', query: {examId: examId}})
      // console.log(examId)
    },
    handleCopy(text, event) {
      clip(text, event)
    },
  }
}
</script>
<style lang="scss" scoped>
  li{
    list-style-type:none;
  }
  .paper {
  h4 {
    cursor: pointer;
  }
  .item a {
    color: #000;
  }
  }

  //.wrapper .top .order {
    //  cursor: pointer;
    //}
  //.wrapper .top .order:hover {
    //  color: #0195ff;
    //  border-bottom: 2px solid #0195ff;
    //}
  //.wrapper .top .order:visited {
    //  color: #0195ff;
    //  border-bottom: 2px solid #0195ff;
    //}
  .item .info i {
    margin-right: 5px;
    color: #0195ff;
  }
  .item .info span {
    //margin-right: 14px;
  }
  .paper .item {
    width: 80%;
    border-radius: 6px;
    padding: 20px 30px;
    border: 1px solid #eee;
    box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
    transition: all 0.6s ease;
  }
  .paper .item:hover {
    box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
    transform: scale(1.01);
  }
  .paper .item .info {
    font-size: 13px;
    color: #88949b;
  }
  .paper .item .examName {
    font-size: 14px;
    color: #88949b;
  }
  .paper * {
    margin: 12px 0;
  }
  .wrapper .paper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .nomargin *{
    margin: 0px 5px;
  }
</style>
