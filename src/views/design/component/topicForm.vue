<template>
  <div class="filter-container" v-if="isShow">
    <div style="margin-bottom: 20px">
      <div style="float:left;display:inline; padding-top:10px;margin-bottom: 10px">
        <span v-show="!isEditTitle" style="color: #1482f0">{{topicTitle}}</span>
        <!--        <el-input-->
        <!--          type="text"-->
        <!--          v-show="isEditTitle"-->
        <!--          v-model="topicData.title"-->
        <!--          @blur="handleBlur($event)"-->
        <!--          style="width: 100px"-->
        <!--          ref="inputTitle">-->
        <!--        </el-input>-->
        <!--        <el-button size="small" @click="editTitle" type="primary" style="margin-left: 10px" icon="el-icon-edit" circle></el-button>-->
        【共
        <span style="color: red">{{form.length}}</span>道试题，合计
        <span style="color: red">{{sum}}</span>分】
      </div>
      <div style="float:right;margin-bottom: 10px">
        <el-button size="mini" @click="isAddByBank=true" style="margin-left: 10px">题库选题</el-button>
        <el-button size="mini" @click="isEditQuestion=true" style="margin-left: 10px">新增试题</el-button>
        <el-button size="mini" @click="isAddByText=true"  style="margin-left: 10px">模板导题</el-button>
        <el-button size="mini" @click="deleteTopic"  style="margin-left: 10px">删除本题</el-button>
      </div>
    </div>
    <el-table
      :data="examForm"
      style="width: 100%"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="题目序号"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="题目内容"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.main }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="分数"
        width="180"
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
        label="答案"
        width="180">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="medium">{{ scope.row.answer }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="难度"
        width="170">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="medium" >{{ map[scope.row.level] }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
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
    <add-by-bank
      :isAddByBank="isAddByBank"
      :topicType="topicType"
      :paperId="paperId"
      @addByBankclose="isAddByBank = false"></add-by-bank>
    <edit-question
      :isEditQuestion="isEditQuestion"
      :question= "question"
      :topicType="topicType"
      :isDesign="true"
      :paperId="paperId"
      :isDisabled="true"
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
  props:['topicType','topicTitle','paperId','examForm'],
  components:{ AddByText, addByBank,editQuestion},
  data() {
    return {
      isShow:true,
      isEditTitle: false,
      isAddByBank:false,
      isEditQuestion:false,
      isAddByText:false,
      isUpdateAllScore:false,
      allScore:0,
      sumScore:0,
      sum:0,
      question:{},
      form:[],
      map: {
        1: '简单',
        2: '适中',
        3: '困难',
        4: '压轴'
      }
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
    deleteTopic(){
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
    handleDelete(row){
      this.$confirm('此操作将删除该题目,确定吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/exam/paper/delete/',
          method: 'Delete',
          params: row,
        }).then(response => {
          console.log(response)
        }).catch( err =>{
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
    handleEdit(row){
      this.isEditQuestion = true
      this.question = row
    },
    updateAllScore(){
      this.isUpdateAllScore =false
      for(let i=0;i<this.form.length;i++){
        this.form[i].score = this.allScore
      }
      this.getAllScore()
      console.log(this.form)
    },
    getAllScore(){
      let sums = 0
      for(let i = 0; i < this.form.length; i++){
        sums+=this.form[i].score
      }
      this.sum = sums
    },
  //   getSummaries(param) {
  //     console.log(param)
  //     const { columns, data } = param;
  //     const sums = [];
  //     columns.forEach((column, index) => {
  //       if (index === 0) {
  //         sums[index] = '本大题总分';
  //         return;
  //       }
  //       const values = data.map(item => Number(item[column.property]));
  //       if (column.property === 'score'  ) {
  //         sums[index] = values.reduce((prev, curr) => {
  //           const value = Number(curr);
  //           if (!isNaN(value)) {
  //             return prev + curr;
  //           } else {
  //             return prev;
  //           }
  //         }, 0);
  //         sums[index];
  //       }
  //     });
  //     // this.sum =sums
  //     return sums
  //   }
  // },
  },
  created() {
    this.getAllScore()
    this.$nextTick()
    console.log(this.examForm)
  },
  updated() {
  },
  watch:{
    examForm(newVal) {
      this.$emit('update:examForm', newVal);
    },
  }
}
</script>

<style scoped>
ul,li{list-style:none;}
</style>
