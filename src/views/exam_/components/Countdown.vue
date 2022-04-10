<template>
  <el-card>
    <li class="menu-item">

<!--      如果到了规定可以考试的时间范围，而考试倒计时还未结束，则强制交卷-->

      <div class="item-label">剩余时间</div>
      <div class="item-data">
        <Time
          v-if="examtime!==''"
          :status="submitView"
          :examtime="examtime"
          @show="handInHand"
        ></Time>
      </div>
    </li>
    <li class="menu-item">
      <div class="item-label">当前进度</div>
      <div class="item-press">
        <span>{{ radio.length }}</span>
        <span>{{ examinationData.length }}</span>
      </div>
      <div class="percentage">
        <el-progress :percentage="percentage" :color="customColor"></el-progress>
      </div>
    </li>
  </el-card>
</template>

<script>
import Time from './Time'
export default {
  name: 'Submit',
  components: { Time },
  data() {
    return {
      examinationData: '1111',
      examtime: '10:10',
      full_score: '2',
      submitView: false,
      radio: ['A'], // 单选真题答案
      checkResult: false, // 左侧栏、右侧栏、答题结果栏
      percentage: 25
    }
  },
  methods: {
    madeTime(serverTime1, begin1, duration1) {
      var serverTime = new Date(serverTime1) // 系统时间
      var duration = duration1 // 考试时间
      if (begin1 != null) {
        var begin = new Date(begin1) // 开始时间
        var residue = begin.getTime() + duration * 1000 - serverTime.getTime() // 倒计时
      } else {
        // eslint-disable-next-line no-redeclare
        var residue = duration * 1000 - serverTime.getTime() // 倒计时
      }
      return residue
    },
    toHHmmss(data) {
      let date = {}
      let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = (data % (1000 * 60)) / 1000
      date.hours = hours
      date.minutes = minutes
      date.seconds = seconds
      return date
    }
  }
}
</script>

<style scoped>
li{
  list-style: none;
  /*去掉li前面的·*/
}
.menu-item {
  padding: 14px 0;
  border-bottom: 1px solid #dedede;
}
.menu-item:last-child {
  border: none;
}
.item-label {
  margin-bottom: 6px;
}
.item-press {
  line-height: 17px;
  margin-bottom: 7px;
  color: #27274a;
  font-size: 14px;}
  span:nth-child(1)::after {
    content: "/";
    margin: 0 5px;
  }
</style>
