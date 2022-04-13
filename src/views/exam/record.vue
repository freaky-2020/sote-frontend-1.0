// 我的试卷页面
<template>
  <div id="myExam">
    <!--    <div class="title">我的试卷</div>-->
    <div class="wrapper">
      <ul class="top">
        <li class="order">考试记录</li>
        <li class="search-li">
          <div class="icon">
            <el-input type="text" placeholder="考试名称" class="search" v-model="key" size="mini"></el-input>
            <!--            <i class="el-icon-search"></i>-->
          </div>
        </li>
        <li><el-button type="primary" @click="search()" size="mini">搜索记录</el-button></li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toExamMsg(item.examCode)">{{item.source}}<span style="float: right;">得分：
            <span style="font-family: 'Lucida Handwriting',serif ;font-size: 15px">{{item.score}}</span>
          </span>
          </h4>
          <p class="name">{{item.source}}-{{item.description}}</p>
          <div class="info">
            <i class="el-icon-time"></i><span>{{item.examDate.slice(0,16)}}开始</span>
            <span>满分{{item.totalScore}}分</span>
            <el-button type="primary" size="mini" @click="toExamMsg(item.examCode)" style="float: right">查看试卷</el-button>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[6, 10, 20, 40]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      pagination: { //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
        records:[
          {
            examCode:123,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            score:88,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络2',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            score:67,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络3',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },{
            examCode:123,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },{
            examCode:123,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },
          {
            examCode:456,
            source:'计算机网络',
            examDate:'2022-03-29 08:00:00',
            totalTime:60,
            totalScore:100
          },
        ],
      }
    }
  },
  // created() {
  //   this.getExamInfo()
  //   this.loading = true
  // },
  // watch: {

  // },
  methods: {
    //获取当前所有考试信息
    getExamInfo() {
      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data
        this.loading = false
        console.log(this.pagination)
      }).catch(error => {
        console.log(error)
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    //搜索试卷
    search() {
      this.$axios('/api/exams').then(res => {
        if(res.data.code == 200) {
          let allExam = res.data.data
          let newPage = allExam.filter(item => {
            return item.source.includes(this.key)
          })
          this.pagination.records = newPage
        }
      })
    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({path: '/examMsg', query: {examCode: examCode}})
      console.log(examCode)
    }
  }
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
  margin-right: 14px;
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
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 13px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 17px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
</style>
