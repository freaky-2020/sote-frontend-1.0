<template>
  <div>
    <el-dialog  title="题库导题" :visible.sync="isAddByBank" :before-close="dialogClose" width="85%">
      <el-scrollbar style="height: 500px" wrap-style="overflow-x:hidden;">
        <bank :topicType="topicType"></bank>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import bank from '@/views/bank/bank'
export default {
  name: 'addByBank',
  props:['isAddByBank','topicType'],
  components: {bank},
  data(){
    return{
      isExam:true,
      currentPage: 4,
      queryForm:{
        id:null,
        stem:'',
        answer:null,
        subjectId:null,
        remark:null,
        typeId:null,
        choice1:null,
        choice2:null,
        choice3:null,
        choice4:null,
        createTime:null,
        updateTime:null,
        difficultyId:null,
        size:10,
        cp:1,
        startTime:null,
        endTime:null,
      },
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
      },
      options: [{
        value: '1',
        label: '单选题'
      }, {
        value: '2',
        label: '多选题'
      }, {
        value: '3',
        label: '填空题'
      }, {
        value: '4',
        label: '判断题'
      }, {
        value: '5',
        label: '综合题'
      }],
      value: ''
    }
  },
  methods:{
    dialogClose(){
      this.$emit("addByBankclose")
    },
    selectionChange(){

    },
    dialogSubmit(){
      this.$emit("addByBankclose")
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleDelete(row){
      this.$confirm('此操作将删除该题目确定吗?', '提示', {
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

    }
  }
}
</script>

<style scoped>
</style>
