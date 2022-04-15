<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title_content">答题卡</div>
    </div>
    <div class="card-content-title">单选题(共{{ examinationData.length }}题，合计{{ full_score }}分)</div><br>
<!--    <div v-for="(item,index) in examinationData" :key="index">-->
<!--      <el-button v-show="!checkResult" class="checkei" :class="{'checked':radio[index]}">{{ index+1 }}</el-button>-->
<!--      <el-button v-show="checkResult" class="checki checked" :class="{'check-error':radio[index]}">{{ index+1 }}</el-button>-->
<!--    </div>-->
<!--    <el-button v-for="(item,index) in examinationData" :key="index" :type="flagX===(index+1)?'primary':''">{{ index+1 }}</el-button>-->
    <div>
      <el-button v-for="(item,index) in examinationData" :key="index" class="buton" @click="goAnchor('#1')">{{index+1}}</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      examinationData: '111111',
      flagX: 1,
      full_score: '2',
      radio: ['A'], // 单选真题答案
      checkResult: true // 左侧栏、右侧栏、答题结果栏
    }
  },
  methods: {
    clickbtnX(index) {
      this.flagX = index + 1
    },
    //模拟锚点跳转
    goAnchor(selector) {//参数selector是id选择器（#id）
      document.querySelector(selector).scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.buton{
  margin-bottom: 5px;
}
</style>

