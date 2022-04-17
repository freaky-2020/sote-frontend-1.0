// 我的试卷页面
<template>
  <div class="background-container">
  <div id="myExam" class="article-container">
<!--    <div class="title">我的试卷</div>-->
    <div class="wrapper">
      <ul class="top">
        <el-tabs v-model="activeExamsName" type="card">
          <el-tab-pane label="全部" name="all" ></el-tab-pane>
          <el-tab-pane label="开放中" name="ongoing"></el-tab-pane>
          <el-tab-pane label="未开始" name="future"></el-tab-pane>
          <el-tab-pane label="已结束" name="finished"></el-tab-pane>
          <el-tab-pane label="已发布" name="published"></el-tab-pane>
        </el-tabs>

        <li class="search-li">
          <el-input type="text" placeholder="试卷名称" class="search" v-model="key" size="medium"> </el-input>
          <el-button slot="append" size="medium" icon="el-icon-search"></el-button>
          <!--            <i class="el-icon-search"></i>-->
        </li>
        <li>
          <el-tooltip content="输入老师告知的口令加入一场考试" placement="bottom" effect="light">
          <el-button type="info" icon="el-icon-circle-plus-outline" @click.native.prevent="wordDialogVisible=true" size="medium">加入考试</el-button>
          </el-tooltip>
        </li>
      </ul>
      <exam-list v-if="displayExam!=null" @getExamInfo="getExamInfo"
        v-bind:displayExam="newDisplayExam.slice((current-1)*pageSize,current*pageSize)"></exam-list>
