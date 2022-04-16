// 我的试卷页面
<template>
  <div class="background-container">
    <div id="myExam" class="article-container">
    <div class="wrapper">
      <ul class="top">
        <el-tabs v-model="activeExamsName" type="card">
          <el-tab-pane label="全部" name="all" ></el-tab-pane>
          <el-tab-pane label="开放中" name="ongoing"></el-tab-pane>
          <el-tab-pane label="未开始" name="future"></el-tab-pane>
          <el-tab-pane label="已结束" name="finished"></el-tab-pane>
          <el-tab-pane label="已公布" name="published"></el-tab-pane>
        </el-tabs>

        <li class="search-li">
            <el-input type="text" placeholder="试卷名称" class="search" v-model="key" size="medium"> </el-input>
            <el-button slot="append"  size="medium" icon="el-icon-search"></el-button>
            <!--            <i class="el-icon-search"></i>-->
        </li>
        <li>
            <el-button type="info" icon="el-icon-circle-plus-outline" @click.native.prevent="goToCreate" size="medium">添加考试</el-button>
        </li>
      </ul>

      <ul class="paper" v-if="displayExam!=null">
        <li class="item"
            v-for="(item,index) in newDisplayExam.slice((current-1)*pageSize,current*pageSize)" :key="index">
          <h4>{{item.examName}}</h4>
          <p class="examName">科目：{{item.subjectName}}</p>
          <p class="examName">考试须知：{{item.examNote}}</p>
          <div class="info">
            <span>考试口令：{{item.word}}  </span>
            <el-button type="text" icon="el-icon-document-copy" @click="copyLink(item.word)">
            </el-button>
            <br/>
            <span>允许考试&nbsp;{{item.allowableTime}}&nbsp;次 允许切屏&nbsp;{{item.cuttingTimes}}&nbsp;次</span>
            <br/>
            <i class="el-icon-time"></i><span>{{item.startTime.slice(0,16)}}到{{item.deadline.slice(0,16)}}可进入</span>
            <span>   考试时长{{item.durationTime}}分钟</span>
            <div class="nomargin" style="float: right">
              <el-dropdown @command="handleCommand(item)" trigger="click">
                <el-button  class="nomargin" icon="el-icon-edit" size="small">编辑<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">编辑考试信息</el-dropdown-item>
                  <el-dropdown-item command="design">设计考试题目</el-dropdown-item>
                  <el-dropdown-item command="delete">删除考试</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button  class="nomargin" @click="judge(item)" icon="el-icon-document-checked" size="small">批阅</el-button>
              <el-button v-if="activeExamsName === 'published'" class="nomargin" @click="grade(item)" icon="el-icon-s-data" size="small">成绩分析</el-button>
              <el-button v-if="activeExamsName === 'finished' " size="small" type="primary" @click="publishExam(item)" >公布成绩</el-button>
            </div>
          </div>
        </li>
      </ul>
<!--      <exam-list-t v-if="displayExam!=null"-->
<!--                 v-bind:displayExam="displayExam.slice((current-1)*pageSize,current*pageSize)"></exam-list-t>-->
      <div class="pagination">
        <el-pagination
          v-if="displayExam!=null"
          background
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
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top class="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>

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

    <el-dialog
      title="提示"
      :visible.sync="judgeDialog"
      width="30%">
      <el-select v-model="select" placeholder="请选择多选题判分模式">
        <el-option
          v-for="item in optionsJudge"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="judgeDialog = false">取 消</el-button>
    <el-button type="primary" @click="judgeSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import request from '@/utils/request'
// import examListT from '@/views/exam/components/examListT'
import clip from '@/utils/clipboard'

