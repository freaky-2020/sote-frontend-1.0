<template>
  <el-form-item v-if="form.way===1 || form.way===3">
    <span>  &nbsp;需填写：</span>
    <el-form v-if="form.way === 1 || form.way===3" :model="form.dynamicValidateForm" ref="form.dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-table :data="form.dynamicValidateForm.form2">
        <el-table-column label="序号" align='center' width="180">
          <template slot-scope="scope">
            <el-form-item  label-width="0px" >
              <el-button type="primary" size="mini" @click.native.prevent="test1(scope.$index)">/////</el-button>
            </el-form-item>
            <span></span>

          </template>
        </el-table-column>
        <el-table-column prop="value" label="字段名称" align='center' width="180">
          <template slot-scope="scope">
            <!--                此处  :prop绑定'form2.'+scope.$index+'.value'， 而不是'form.dynamicValidateForm.form2.'+scope.$index+'.value'-->
            <el-form-item :prop="'form2.'+scope.$index+'.value'" label-width="0px" :rules='formContentRules.value'>
              <el-input v-model="scope.row.value" placeholder="请输入" size="mini"
                        :disabled="scope.$index === 0"></el-input>
            </el-form-item>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column prop="format" label="字段类型" align='center' width="200">
          <template slot-scope="scope">

            <el-dialog title="添加选项"  v-if="form.dialogTableVisible === true " :visible.sync="form.dialogTableVisible" :destroy-on-close="true">
              <el-input type="text" v-model="form.OptionValue"></el-input>
              <el-button @click="form.dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="addOption(scope.$index)">添 加</el-button>
              <el-table :data="scope.row.optionBox">
                <el-table-column property="optionValue" label="已有选项"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope2">
                    <el-button type="primary" size="mini" @click=removeOption(scope.$index,scope2.$index)>删除</el-button>
                  </template>
                </el-table-column>
                <!--                    <el-table-column property="name" label="姓名" width="200"></el-table-column>-->
                <!--                    <el-table-column property="address" label="地址"></el-table-column>-->
              </el-table>
              <div slot="footer" class="dialog-footer">
              </div>
            </el-dialog>


            <el-form-item :prop="'form2.'+scope.$index+'.format'" label-width="0px" :rules='formContentRules.format'>
              <el-select size="mini" placeholder="请选择" v-model="scope.row.format"
                         :disabled="scope.$index === 0" style="width: 50%">
                <el-option v-for="item in formatBox"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <!--                添加选项按钮-->
              <el-button v-if="scope.row.format === 'option'" @click.native.prevent="form.dialogTableVisible = true"
                         icon="el-icon-circle-plus-outline" circle style="border: none"></el-button>

              <!--                <el-dialog title="添加选项" :visible.sync="form.dialogTableVisible" :destroy-on-close="true">-->

            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="necessary" label="是否必填" align='center' width="180">
          <template slot-scope="scope">
            <el-form-item  label-width="0px">
              <el-checkbox v-model="scope.row.necessary"
                           :disabled="scope.$index === 0">是</el-checkbox>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="180">
          <template slot-scope="scope">
            <el-form-item  label-width="0px" >
              <el-button type="primary" size="mini" @click="removeRow(scope.row)"
                         :disabled="scope.$index === 0">删除</el-button>
            </el-form-item>
            <span></span>

          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" @click.native.prevent=addRow>增加字段</el-button>
    </el-form>
  </el-form-item>
</template>

<script>
export default {
  data(){
    return{
      form:{
        dialogTableVisible: false,
        OptionValue:undefined,

        //可选，动态表单
        dynamicValidateForm: {
          form2:[
            {
              value:'学生姓名',
              format:'text',
              necessary:true,
              optionBox:undefined,
            },
          ],
          // stuname: ''
        },
      },
    }
  },

  methods:{

    removeRow(item) {
      var index = this.form.dynamicValidateForm.form2.indexOf(item)
      if (index !== -1) {
        this.form.dynamicValidateForm.form2.splice(index, 1)
      }
      console.log(index)

    },
    addRow() {
      this.form.dynamicValidateForm.form2.push({
        value: '',
        key: Date.now(),
        format:'text',
        necessary: false,
        optionBox:[]
      });

    },
    addOption(index){
      if(this.form.OptionValue===undefined){
        this.$message({
          type: 'info',
          message: '请输入有效内容'
        });
      }
      else{
        this.form.dynamicValidateForm.form2[index].optionBox.push({ optionValue: this.form.OptionValue })
        this.$message({
          type: 'success',
          message: '已添加选项: ' + this.form.OptionValue,
        });
        console.log(index)
      }
    },
    removeOption(index,index2){
      this.form.dynamicValidateForm.form2[index].optionBox.splice(index2, 1)
      console.log(index+''+index2)
    },
    test1(){
      console.log()
    }
  }
}
</script>
<style></style>
