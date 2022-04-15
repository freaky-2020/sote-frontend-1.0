<template>
  <el-card>
    <div>
      <div>
        <div v-for="data in examDate">


          <div v-if="data.type===1">
            <div slot="header" class="clearfix">
              <h3 class="box-center">一、单选题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content">
              <div :id="question.ques_no">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===1?'primary':''">A</el-button>
                {{ question.choice1 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===2?'primary':''">B</el-button>
                {{ question.choice2 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===3?'primary':''">C</el-button>
                {{ question.choice3 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===4?'primary':''">D</el-button>
                {{ question.choice4 }}
              </div>
            </div>
          </div>


          <div v-else-if="data.type===2">
            <div slot="header" class="clearfix">
              <h3 class="box-center">二、多选题（共1题，0.00分）</h3>
            </div>
            <div v-for="(question,index) in data.content">
              <div :id="question.ques_no">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(1)?'primary':''">A</el-button>
                {{ question.choice1 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(2)?'primary':''">B</el-button>
                {{ question.choice2 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(3)?'primary':''">C</el-button>
                {{ question.choice3 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(4)?'primary':''">D</el-button>
                {{ question.choice4 }}
              </div>
            </div>
          </div>


          <div v-else-if="data.type===3">
            <div slot="header" class="clearfix">
              <h3 class="box-center">三、判断题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content">
              <div :id="question.ques_no">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===1?'primary':''" @click="question.answer=1">A</el-button>
                正确<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===2?'primary':''" @click="question.answer=2">B</el-button>
                错误<br>
              </div>
            </div>
          </div>

          <div v-else-if="data.type===4">
            <div slot="header" class="clearfix">
              <h3 class="box-center">四、填空题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content">
              <div v-model="question.ques_no">
                <h3 class="box-center" v-html="question.ques_no+'、'+question.title"></h3>
              </div>
            </div>
          </div>

          <div v-else-if="data.type===5">
            <div slot="header" class="clearfix">
              <h3 class="box-center">五、简答题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content">
              <div :id="question.ques_no">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-input type="textarea" :rows="5" v-model="input" resize="none" maxlength="500"></el-input>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: ['exam_date', 'quesNos'],
  data() {
    return {
      details: 1,
    }
  },
  mounted() {
    document.querySelector('#input_').addEventListener('input', (e) => {
      document.querySelector('#label_').innerHTML = e.target.value;
    })
  },
  methods: {
    anwser_group(index,select){
      //存在的话就取消，不存在就添加
      if(this.examDate[1].content[index].answer.includes(select)){
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        let x = this.examDate[1].content[index].answer.indexOf(select); // 判断数组中是否有选中的id,如果有则去掉
        if(x > -1){
          this.examDate[1].content[index].answer.splice(x,1)
        }
      }else{
        this.examDate[1].content[index].answer.push(select)
      }
    },
    // fetchData() {
    //   axios({
    //     url: 'api/exam/paper/'+this.paperId+'/get',
    //     method: 'post',
    //     dataType: 'json',
    //     data: this.$refs.multipleTable.answerion ,
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8',
    //     }
    //   }).then(response => {
    //     console.log(response)
    //   }).catch( err =>{
    //     console.log(err)
    //   })
    // },
  }
}
</script>

<style lang="scss">
.circle_btn{
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}
.blank{
  border: none;
  padding: 0 5px;
  border-bottom: 1px solid;
}
/* 填空题样式 */
.input-box {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  border: none;
  border-bottom: 1px solid;
  height: 18px;
  min-width: 50px;
  /* font family is very important */
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}

.input-box__label {
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  visibility: hidden;
  font-family: inherit;
  height: 13px;
  padding: 0 10px;
}

.input-box__input {
  box-sizing: border-box;
  position: absolute;
  display: inline-block;
  font-size: inherit;
  font-family: inherit;
  line-height: normal;
  border-bottom: inherit;
  height: 100%;
  width: 100%;
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0 10px;
}
</style>
