<template>
  <div class="background-container">
  <div class="article-container">
    <el-form ref="form" :model="form" :rules="formContentRules" label-width="120px">
      <h3 class="h3title">基本信息</h3>
      <el-form-item label="考试名称" prop="examName">
        <el-input v-model="form.examName" />
      </el-form-item>
<!--      <el-form-item label="考试id" prop="examId">-->
<!--        <el-input v-model="form.examId" />-->
<!--      </el-form-item>-->
      <el-form-item label="考试科目" prop="subjectId">
        <el-select :disabled="isEdit !==undefined" id="selectSubject" v-model="form.subjectId" placeholder="选择考试科目" style="width: 35%" >
          <el-option v-for="item in subjectBox"
                      :key="item.id"
                     :value="item.id"
                     :label="item.subjectName"
          ></el-option>
        </el-select>
<!--        <el-button @click.native.prevent="form.classificationDialogVisible = true"-->
<!--                   icon="el-icon-circle-plus-outline" circle style="border: none">添加类别</el-button>-->
<!--        <el-dialog title="添加考试类别" :visible.sync="form.classificationDialogVisible">-->
<!--          <el-form>-->
<!--            <el-form-item label="新类别" >-->
<!--              <el-input v-model="form.newClassification" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="form.classificationDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click.native.prevent="addClassification">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
      </el-form-item>

<!--      <el-form-item label="选择监考人" prop="invigilatorId">-->
<!--        <el-select v-model="form.invigilatorId" placeholder="选择监考人" >-->
<!--          <el-option v-for="item in teacherBox"-->
<!--                     :key="item.id"-->
<!--                     :value="item.id"-->
<!--                     :label="item.realName"-->
<!--          ></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="考试开放时间">
<!--        <div class="block">-->
<!--          <span class="demonstration"></span>-->
<!--          <el-date-picker-->
<!--            v-model="form.startTime"-->
<!--            type="datetime"-->
<!--            placeholder="选择最早考试时间"-->
<!--            align="right"-->
<!--            :picker-options="pickerOptions"-->
<!--            value-format="yyyy-MM-dd HH:mm:ss">-->
<!--          </el-date-picker>-->
<!--          <span class="demonstration"></span>-->
<!--          <el-date-picker-->
<!--            v-model="form.endTime"-->
<!--            type="datetime"-->
<!--            placeholder="选择最晚考试时间"-->
<!--            align="right"-->
<!--            :picker-options="pickerOptions"-->
<!--            value-format="yyyy-MM-dd HH:mm:ss">-->
<!--          </el-date-picker>-->
<!--        </div>-->
        <div class="block" >
          <span class="demonstration"></span>
          <el-date-picker style="width: 100%"
            v-model="allTime"
            type="datetimerange"
            :picker-options="form.pickerOptions"
            range-separator="至"
            start-placeholder="最早考试时间"
            end-placeholder="最晚考试时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="考试时长" prop="durationTime">
        <el-input v-model="form.durationTime"  style="width: 35%" placeholder=""></el-input>
        <span>&nbsp;分钟</span>
      </el-form-item>
      <el-form-item label="考试须知">
        <el-input v-model="form.examNote" type="textarea" />
      </el-form-item>
      <h3 class="h3title">参加方式</h3>
      <div v-if="isEdit === undefined">
        <el-form-item label="选择考试方式" prop="noticeWay">
          <el-radio-group v-model="form.noticeWay" >
            <!--          免登录暂时取消-->
            <!--          <el-radio :label="1" >免登录考试：考生填写身份信息(如姓名、电话)，就可以参加考试</el-radio><br/>-->
            <el-radio :label="1" >口令考试：考生需登录后输入考试口令参加考试(防止陌生人参加),口令由系统给出</el-radio><br/>
            <!--          <el-radio :label="3" >免登录+口令考试：考生须填写身份信息和考试口令才可以参加考试</el-radio><br/>-->
            <el-radio :label="2" >指定考试：可指定考生或部门参加，考生需登录后参加考试</el-radio><br/>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择考生" v-if="form.noticeWay===2">
          <!--        <el-input v-if="form.noticeWay===''" placeholder="请选择考试方式" :disabled="true"></el-input>-->
          <el-button type="text" @click.native.prevent="stuDialogVisible = true">点击指定考生</el-button>
        </el-form-item>
      </div>
      <el-form-item label="允许切屏次数" prop="cuttingTimes">
        <el-input v-model="form.cuttingTimes"  style="width: 35%" placeholder=""></el-input>
        <span>&nbsp;次</span>
      </el-form-item>
      <el-form-item label="允许参加次数" prop="allowableTime">
        <el-input v-model="form.allowableTime" style="width: 35%" placeholder=""></el-input>
        <span>&nbsp;次</span>
      </el-form-item>

<!--      <el-form-item label="考试手工签名">-->
<!--        <el-switch v-model="form.needsign" />-->
<!--        <el-button @click.native.prevent="form.signatureDialogVisible = true" size="mini"  icon="el-icon-edit">预览</el-button>-->
<!--      </el-form-item>-->

      <el-form-item v-if="isEdit ===undefined">
        <el-button type="primary" @click.native.prevent="onSubmit('form')">保存，去设计试卷</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

