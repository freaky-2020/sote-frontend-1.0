<template>
  <div class="filter-container" v-if="isShow">
    <div style="margin-bottom: 20px">
      <div style="float:left;display:inline; padding-top:10px;margin-bottom: 10px">
        <span v-show="!isEditTitle">{{topicTitle}}</span>
        <!--        <el-input-->
        <!--          type="text"-->
        <!--          v-show="isEditTitle"-->
        <!--          v-model="topicData.title"-->
        <!--          @blur="handleBlur($event)"-->
        <!--          style="width: 100px"-->
        <!--          ref="inputTitle">-->
        <!--        </el-input>-->
        <!--        <el-button size="small" @click="editTitle" type="primary" style="margin-left: 10px" icon="el-icon-edit" circle></el-button>-->
        <span style="margin-left: 10px">【共{{topicData.sum}}道试题，合计{{topicData.sumScore}}分】</span>
      </div>
      <div style="float:right;margin-bottom: 10px">
        <el-button size="mini" @click="isAddByBank=true" style="margin-left: 10px">题库选题</el-button>
        <el-button size="mini" @click="isEditQuestion=true" style="margin-left: 10px">新增试题</el-button>
        <el-button size="mini" @click="isAddByText=true"  style="margin-left: 10px">模板导题</el-button>
        <el-button size="mini" @click="deleteTopic"  style="margin-left: 10px">删除本题</el-button>
      </div>
    </div>
    <el-table
      :data="form"
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
            <el-tag size="medium">
              <el-link @click="handleEdit(scope.row)">{{ scope.row.main }}</el-link>
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="分数"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-input size="mini" v-model="scope.row.score"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="答案"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.answer }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="难度"
        width="170">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
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
      :isDisabled="true"
      @addByBankclose="isAddByBank = false"></add-by-bank>
    <edit-question
      :isEditQuestion="isEditQuestion"
      :question= "question"
      :topicType="topicType"
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
export default {
  name: 'topicForm',
  props:['topicType','topicTitle'],
  components:{ AddByText, addByBank,editQuestion},
  data() {
    return {
      isShow:true,
      isEditTitle: false,
      isAddByBank:false,
      isEditQuestion:false,
      isAddByText:false,
      topicData: {
        id:1,
        title: '第',
        sum: '3',
        sumScore: '50',
      },
      question:{},
      form:[
        {id:'1', main:'1+1=',score:10,answer:'B',level:'1'},
        {id:'2', main:'五百是啥',score:10,answer:'C',level:'2'},
        {id:'3', main:'I AM your',score:10,answer:'D',level:'3'},
        {id:'4', main:'呵呵',score:10,answer:'A',level:'2'},
        {id:'5', main:'牛的',score:10,answer:'B',level:'3'},
      ],
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
    }
  },
  beforeMount() {
    this.topicData.title = "第"+this.count+"大题"
  },
}
</script>

<style scoped>
ul,li{list-style:none;}
</style>
