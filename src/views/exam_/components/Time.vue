<!-- 考试倒计时组件 -->
<template>
  <div class="time">
    <p v-if="this.seconds>900">{{count}}</p>
    <p v-if="this.seconds<=900" style="color: red">{{count}}</p>
  </div>
</template>

<script>
export default {
  name: 'Time',
  props: ['status', 'examtime','examValue'],
  data() {
    return {
      hours: '',
      seconds: 1,
      minutes: '',
      timer: null,
      count:'',
      startTime:this.examValue.stuExam.startTime,
      durationTime:this.examValue.examInfo.durationTime,
      deadline:this.examValue.examInfo.deadline,
    }
  },
  watch: {
    seconds(){
      if(this.seconds === 0){
        this.jiaojuan()
      }
    }
  },
  mounted() {
    console.log(this.examValue)
    let nowTime = new Date().getTime()
    let sec = this.durationTime*60*1000+Date.parse(this.startTime.replace(/-/g, '/'))
    if(nowTime>Date.parse(this.deadline.replace(/-/g, '/'))){
      sec = 0
    }
    if(sec>Date.parse(this.deadline.replace(/-/g, '/'))){
      this.seconds = Date.parse(this.deadline.replace(/-/g, '/')) - nowTime
    }
    this.seconds =this.durationTime*60*1000+Date.parse(this.startTime.replace(/-/g, '/')) - nowTime
    this.seconds =Math.round(this.seconds/1000)
    console.log(this.seconds)
    this.Time()
  },
  methods: {
    // 倒计时
    countDown() {
      let h = Math.floor(this.seconds / (60 * 60) % 24);
      h = h < 10 ? "0" + h : h
      let m = Math.floor(this.seconds / 60 % 60);
      m = m < 10 ? "0" + m : m
      let s = Math.round(this.seconds % 60);
      s = s < 10 ? "0" + s : s
      this.count = h + '时' + m + '分' + s + '秒'
    },
    Time() {
      setInterval(() => {
        this.seconds -= 1
        this.countDown()
      }, 1000)
    },
  }
}
</script>

<style scoped lang="scss">

</style>
