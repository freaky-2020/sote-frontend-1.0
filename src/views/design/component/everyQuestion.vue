<template>
  <div>
    <div v-if="type === 1">
      <div v-for="(item)  in  radioItems.slice(0 , radioSum)" :key="item.id" style="margin-top: 5px">
        <el-radio style="margin-left: 12px" v-model="radioValue" :label="item.id">{{item.value}}</el-radio>
        <el-input size="medium" style="width: 80%" v-model="item.input"></el-input>
      </div>
      <el-row type="flex" justify="center" style="margin: 5px">
        <el-button size="mini" @click="radioSum++">增加选项</el-button>
        <el-button size="mini" @click="radioSum--">删除选项</el-button>
        <el-button size="mini" @click="showIt">删除选项</el-button>
      </el-row>
    </div>
    <div v-if="type === 2">
      <div v-for="(item)  in  checkboxItems.slice(0 , checkboxSum)" :key="item.id" style="margin-top: 5px">
        <el-checkbox style="margin-left: 12px;margin-right: 30px" v-model="item.id" :label="item.value" ></el-checkbox>
        <el-input size="medium" style="width: 80%" v-model="item.input"></el-input>
      </div>
      <el-row type="flex" justify="center" style="margin: 5px">
        <el-button size="mini" @click="checkboxSum++">增加选项</el-button>
        <el-button size="mini" @click="checkboxSum--">删除选项</el-button>
      </el-row>
    </div>
    <div v-if="type === 3" style="margin: 10px">
      <span>选项</span>
      <el-radio-group v-model="judgeRadio" style="margin-left: 40px">
        <el-radio :label="1">正确</el-radio>
        <el-radio :label="2">错误</el-radio>
      </el-radio-group>
    </div>
    <div v-if="type === 4" style="margin-top: 10px;margin-left: 75px">
      <div v-for="(item)  in  fillItems.slice(0 , fillSum)" :key="item.id" style="margin-top: 5px">
        <el-input style="width: 80%" placeholder="请输入内容" v-model="item.input">
          <template slot="prepend">答案{{ item.id }}</template>
        </el-input>
      </div>
      <el-row type="flex" justify="center" style="margin: 5px">
        <el-button size="mini" @click="fillSum++">增加选项</el-button>
        <el-button size="mini" @click="fillSum--">删除选项</el-button>
      </el-row>
    </div>
    <div v-if="type === 5">
      <el-row type="flex" style="margin-top: 10px">
        <span style="margin-right: 10px;margin-left: 10px">试题答案</span>
        <editor-wang justify="end"></editor-wang>
      </el-row>
    </div>
  </div>
</template>

<script>
import editorWang from './wangEditor'
export default {
  name: 'everyQuestion',
  components:{editorWang},
  props:['type'],
  data(){
    return{
      radioItems:[
        {id:1,value:'A',input:'',},
        {id:2,value:'B',input:'',},
        {id:3,value:'C',input:'',},
        {id:4,value:'D',input:'',},
        {id:5,value:'E',input:'',},
        {id:6,value:'F',input:'',},
        {id:7,value:'G',input:'',},
        {id:8,value:'H',input:'',},
        {id:9,value:'I',input:'',},
        {id:10,value:'J',input:'',},
        {id:11,value:'K',input:'',},
        {id:12,value:'L',input:'',},
        {id:13,value:'M',input:'',},
        {id:14,value:'N',input:'',},
        {id:15,value:'O',input:'',},
        {id:16,value:'P',input:'',},
      ],
      radioValue:'',
      radioSum:4,
      checkboxValue:'',
      checkboxSum:4,
      checkboxItems:[
        {id:1,value:'A',input:'',},
        {id:2,value:'B',input:'',},
        {id:3,value:'C',input:'',},
        {id:4,value:'D',input:'',},
        {id:5,value:'E',input:'',},
        {id:6,value:'F',input:'',},
        {id:7,value:'G',input:'',},
        {id:8,value:'H',input:'',},
        {id:9,value:'I',input:'',},
        {id:10,value:'J',input:'',},
        {id:11,value:'K',input:'',},
        {id:12,value:'L',input:'',},
        {id:13,value:'M',input:'',},
        {id:14,value:'N',input:'',},
        {id:15,value:'O',input:'',},
        {id:16,value:'P',input:'',},
      ],
      judgeRadio:'',
      fillItems:[
        {id:1,input:'',},
        {id:2,input:'',},
        {id:3,input:'',},
        {id:4,input:'',},
        {id:5,input:'',},
        {id:6,input:'',},
        {id:7,input:'',},
        {id:8,input:'',},
        {id:9,input:'',},
        {id:10,input:'',},
      ],
      fillSum:1,
    }
  },
  methods:{
    showIt(){
      console.log(this.radioValue)
      console.log(this.radioItems)
    }
  },
  mounted() {
    console.log(this.type)
  }
}
</script>

<style scoped>

</style>
