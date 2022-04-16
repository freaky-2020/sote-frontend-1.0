<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'donut-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data:{
      type:Array,
      default:[
        { value: 25, name: '90~100' },
        { value: 15, name: '80~89' },
        { value: 17, name: '70~79' },
        { value: 13, name: '60~69' },
        { value: 2, name: '<60' }
      ]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
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
        backgroundColor: '#ffffff',
        title: {
          text: ' 第一次测验-成绩分布',
          x: '20',
          top: '20',
          textStyle: {
            fontWeight:500,
            color: '#19348a',
            fontSize: '13px'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '12px'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        // grid: {
        //   left: '10%',
        //   right: '5%',
        //   borderWidth: 0,
        //   top: 150,
        //   bottom: 100,
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        legend: {
          bottom: '3%',
          left: 'center'
        },
        calculable: true,
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                // fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
          },
        ]
      })
    }
  }
}
</script>