<!--      <ul class="paper" v-loading="loading" v-show="activeExamsName==='all'">-->
<!--        <li class="item" v-for="(item,index) in displayExam" :key="index">-->
<!--          <h4 @click="toExamMsg(item.examId)">{{item.examName}}</h4>-->
<!--          <p class="examName">科目：{{item.subjectName}}-&#45;&#45;{{item.examNote}}</p>-->
<!--          <div class="info">-->
<!--            <span>允许考试&nbsp;{{item.allowableTime}}&nbsp;次</span>-->
<!--            <br/>-->
<!--            <i class="el-icon-time"></i><span>{{item.startTime.slice(0,16)}}到{{item.deadline.slice(0,16)}}可进入</span>-->
<!--            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.durationTime}}分钟</span>-->
<!--            <br />-->
<!--&lt;!&ndash;            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-tag type="info">{{item.subject}}</el-tag>&ndash;&gt;-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
      <div class="pagination">
        <el-pagination
          background
          v-if="displayExam!=null"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[6, 9, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="newDisplayExam.length"
          >
        </el-pagination>
      </div>
    </div>

    <el-dialog title="加入考试" :visible.sync="wordDialogVisible">
      <el-form >
        <el-form-item label="输入口令：">
          <el-input v-model="word" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="wordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterExam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
// import dragSelect from '@/views/exam/components/drag-select'
import BackToTop from '@/components/BackToTop'
import request from '@/utils/request'
import examList from '@/views/exam/components/examList'
import clip from '@/utils/clipboard'
export default {
  components:{
      // dragSelect,
      BackToTop,
      examList,
  },
  // examName: 'myExam'
  data() {
    return {
      examineeId:this.$store.getters.name,

      activeExamsName:'all',
      wordDialogVisible:false,
      word:'',

      allSubject:null,

      allExam:null,
      futureExam:null,
      ongoingExam:null,
      finishedExam:null,
      publishedExam:null,
      map:[],
      loading: false,
      key: '', //搜索关键字

        current: 1, //当前页
        total: null, //记录条数
        pageSize: 6, //每页条数

    }
  },
  computed:{
    displayExam:function(){
      if(this.activeExamsName=== 'all'){
        return this.allExam
      }else if(this.activeExamsName ==='ongoing'){
        return this.ongoingExam
      }else if(this.activeExamsName ==='future'){
        return this.futureExam
      }else if(this.activeExamsName==='finished'){
        return this.finishedExam
      }else if(this.activeExamsName==='published'){
        return this.publishedExam
      }
    },
    newDisplayExam(){
      return this.displayExam.filter((u) => {
        return u.examInfo.examName.indexOf(this.key) !== -1
      })
    }
  },
  created() {
    this.getAllSubject()//1

    // this.getExamInfo()//2
    // this.loading = true
  },

  methods: {
    getAllSubject(){
      request({
        url:'/bank/subject',
        method:'Get',
      }).then(res=>{
        this.allSubject=res
        this.getExamInfo()
        //先获取科目，再获取考试信息
      })
    },
    getExamSubject(){
      for(var i=0;i<this.allSubject.length;i++){
        for(var j=0;j<this.ongoingExam.length;j++){

          if(this.ongoingExam[j].examInfo.subjectId===this.allSubject[i].id){
            // console.log(this.allSubject[j].subjectName)
            this.ongoingExam[j].examInfo.subjectName=this.allSubject[i].subjectName
            // break
          }
        }
        for(var j=0;j<this.finishedExam.length;j++){
          if(this.finishedExam[j].examInfo.subjectId===this.allSubject[i].id){
            this.finishedExam[j].examInfo.subjectName=this.allSubject[i].subjectName
            // break;
          }
        }
        for(var j=0;j<this.futureExam.length;j++){
          if(this.futureExam[j].examInfo.subjectId===this.allSubject[i].id){
            this.futureExam[j].examInfo.subjectName=this.allSubject[i].subjectName
            // break;
          }
        }
        for (var j = 0; j < this.publishedExam.length; j++) {
          if (this.publishedExam[j].subjectId === this.allSubject[i].id) {
            this.publishedExam[j].subjectName = this.allSubject[i].subjectName
            // break;
          }
        }
      }
    },
    //获取当前所有考试信息
    getExamInfo() {
      request({
        // url:'/exam/info/query',
        // url:'/exam/stu/getExam/stu/{userName}'+this.userName
        url:'/exam/stu/getExam/stu/' + this.examineeId,
        method:'Get',
      }).then(res=>{
        console.log(res)
        // this.allExam=res
        this.futureExam=res[0]
        this.ongoingExam=res[1]
        this.finishedExam=res[2]
        this.publishedExam=res[3]
        this.getExamSubject();
        this.allExam=this.ongoingExam.concat(this.futureExam).concat(this.finishedExam).concat(this.publishedExam)
        this.loading = false
      })
      // this.$axios(`/api/exams/${this.current}/${this.size}`).then(res => {
      //   this.pagination = res.data.data
      //   this.loading = false
      //   console.log(this.pagination)
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    handleClickTab(tab, event){

    },

    enterExam(){
      this.word=this.word.replace('+','%2B').replace('/','%2F').replace('?','%3F').replace('%','%25').replace('#','%23').replace('&','%26').replace(' ','%3D');
        request({
          url:'/exam/stu/join/'+this.word,
          method:'Get',
          params:{examineeId:this.examineeId}
        }).then(res=>{
          console.log(res)
          this.getExamInfo()
          alert(res)
          this.word = ''
        })
        this.wordDialogVisible = false;
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pageSize = val
      // this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.current = val
      // this.getExamInfo()
    },
    //搜索试卷
    //跳转到试卷详情页
    // toExamMsg(examId) {
    //   this.$router.push({path: '/examMsg', query: {examId: examId}})
    //   console.log(examId)
    // }
  }
}
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
  //滚动条宽高，如果不需要显示滚动条可设置宽高为0
  width: 0px;
  height: 0px;
}

li{
  list-style-type:none;
}
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
//.paper {
//  h4 {
//    cursor: pointer;
//  }
//  .item a {
//    color: #000;
//  }
//}
//
////.wrapper .top .order {
////  cursor: pointer;
////}
////.wrapper .top .order:hover {
////  color: #0195ff;
////  border-bottom: 2px solid #0195ff;
////}
////.wrapper .top .order:visited {
////  color: #0195ff;
////  border-bottom: 2px solid #0195ff;
////}
//.item .info i {
//  margin-right: 5px;
//  color: #0195ff;
//}
//.item .info span {
//  margin-right: 14px;
//}
//.paper .item {
//  width: 360px;
//  border-radius: 6px;
//  padding: 20px 30px;
//  border: 1px solid #eee;
//  box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
//  transition: all 0.6s ease;
//}
//.paper .item:hover {
//  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
//  transform: scale(1.03);
//}
//.paper .item .info {
//  font-size: 13px;
//  color: #88949b;
//}
//.paper .item .examName {
//  font-size: 14px;
//  color: #88949b;
//}
//.paper * {
//  margin: 12px 0;
//}
//.wrapper .paper {
//  display: flex;
//  justify-content: space-around;
//  flex-wrap: wrap;
//}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
//.top .search:hover {
//  color: #0195ff;
//  border-color: #0195ff;
//}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 8px;
}
#myExam {
  background-color: #ffffff;
  width: 90%;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  //background-color: #fff;
  width: 100%;
}
.myBackToTopStyle{
    right: 50px;
    bottom: 50px;
    width: 40px;
    height: 0px;
  border-radius: 4px;
  line-height: 45px;// 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
  background: #e7eaf1// 按钮的背景颜色 The background color of the button

}
</style>
