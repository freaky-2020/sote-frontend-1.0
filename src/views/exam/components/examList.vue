<template>
<!--  <ul class="paper" v-loading="loading">-->
  <ul class="paper" >
    <li class="item"  v-for="(item,index) in displayExam" :key="index">
      <h4  @click="toExam(item)">{{item.examInfo.examName}}</h4>
      <p class="examName">科目：{{item.examInfo.subjectName}}---{{item.examInfo.examNote}}</p>
      <div class="info">
        <span>允许考试&nbsp;{{item.examInfo.allowableTime}}&nbsp;次 已完成{{item.time}}次</span>
        <br/>
        <i class="el-icon-time"></i><span>{{item.examInfo.startTime.slice(0,16)}}到{{item.examInfo.deadline.slice(0,16)}}可进入</span>
<!--        <i class="iconfont icon-icon-time"></i><span>限时{{item.durationTime}}分钟</span>-->
        <br />
        <span>考试时长{{item.examInfo.durationTime}}分钟</span>

        <!--            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>-->
        <!--            <el-tag type="info">{{item.subject}}</el-tag>-->
      </div>
    </li>
  </ul>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      userName:1904011106,
      examValue:{},
    }
  },
  props:[
    'displayExam',
    'getExamInfo'
  ],
  methods:{
    toExam(item) {
      request({
        url:'/exam/stu/start/'+this.userName+'/'+item.examInfo.examId+'/'+(item.time+1),
        method:'Get',
      }).then(res=>{
        console.log(res)
        Object.keys(res).forEach(key=>{
          console.log(key)
            if(key === 'success'){
              console.log(res['success'])
              this.$router.push({name: 'Exam_', query: {examValue: JSON.stringify(res['success']) }})
            }
            else{
              alert(key)
              this.$emit("getExamInfo")
            }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  li{
    list-style-type:none;
    margin: 10px;
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
    width: 360px;
    border-radius: 6px;
    padding: 20px 30px;
    border: 1px solid #eee;
    box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
    transition: all 0.6s ease;
  }
  .paper .item:hover {
    box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
    transform: scale(1.03);
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

</style>
