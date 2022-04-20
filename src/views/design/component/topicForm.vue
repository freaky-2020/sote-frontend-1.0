<template>
  <div class="filter-container" v-if="isShow">
    <div style="margin-bottom: 20px">
      <div style="float:left;display:inline; padding-top:10px;margin-bottom: 10px">
        <el-tag type="info" v-show="!isEditTitle" style="color: #F19E00FF ;font-size: 15px">{{topicTitle}}</el-tag>
        <!--        <el-input-->
        <!--          type="text"-->
        <!--          v-show="isEditTitle"-->
        <!--          v-model="topicData.title"-->
        <!--          @blur="handleBlur($event)"-->
        <!--          style="width: 100px"-->
        <!--          ref="inputTitle">-->
        <!--        </el-input>-->
        <!--        <el-button size="small" @click="editTitle" type="primary" style="margin-left: 10px" icon="el-icon-edit" circle></el-button>-->
<!--        这一部分是计算总分 总题目数的部分-->
        共<span type="danger" style="color: #f19e00;font-size: 15px">{{form.length}} </span>题,
        合计<span type="danger" style="color: #f19e00;font-size: 15px">{{sum}} </span>分

      </div>
      <div style="float:right;margin-bottom: 10px">
        <el-button type="primary" @click="isAddByBank=true" style="margin-left: 10px"
                   icon="el-icon-folder-add" size="medium" plain>题库选题</el-button>
        <el-button type="success" @click="isEditQuestion=true" style="margin-left: 10px"
                   icon="el-icon-circle-plus-outline" size="medium" plain>新增试题</el-button>
<!--        <el-button size="mini" @click="isAddByText=true"  style="margin-left: 10px">模板导题</el-button>-->
        <el-button type="danger" @click="deleteTopic"  style="margin-left: 10px"
                   icon="el-icon-delete" size="medium" plain>删除本题</el-button>
      </div>
    </div>
