<template>
  <el-card>
    <div>
      <!--      @click是v-on:click的缩写，这时v-for循环的index就起到了用处，将所点击的button的index下标传到clickbtnX方法内-->
      <!--      :type是v-bind:type的缩写，其意思是判断flagX是否等于index+1，如果等于，加上名为primary的样式，如果不等于则空-->
      <!--      index代表四个选项中的第几个，即flagx对应哪个选项，哪个选项的按钮的颜色就变深-->
      <!--      v-for需要有:key="item.id，否则会报错"-->

      <!--      <a @click="goAnchor('#masd')">点击这里跳转</a>-->

      <div>
        <div v-for="data in examDate" :key="data.id">

          <div v-if="data.type===1">
            <div slot="header" class="clearfix">
              <h3 class="box-center">一、单选题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content" :key="question.id">
              <div :id="ques(question.ques_no)">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <!--              上面的那个id，用来答题卡定位...ques_no代表题号，因为没法直接取得所有试题的序号，只能取出一种题型的序号-->
                <!--              choice也需要再嵌套一层，因为id用来显示是否选中按钮，同时也不同用四个按钮，直接一个for循环-->
                <!--方法一-->
                <el-button class="circle_btn" size="mini" circle :type="question.answer===1?'primary':''" @click="question.answer=1">A</el-button>
                {{ question.choice1 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===2?'primary':''" @click="question.answer=2">B</el-button>
                {{ question.choice2 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===3?'primary':''" @click="question.answer=3">C</el-button>
                {{ question.choice3 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer===4?'primary':''" @click="question.answer=4">D</el-button>
                {{ question.choice4 }}
                <!--方法二-->
                <!--                <div v-for="(options,index) in navList" :key="options.id" @click="clickbtnX(index)">-->
                <!--                  <el-button class="circle_btn" size="mini" circle :type="question.answer===(index+1)?'primary':''">{{ options.name }}</el-button>-->
                <!--                  {{ question.choice[index].name }}-->
                <!--                </div>-->
              </div>
            </div>
          </div>

          <div v-else-if="data.type===2">
            <div slot="header" class="clearfix">
              <h3 class="box-center">二、多选题（共1题，0.00分）</h3>
            </div>
            <div v-for="(question,index) in data.content" :key="question.id">
              <div :id="ques(question.ques_no)">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(1)?'primary':''" @click="anwser_group(index,1)">A</el-button>
                {{ question.choice1 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(2)?'primary':''" @click="anwser_group(index,2)">B</el-button>
                {{ question.choice2 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(3)?'primary':''" @click="anwser_group(index,3)">C</el-button>
                {{ question.choice3 }}<br>
                <el-button class="circle_btn" size="mini" circle :type="question.answer.includes(4)?'primary':''" @click="anwser_group(index,4)">D</el-button>
                {{ question.choice4 }}
              </div>
            </div>
          </div>

          <div v-else-if="data.type===3">
            <div slot="header" class="clearfix">
              <h3 class="box-center">三、判断题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content" :key="question.id">
              <div :id="ques(question.ques_no)">
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
            <div v-for="question in data.content" :key="question.id">
              <div :id="ques(question.ques_no)">
                <h3 class="box-center" v-html="question.ques_no+'、'+question.title" />
                <!--          题干传过来字符串，用{}表示空的位置，使用jquery来替代{}字符为<input type="text">,然后使用v-html来转换为____，题干题干中间可以有多个____，-->
                <!--                另外，input好像都要绑定一个数据v-model，这样正好可以获取用户输入的答案，比如：v-model="ruleForm.resource[index]"-->
              </div>
            </div>
          </div>

          <div v-else-if="data.type===5">
            <div slot="header" class="clearfix">
              <h3 class="box-center">五、简答题（共1题，0.00分）</h3>
            </div>
            <div v-for="question in data.content" :key="question.id">
              <div :id="ques(question.ques_no)">
                <h3 class="box-center">{{ question.ques_no }}、{{ question.title }}</h3>
                <el-input v-model="question.answer" type="textarea" :rows="5" resize="none" maxlength="500" />
              </div>
            </div>
          </div>
        </div>

        <!--        填空题模板-->
        <!--        <br><br>-->
        <!--        <div class="input-box">-->
        <!--          <label id="label_" class="input-box__label"></label>-->
        <!--          <input type="text" id="input_" class="input-box__input"/>-->
        <!--        </div>-->

      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      examDate: [
        {
          type: 1,
          content: [
            { title: '题目1', choice1: '选项1', choice2: '选项2', choice3: '选项3', choice4: '选项4', answer: [0], ques_no: 1 },
            { title: '题目2', choice1: '选项1', choice2: '选项2', choice3: '选项3', choice4: '选项4', answer: [0], ques_no: 2 }
          ] },
        ]
    }
  },
  mounted() {
    document.querySelector('#input_').addEventListener('input', (e) => {
      document.querySelector('#label_').innerHTML = e.target.value
    })
  },
  methods: {
    anwser_group(index, select) {
      // 存在的话就取消，不存在就添加
      if (this.examDate[1].content[index].answer.includes(select)) {
        // includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        const x = this.examDate[1].content[index].answer.indexOf(select) // 判断数组中是否有选中的id,如果有则去掉
        if (x > -1) {
          this.examDate[1].content[index].answer.splice(x, 1)
        }
      } else {
        this.examDate[1].content[index].answer.push(select)
      }
    },
    ques(no) {
      return 'ques' + no
    }
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

// jQuery部分
// $(function(){
//   $('.box-center').click(function() {
//     alert(1)
//   })
// })
// function test(obj)
// {
//   var oRange = obj.createTextRange();
//   obj.style.width = oRange.boundingWidth;
// }
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
