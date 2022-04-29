<template>
  <div :id="id" style="width: 100%;height: 350%"/>
</template>

<script>
import resize from '@/components/Charts/mixins/resize'
import * as echarts from 'echarts'

export default {
name: "GradeChart",
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'grade-chart'
    },
    MaxNum: {
      default: 10
    },
    MaxRate:{
      default: 50
    },
    scoreData:{
      type:Array,
      default:[
        {getRate: '90%-100%',sCount:1,proportion:8,},
        {getRate: '80%-90%',sCount:0,proportion:0,},
        {getRate: '70%-80%',sCount:0,proportion:0,},
        {getRate: '60%-70%',sCount:5,proportion:10,},
        {getRate: '50%-60%',sCount:0,proportion:0,},
        {getRate: '40%-50%',sCount:7,proportion:15,},
        {getRate: '30%-40%',sCount:0,proportion:0,},
        {getRate: '20%-30%',sCount:0,proportion:0,},
        {getRate: '10%-20%',sCount:0,proportion:0,},
        {getRate: '0%-10%',sCount:0,proportion:0,},
      ]
    },


  },
  data() {
    return {
      chart: null,
      numData:[],
      proportionData:[],
      maxNum:0,
      maxRate:0
    }
  },
  mounted() {
    this.getData()
    this.initChart()

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {

      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        // numData:this.numData,
        // proportionData:this.proportionData,
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['人数', '比例']
        },
        xAxis: [
          {
            type: 'category',
            data: ['90%-100%','80%-90%','70%-80%','60%-70%','50%-60%','40%-50%','30%-40%','20%-30%','10%-20%','0%-10%'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            min: 0,
            max: this.maxNum+2,
            interval: Math.ceil(this.maxNum/5),
            axisLabel: {
              formatter: '{value} 个'
            }
          },
          {
            type: 'value',
            name: '比例',
            min: 0,
            max: this.maxRate,
            interval: this.maxRate/5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 个';
              }
            },
            data: this.numData
          },
          // {
          //   name: '人数',
          //   type: 'bar',
          //   tooltip: {
          //     valueFormatter: function (value) {
          //       return value + ' ml';
          //     }
          //   },
          //   data: [
          //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          //   ]
          // },
          {
            name: '比例',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: this.proportionData
          }
        ]
      })
    },
    getData(){

      this.scoreData.forEach((item)=>{
        if(this.maxNum<item.sCount){
          this.maxNum=item.sCount
        }
        if(this.maxRate<item.proportion*100){
          this.maxRate=item.proportion*100
        }
        this.numData.push(item.sCount)
        this.proportionData.push(item.proportion*100)
        console.log(this.numData)
      })
    }
  }
}
</script>

<style scoped>

</style>