<!--    :row-style="{height:0+'px'}"-->
<!--    :cell-style="{padding:0+'px'}"-->
<!--    :header-cell-style="{padding:'0px'}"-->
    <div style="text-align: center">
      <el-table

        :data="form"
        style="width: 100%"
        border
        fit
        highlight-current-row>
        <el-table-column
          label="序号"
          width="70px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.quesNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题目内容"
          min-width="43%">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-html="scope.row.stem"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="答案"
          :formatter="getAnswer"
          min-width="25%">
        </el-table-column>
        <el-table-column
          label="分数"
          min-width="17%"
          prop="score">
          <template slot="header" slot-scope="scope">
            <span style="margin-right: 50px">分数</span>
            <el-popover
              placement="bottom"
              width="200"
              v-model="isUpdateAllScore">
              <el-input v-model.number="allScore" size="mini" style="margin-bottom: 10px"></el-input>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="isUpdateAllScore = false">取消</el-button>
                <el-button type="primary" size="mini" @click="updateAllScore(scope)">确定</el-button>
              </div>
              <el-link slot="reference" type="primary">批量修改</el-link>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <div slot="reference">
              <el-input type="number" size="mini" @input="getAllScore" v-model.number="scope.row.score"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="难度"
          min-width="15%">
          <template slot-scope="scope">
            <div slot="reference">
              <el-tag size="medium" >{{ mapLevel[scope.row.difficultyId] }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="150px"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-by-bank
      :isAddByBank="isAddByBank"
      :topicType="topicType"
      :paperId="paperId"
      :subjectId="subjectId"
      @fetchDataExam="fetchDataExam"
      @addByBankclose="isAddByBank = false"></add-by-bank>
    <edit-question
      :isEditQuestion="isEditQuestion"
      :question= "question"
      :topicType="topicType"
      :isDesign="true"
      :paperId="paperId"
      :subjectId="subjectId"
      :isDisabled="true"
      :editStatus="editStatus"
      @fetchDataExam="fetchDataExam"
      @editQuestionclose="isEditQuestion = false"></edit-question>
    <add-by-text
      :isAddByText="isAddByText"
      @addByTextclose="isAddByText = false"></add-by-text>
  </div>
</template>

<script>
import addByBank from '@/views/design/component/addByBank'
import editQuestion from '@/views/design/component/editQuestion'
import AddByText from '@/views/design/component/addByText'
import request from '@/utils/request'
export default {
  name: 'topicForm',
  props: {
    topicType: Number,
    topicTitle: String,
    paperId: Number,
    examForm: {
      type: Array
    },
    fetchData: Function,
    scoreSums: Number,
    subjectId:Number,
  },
  components: { AddByText, addByBank, editQuestion },
  data() {
    return {
      check: this.$store.state.check,
      fillItems: this.$store.state.fillItems,
      fillSum: this.$store.state.fillSum,
      isShow: true,
      optionsSubject:[
      ],
      isEditTitle: false,
      isAddByBank: false,
      isEditQuestion: false,
      isAddByText: false,
      isUpdateAllScore: false,
      sum: this.scoreSums,
      allScore: 0,
      question: {},
      editStatus:'',
      form: this.examForm,
      mapLevel: {
        1: '简单',
        2: '适中',
        3: '困难',
        4: '压轴'
      },
      mapAnswer: {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        ',': ''
      },
    }
  },
  methods: {
    handleBlur(e) {
      this.isEditTitle = false
      this.topicData.title = e.target.value
    },
    editTitle() {
      this.isEditTitle = true
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    deleteTopic() {
      this.$confirm('此操作将永久删除该大题确定吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isShow = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该题目,确定吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/exam/paper/delete/',
          method: 'Delete',
          data: [row],
        }).then(response => {
          console.log(response)
          this.$emit("fetchData")
        }).catch(err => {
          console.log(err)
        })
        this.form = this.form.filter((q) => {
          return q !== row
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleEdit(row) {
      console.log(row)
      if (row.typeId === 1) {
        row.answer = parseInt(row.answer)
      }
      if (row.typeId === 2) {
        row.answer = row.answer.toString()
        row.answer = row.answer.split(",")
        row.answer = row.answer.map(Number)
        this.$store.commit('updateCheck', row.answer);
      }
      if (row.typeId === 3) {
        row.answer = parseInt(row.answer)
      }
      if (row.typeId === 4) {
        row.answer = row.answer.split('|')
        this.fillSum = row.answer.length
        for (let i = 0; i < row.answer.length; i++) {
          this.fillItems[i].input = row.answer[i]
        }
        this.$store.commit('updateFillSum', this.fillSum)
        this.$store.commit('updateFillItems', this.fillItems)
        console.log(row.answer)
      }
      this.question = row
      this.isEditQuestion = true
      this.editStatus = 'edit'
      this.formatter(row)
    },
    updateAllScore() {
      this.isUpdateAllScore = false
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].score = this.allScore
      }
      this.getAllScore()
      console.log(this.form)
    },
    getAllScore() {
      let sums = 0
      for (let i = 0; i < this.form.length; i++) {
        sums += this.form[i].score
      }
      this.sum = sums
    },
    fetchDataExam() {
      this.$emit("fetchData")
    },
    getAnswer(row) {
      if (row.typeId === 1) {
        return this.mapAnswer[row.answer]
      } else if (row.typeId === 2) {
        let newAnswer = ''
        for (let i = 0; i < row.answer.length; i++) {
          newAnswer = `${newAnswer}${this.mapAnswer[row.answer[i]]}`
        }
        return newAnswer
      } else if (row.typeId === 3) {
        if (row.answer === "1") {
          return '正确'
        } else return '错误'
      } else if (row.typeId === 4) {
        return row.answer
      } else {
        return row.answer.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
      }
    },
    formatter(row) {
      for (let i = 0; i < this.optionsSubject.length; i++) {
        if (this.optionsSubject[i].id === row.subjectId) {
          return this.optionsSubject[i].subjectName
        }
      }
    },
    fetchMapSubject(){
      request({
        url: '/bank/subject',
        methods: 'Get',
      }).then(response => {
        this.optionsSubject =response
      }).catch( err =>{
        console.log(err)
      })
    },
  },
  mounted() {
    this.getAllScore()
    console.log(this.form)
  },
  created() {
  },
  updated() {
  },
  watch: {
    examForm() {
      this.form = this.examForm
      this.getAllScore()
    },
    form(newVal) {
      this.$emit('update:examForm', newVal);
      console.log(this.form)
    },
    sum: {
      handler: function(newVal) {
        this.$emit('update:scoreSums', newVal);
      },
      immediate: true,
      deep:true,
    },
  }
}
</script>

<style scoped>
ul,li{list-style:none;}
</style>
