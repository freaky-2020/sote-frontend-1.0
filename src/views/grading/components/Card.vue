<template>
  <el-card>
    <div slot="header" class="clearfix" v-if="$store.state.isDown === false">
      <div class="title_content">答题卡</div>
    </div>
    <div v-if="exam_date.length!==0 && $store.state.isDown === false">
      <div class="card-content-title">简答题(共{{ exam_date.length }}题，合计{{ getAllScore(exam_date) }}分)</div><br>
      <el-button v-for="(question,index) in exam_date" :key="index+'5'"
                 @click="setNum(question.quesNo)"
                 size="mini"
                 class="buton">{{ index+1 }}</el-button>
    </div>

    <div v-if="$store.state.isDown === true && this.stuData !==undefined">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select" style="margin-bottom: 5px">
        <el-select v-model="select" slot="prepend" style="width: 100px" placeholder="请选择">
          <el-option label="学号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-scrollbar>
        <el-table
          :data="this.stuData.slice((page-1)*limit, page*limit)"
          style="width: 100%"
          border
          fit
          highlight-current-row>
          <el-table-column
            label="姓名"
            width="100">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.user.realName }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="学号"
            sortable>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.user.userName }}</span>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top:20px;float: right;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[2, 5, 10, 100]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

      </el-scrollbar>
    </div>
  </el-card>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Card',
  props: ['exam_date','quesNos','gradingThis','stuData'],
  // 父子组件之间数据传递，该数据在子组件中不能随便更改，会报错
  data() {
    return {
      input:'',
      select:'',
      isDown:this.$store.state.isDown,
      sum: 0,
      details: 6,
      detailDate: null,
      total: 0,
      page: 1,
      limit: 10,
    }
  },
  computed: {
    num() {
      return this.$store.state.numX
    },
    nextDisabled() {
      return this.$store.state.nextDisabled
    }
  },
  watch: {
    num(now, old) {
      if (now === this.quesNos - 1) {
        this.$store.commit('nextDisableTrue')
      } else {
        this.$store.commit('nextDisableFalse')
      }
    },
    stuData:{
      handler(){
        if(this.stuData!==undefined){
          this.total = this.stuData.length
        }
      },
      deep:true,
      immediate:true,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    getAllScore(form) {
      let sums = 0
      for (let i = 0; i < form.length; i++) {
        sums += form[i].score
      }
      return sums
    },
    fetchData() {
      request({
        url: 'exam/detail/get/' + this.details,
        method: 'get'
      }).then(response => {
        console.log(response)
        this.detailDate = response
      }).catch(err => {
        console.log(err)
      })
    },
    setNum(index) {
      this.$store.commit('setNum', index)
    },
    gradingThis(){
      this.$emit('gradingThis')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.page = 1
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
    },
  }
}
</script>

<style lang="scss" scoped>
.buton{

  margin-bottom: 5px;
}
</style>

