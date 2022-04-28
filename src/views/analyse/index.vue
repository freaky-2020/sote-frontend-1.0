<template>
  <grade-chart :data="chartData" style="height: 700px"></grade-chart>
</template>

<script>
import * as echarts from 'echarts';
import Grade from '@/views/grade/grade'
import GradeChart from '@/components/Charts/GradeChart'
export default {
name: "index",
  components:{ GradeChart },
  data(){
    return {
      chartData:[],
    }
  },
}


</script>

<style scoped>

</style>
