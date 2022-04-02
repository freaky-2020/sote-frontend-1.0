<template>
  <div>
    <el-dialog title="模板导题" :visible.sync="isAddByText" :before-close="dialogClose" width="75%">
      <div style="border: solid 1px #f4f4f5">
        <span style="margin-left: 10px">指定试题科目</span>
        <el-select size="medium" v-model="value" placeholder="请选择" style="margin: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          style="margin-left: 10px;width: 90%"
          type="textarea"
          :autosize="{ minRows: 10}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <el-row type="flex" justify="end" style="margin: 10px">
          <el-button @click="dialogSubmit">确定</el-button>
          <el-button @click="dialogClose">取消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addByText',
  props:['isAddByText'],
  data(){
    return{
      currentPage: 4,
      textarea:'',
      form:[
        {id:'1', main:'1+1=',score:10,answer:'B',level:'1'},
        {id:'2', main:'五百是啥',score:10,answer:'C',level:'2'},
        {id:'3', main:'I AM your',score:10,answer:'D',level:'3'},
        {id:'4', main:'呵呵',score:10,answer:'A',level:'2'},
        {id:'5', main:'牛的',score:10,answer:'B',level:'3'},
      ],
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
      this.$emit("addByTextclose")
    },
    selectionChange(){

    },
    dialogSubmit(){
      this.$emit("addByTextclose")
      console.log(this.textarea)
    },
    handleEdit(row){

    }
  }
}
</script>

<style scoped>

</style>
