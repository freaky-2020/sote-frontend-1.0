<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title_content">答题卡
        <div style="float: right;margin: -5px" v-if=" paperData !== undefined">
          <el-button type="success" size="mini" @click="endView" >结束预览</el-button>
        </div>
        <div style="float: right;margin: -5px" v-if=" paperData === undefined">
          <el-button type="success" size="mini" @click="endView" >返回</el-button>
        </div>
      </div>
    </div>
    <el-scrollbar style="height: 550px" wrap-style="overflow-x:hidden;">
      <div v-if="exam_date !== undefined">
        <h4>学生姓名：{{realName}}</h4>
        <h4>学号：{{userName}}</h4>
        <h4 style="color: green;display: inline">{{exam_date.totalScore}}/</h4>
        <h4 style="color: red;display: inline">{{exam_date.maxScore}}</h4>
        <h3>一、单选题</h3>
        <el-button v-for="(question,index) in exam_date.papers" :key="index" v-if="question.typeId===1"
                   :type="question.answer === exam_date.examDetails[index].answer?'success':'danger'"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>二、多选题</h3>
        <el-button v-for="(question,index) in exam_date.papers" :key="index" v-if="question.typeId===2"
                   :type="question.answer === exam_date.examDetails[index].answer?'success':'danger'"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>三、判断题</h3>
        <el-button v-for="(question,index) in exam_date.papers" :key="index" v-if="question.typeId===3"
                   :type="question.answer === exam_date.examDetails[index].answer?'success':'danger'"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>四、填空题</h3>
        <el-button v-for="(question,index) in exam_date.papers" :key="index" v-if="question.typeId===4"
                   :type="question.answer === exam_date.examDetails[index].answer?'success':'danger'"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>五、简答题</h3>
        <el-button v-for="(question,index) in exam_date.papers" :key="index" v-if="question.typeId===5"
                   :type="question.score===exam_date.examDetails[index].score?'success':'danger'"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
      </div>

      <div v-if="paperData !== undefined">
        <h3>一、单选题</h3>
        <el-button v-for="(question,index) in paperData[1]" :key="index" v-if="question.typeId===1"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>二、多选题</h3>
        <el-button v-for="(question,index) in paperData[2]" :key="index" v-if="question.typeId===2"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>三、判断题</h3>
        <el-button v-for="(question,index) in paperData[3]" :key="index" v-if="question.typeId===3"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>四、填空题</h3>
        <el-button v-for="(question,index) in paperData[4]" :key="index" v-if="question.typeId===4"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
        <h3>五、简答题</h3>
        <el-button v-for="(question,index) in paperData[5]" :key="index" v-if="question.typeId===5"
                   size="mini" @click="setQuesNo(question.quesNo)">
          {{question.quesNo}}
        </el-button>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Card',
  props: ['exam_date','quesNos','userName','realName','paperData'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      input:'',
      select:'1',
      sum: 0,
      details: 6,
      detailDate: null,
      total: 0,
      page: 1,
      limit: 10,
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
    },
    nextDisabled() {
      return this.$store.state.nextDisabled
    },
    newStuData(){
      if (this.select === '1') {
        return this.stuData.filter((u) => {
          return u.user.userName.indexOf(this.input) !== -1
        })
      } else {
        return this.stuData.filter((u) => {
          if(u.realName === null){
            return null
          }
          return u.user.realName.indexOf(this.input) !== -1
        })
      }
    }
  },
  methods: {
    setQuesNo(index){
      this.$store.commit('setQuesNo', index)
      this.$store.commit('addSum')
    },
    endView(){
      this.$router.go(-1)
    }
  },
  mounted() {
  },
  watch: {
  },
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
}
el-button{
  display: inline;
}
</style>

