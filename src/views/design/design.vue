<template>
  <div class="app-container">
    <div class="filter-container" align="center">
      <el-button @click="fetchData" type="success">添加大题</el-button>
    </div>
    <div class="filter-container">

    </div>

    <el-dialog title="添加大题" :visible.sync="isShowTopic">
      <el-input placeholder="请输入大题名称" v-model="inputTopic" />
    </el-dialog>
    <topicForm/>
  </div>
</template>

<script>
import topicForm from '@/views/design/component/topicForm'
import { getList } from '@/api/table'
import axios from 'axios'
axios.defaults.baseURL=''

export default {
  components: {topicForm},
  data() {
    return {
      list: {},
      isShowTopic:false,
      inputTopic:'',
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
    addTopic(){

    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
      console.log(response.data)
    }
  }
}
</script>