export default {
  components:{
    BackToTop,
    // examListT,
  },
  // examName: 'myExam'
  data() {
    return {
      judgeDialog:false,
      examineeId:this.$store.getters.name,
      activeExamsName:'all',
      wordDialogVisible:false,
      word:null,
      allSubject:null,
      select:1,
      allExam:null,
      futureExam:null,
      ongoingExam:null,
      finishedExam:null,
      publishedExam:null,

      loading: false,
      key: '', //搜索关键字

      current: 1, //当前页
      total: null, //记录条数
      pageSize: 6, //每页条数
      optionsJudge:[
        {
          value: 1,
          label: '选不全不得分'
        }, {
          value: 2,
          label: '选不全得半分'
        }
      ]
    }
  },
  computed:{
    displayExam:function(){
      this.current=1
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
        return u.examName.indexOf(this.key) !== -1
      })
    }
  },
  watch: {
    name(){
      this.current =1
      this.getExamInfo()
    }
  },
  created() {
    this.getAllSubject()//1

    // this.getExamInfo()//2
    // this.loading = true
  },
  updated() {

  },
  methods: {
    copyLink(val) { // 复制链接
      console.log(val, '复制链接')
      let url = val // 后台接口返回的链接地址
      let inputNode = document.createElement('input')  // 创建input
      inputNode.value = url // 赋值给 input 值
      document.body.appendChild(inputNode) // 插入进去
      inputNode.select() // 选择对象
      document.execCommand('Copy') // 原生调用执行浏览器复制命令
      inputNode.className = 'oInput'
      inputNode.style.display = 'none' // 隐藏
      this.$message.success('复制成功')
    },
    handleCommand(item) {
        this.$router.push({ name: 'Design',
          query: {
            paperId:item.paperId,
            examId:item.examId,
          } })
    },
    editExamInfo() {

    },
    deleteExam() {

    },
    getAllSubject() {
      request({
        url: '/bank/subject',
        method: 'Get',
      }).then(res => {
        this.allSubject = res
        this.getExamInfo()
        //先获取科目，再获取考试信息
      })
    },
    getExamSubject() {
      for (var i = 0; i < this.allSubject.length; i++) {
        for (var j = 0; j < this.ongoingExam.length; j++) {
          if (this.ongoingExam[j].subjectId === this.allSubject[i].id) {
            // console.log(this.allSubject[j].subjectName)
            this.ongoingExam[j].subjectName = this.allSubject[i].subjectName
            // break
          }
        }
        for (var j = 0; j < this.finishedExam.length; j++) {
          if (this.finishedExam[j].subjectId === this.allSubject[i].id) {
            this.finishedExam[j].subjectName = this.allSubject[i].subjectName
            // break;
          }
        }
        for (var j = 0; j < this.futureExam.length; j++) {
          if (this.futureExam[j].subjectId === this.allSubject[i].id) {
            this.futureExam[j].subjectName = this.allSubject[i].subjectName
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
    getExamInfo(val) {
      request({
        // url:'/exam/info/query',
        // url:'/exam/stu/getExam/stu/{userName}'+this.userName
        url: '/exam/info/query' ,
        method: 'Get',
        params: { invigilatorId: this.$store.getters.name },
      }).then(res => {
        console.log(res)
        // this.allExam=res
        this.futureExam = res[0]
        this.ongoingExam = res[1]
        this.finishedExam = res[2]
        this.publishedExam = res[3]
        this.getExamSubject();
        this.allExam = this.ongoingExam.concat(this.futureExam).concat(this.finishedExam).concat(this.publishedExam)
        console.log(this.allExam)
        this.loading = false
        if(val === 1){
          this.activeExamsName = 'published'
        }
        val = 0
      })
    },
    goToCreate() {
      this.$router.push({ path: '/createexam/examinfo', })
    },
    enterExam() {
      request({
        url: '/exam/stu/join/' + this.word,
        method: 'Get',
        params: { examineeId: this.examineeId }
      }).then(res => {
        console.log(res)
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
    judge(item) {
      this.judgeItem = item
      this.judgeDialog = true
    },
    judgeSubmit() {
      this.judgeDialog = false
      request({
        url: '/exam/mark/auto/' + this.judgeItem.examId,
        method: 'Get',
        params: {rule: this.select},
      }).then(res => {
        console.log(res)
        if(res.indexOf('答卷') !== -1){
          if(confirm(res+'是否进入简答题批阅?')){
            this.$router.push({ name: 'Grading',
              query: {
                paperId:this.judgeItem.paperId,
                examId:this.judgeItem.examId
              } })
          }
        }
        else{
          alert(res)
        }
      })
    },
    grade(item) {
      this.$router.push({ name: 'Grade', query: {
        examId:item.examId
        } })
    },

    publishExam(item){
      if(confirm('是否公布考试结果?')){
        request({
          url: 'exam/info/try/publish/' + item.examId,
          method: 'get',
        }).then(response => {
          if(response.indexOf('成绩与答案') !== -1){
            alert(response)
            this.getExamInfo(1)
          }
          else if(response.indexOf('未全部批阅') !== -1){
            if(confirm(response)){
              request({
                url: 'exam/info/publish/' + item.examId,
                method: 'get',
              }).then(response => {
                alert(response)
              }).catch(err => {
                console.log(err)
              })
              this.getExamInfo(1)
            }
          }
          else{
            alert(response)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
  margin: 20px;
}
#myExam {
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



//paperItem：：：：
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
  width: 100%;
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
