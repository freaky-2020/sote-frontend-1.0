<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <h3 class="h3title">基本信息</h3>
      <el-form-item label="考试名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="考试分类">
        <el-select v-model="form.region" placeholder="选择考试类别">
          <el-option v-for="item in classificationBox"
                      :key="item.value"
                     :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click.native.prevent="form.classificationDialogVisible = true"
                   icon="el-icon-circle-plus-outline" circle style="border: none">添加类别</el-button>
        <el-dialog title="添加考试类别" :visible.sync="form.classificationDialogVisible">
          <el-form>
            <el-form-item label="新类别" >
              <el-input v-model="form.newClassification" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="form.classificationDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click.native.prevent="addClassification">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
<!--      0:Thu Mar 03 2022 00:00:00 GMT+0800 (中国标准时间)-->
<!--      1:Sat Mar 26 2022 00:00:00 GMT+0800 (中国标准时间)-->
      <el-form-item label="考试时间">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            :picker-options="form.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>
        </div>
      </el-form-item>

      <h3 class="h3title">参加方式</h3>
      <el-form-item label="选择考试方式">
        <el-radio-group v-model="form.way">
<!--          免登录暂时取消-->
<!--          <el-radio :label="1" >免登录考试：考生填写身份信息(如姓名、电话)，就可以参加考试</el-radio><br/>-->
          <el-radio :label="2" >口令考试：考生需登录后输入考试口令参加考试(防止陌生人参加)</el-radio><br/>
<!--          <el-radio :label="3" >免登录+口令考试：考生须填写身份信息和考试口令才可以参加考试</el-radio><br/>-->
          <el-radio :label="4" >指定考试：可指定考生或部门参加，考生需登录后参加考试</el-radio><br/>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="考生填写信息" v-if="form.way===2 || form.way===3||form.way===1">
<!--        <el-input v-if="form.way===''" placeholder="请选择考试方式" :disabled="true"></el-input>-->

        <el-form-item v-if="form.way===2 || form.way===3">
          <span>  &nbsp;口令：</span>
          <el-input style="width: 50%" v-model="form.commend" size="mini"></el-input>
          <span>&nbsp;考生须输入此口令才能参加考试</span>
        </el-form-item>
      </el-form-item>

      <el-form-item label="选择考生" v-if="form.way===4">
<!--        <el-input v-if="form.way===''" placeholder="请选择考试方式" :disabled="true"></el-input>-->
        <el-form-item v-if="form.way===2 || form.way===3">

        </el-form-item>
      </el-form-item>

      <el-form-item label="考试须知">
        <el-input v-model="form.instructions" type="textarea" />
      </el-form-item>
      <el-form-item label="考试手工签名">
        <el-switch v-model="form.needsign" />
        <el-button @click.native.prevent="form.signatureDialogVisible = true" size="mini"  icon="el-icon-edit">预览</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存，去设计试卷</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="手工签名" :visible.sync="form.signatureDialogVisible" >
      <signature style="border:1px solid #5a5e66"></signature>
      <el-button @click="form.signatureDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addOption(scope.$index)">添 加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import signature from '@/views/createpaper/components/signature'

export default {
  components:{
    signature,
  },
  data() {
    return {
      classificationBox:[
        { value: '选项1',
          label: '黄金糕'},
      ],
      formatBox:[
        {value:'text', label:'文本'},
        {value:'date', label:'日期'},
        {value:'option', label:'选择框'},
      ],
      //校验规则
      formContentRules: {
        value: [{ required: true, message: '请填写字段名称', trigger: 'blur' }],
        format: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        // expressage: [{ required: true, message: '请填写', trigger: 'change' }],
      },

      form: {
        name: '',
        region: '',
        needsign: false,
        // type: [],
        way: '',
        instructions: '',
        commend:undefined,//可选，口令

        newClassification:'',
        classificationDialogVisible:false,
        signatureDialogVisible:false,

        time:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },


      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // removeDomain(item) {
    //   var index = this.form.dynamicValidateForm.domains.indexOf(item)
    //   if (index !== -1) {
    //     this.form.dynamicValidateForm.domains.splice(index, 1)
    //   }
    // },
    // addDomain() {
    //   this.form.dynamicValidateForm.domains.push({
    //     value: '',
    //     key: Date.now()
    //   });
    // },
    addClassification(){

      if(this.form.newClassification===''){
        this.$message({
          type: 'info',
          message: '请输入有效内容'
        });
      }
      else{
        this.classificationBox.push({
          value: this.form.newClassification
        })
        this.$message({
          type: 'success',
          message: '已添加选项: ' + this.form.newClassification,
        });
        this.form.classificationDialogVisible = false;
      }
    }
  }
}
</script>

<style lang="scss">
.h3title{
  color: gray;
  //background-color: lightgrey;
  height: 40px;
  border-bottom: 1px solid lightgrey;
}
.line{
  text-align: center;
}
.el-radio{
  height: 30px;
}
.el-button--primary {
  background: #304156 !important;
  border-color: #304156 !important;
}
.el-button--primary:hover {
  background: #5979a0 !important;
  border-color: #304156 !important;
  color: #FFF !important;
}
</style>

