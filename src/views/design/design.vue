<template>
  <div class="app-container">
<!--    <div class="filter-container" align="center">-->
<!--      <el-button @click="topicNum++" icon="el-icon-circle-plus-outline" type="success">添加大题</el-button>-->
<!--    </div>-->
    <div class="filter-container">
      <topic-form style="margin-bottom: 10px" :topicType="1" topicTitle=单选题></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="2" topicTitle=多选题></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="3" topicTitle=判断题></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="4" topicTitle=填空题></topic-form>
      <topic-form style="margin-bottom: 10px" :topicType="5" topicTitle=简答题></topic-form>
    </div>
    <div style="position:absolute;bottom: 0px;margin-bottom: 5px;transform: translate(-50%);left: 50%" >
      <el-button size="medium" type="primary" icon="el-icon-thumb" @click="toPublish">提交试卷</el-button>
      <el-button size="medium" type="warning" icon="el-icon-setting" @click="isEditTest = true">考试设置</el-button>
      <el-button size="medium" type="info" icon="el-icon-view" @click="toPreview">预览试卷</el-button>
    </div>

    <div>
      <el-dialog title="考试设置" :visible.sync="isEditTest" top="50px" width=60%>
        <div style="border: solid 1px #f4f4f5">
          <el-scrollbar style="height: 500px" wrap-style="overflow-x:hidden;">
            <div>

            </div>
          </el-scrollbar>
        </div>
        <el-row type="flex" justify="end" style="margin-top: 10px">
          <el-button size="medium" @click="editTestSubmit">确定</el-button>
          <el-button size="medium" @click="isEditTest = false">取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import topicForm from '@/views/design/component/topicForm'
import axios from 'axios'
import request from '@/utils/request'
axios.defaults.baseURL=''

export default {
  components: {topicForm},
  data() {
    return {
      list: {},
      isEditTest:false,
      isShowTopic:false,
      inputTopic:'',
      topicNum:1,
      newTopic:{
        id:'',
        name:'',
        question:[
          {id:'', main:'',type:'',score:'',answer:''}
        ]
      }
    }
  },

  methods:{
    fetchData() {
      this.listLoading = true
      return request({
        url: 'api/auth/user',
        methods: 'Get'
      }).then(response => {
        console.log(response)
      })
    },
    toPublish(){
      this.$router.push({
        name: 'Tab'
      })
    },
    toPreview(){
      this.$router.push({
        name: 'Tab'
      })
    },
    editTestSubmit(){
      this.isEditTest = false
    }
  }
}
</script>