<!--    <el-dialog title="手工签名" :visible.sync="form.signatureDialogVisible" >-->
<!--      <signature style="border:1px solid #5a5e66"></signature>-->
<!--      <el-button @click="form.signatureDialogVisible = false">取 消</el-button>-->
<!--      <el-button type="primary" @click="addOption(scope.$index)">添 加</el-button>-->
<!--    </el-dialog>-->

    <el-dialog  title="指定考生考试" :visible.sync="stuDialogVisible" center width="70%">
      <stu-table></stu-table>
      <br/>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="stuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="wordDialogVisible = false,(word)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import signature from '@/views/createpaper/components/signature'
import request from '@/utils/request'
import stuTable from '@/views/createpaper/components/table'


export default {
  components:{
    signature,
    stuTable
  },
  props:['isEdit','editOngoingDo'],
  data() {
    let checkInt = (rule, value, callback) => {
      if ((Number(value))&&(value)%1 === 0&&value<180) {
        callback();
      }else {
        return callback(new Error('请输入整数！'));
      }
    };
    return {
      stuDialogVisible:false,
      subjectBox:[
        { id: 1,
          subjectName: '高等数学'},
      ],
      teacherBox:[],
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

        allowableTime: [{ validator: checkInt, message: '请填写正整数',trigger: 'blur' }],
        durationTime: [{ validator: checkInt, message: '请填写正整数且时长小于3小时',trigger: 'blur' }],
        cuttingTimes: [{ validator: checkInt, message: '请填写正整数',trigger: 'blur' }],
        // examId:[{ validator: checkInt, message: '请填写正整数',trigger: 'blur' }],
        examId: [{ required: true,validator: checkInt, message: '请输入唯一考试id,为正整数', trigger: 'blur' }],
        examName: [{ required: true, message: '请输入', trigger: 'blur' }],
        invigilatorId: [{ required: true, message: '请选择', trigger: 'blur' }],
        noticeWay: [{ required: true, message: '请选择', trigger: 'blur' }],
        subjectId:[{ required: true, message: '请选择', trigger: 'blur' }],
        allTime: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
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
      allTime:'',
      form: {
        examId:null,
        examName: '',
        examNote:'',
        subjectId: null,
        invigilatorId:this.$store.getters.name,

        // needsign: false,
        // type: [],
        noticeWay: null,

        // newClassification:'',
        // classificationDialogVisible:false,
        // signatureDialogVisible:false,

        startTime:'',
        deadline:'',
        durationTime:'',

        allowableTime:null,
        cuttingTimes:null,

      }
    }
  },
  computed:{
    oldForm(){
      return this.$store.state.examInfo
    }
  },
  watch:{
      allTime: {
        deep: true,
        handler(val) {
          this.form.deadline = val[1];
          this.form.startTime = val[0];
        }
      },
      oldForm:{
        deep:true,
        immediate:true,
        handler(){
          if(this.isEdit === undefined){
            this.allTime = ''
          }
          else if(this.oldForm !== undefined){
            this.allTime = []
            this.form = this.oldForm
            this.allTime[0] = this.oldForm.startTime
            this.allTime[1] = this.oldForm.deadline
          }
        }
      }
  },
  created() {
    this.getSubject();
    this.getTeacher()
  },
  methods: {
    getSubject(){
      request({
        url:'/bank/subject',
        method:'Get',
      }).then(response=>{
        console.log(response)
        this.subjectBox=response
      })
    },
    getTeacher(){
      request({
        url:'/auth/user/page/teacher',
        method:'Get',
      }).then(res=>{
        console.log(res)
        this.teacherBox=res.records

      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url:'/exam/info/add',
            method:'post',
            params:this.form,
          // {allowableTime:this.form.allowableTime,
          //   cuttingTimes:this.form.cuttingTimes,
          //   startTime: this.form.allTime[0],
          //   deadline: this.form.allTime[1],
          //   durationTime:this.form.durationTime,
          //   examId:this.form.examId,},


          }).then(res=>{
            console.log(res)
            this.form.commend=res.word
            this.$router.push({
              name: 'Design',
              query:{
                paperId:res.paperId,
                word:res.word,
                subjectId:this.form.subjectId
              }
            })
            // this.$router.push({ path: 'design/design' })
          })
          this.$alert('添加成功', '通知', {
            confirmButtonText: '确定',
          }).then()
        } else {
          console.log('操作失败');
          return false;
        }
      });
    },
    onCancel() {
      this.$router.push({
        name:'Dashboard',
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
        this.subjectBox.push({
          value: this.form.newClassification
        })
        this.$message({
          type: 'success',
          message: '已添加选项: ' + this.form.newClassification,
        });
        this.form.classificationDialogVisible = false;
      }
    },
    editOngoing() {
      this.$emit("editOngoingDo",this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.h3title{
  color: #5069c0;
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
#selectSubject .el-input {
  width: 200px!important;
}
/*.el-button--primary {*/
/*  background: #304156 !important;*/
/*  border-color: #304156 !important;*/
/*}*/
/*.el-button--primary:hover {*/
/*  background: #5979a0 !important;*/
/*  border-color: #304156 !important;*/
/*  color: #FFF !important;*/
/*}*/
</style>

