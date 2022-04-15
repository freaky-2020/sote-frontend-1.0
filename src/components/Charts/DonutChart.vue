<template>
  <div :id="id" :class="className" style="height: 100%;width: 100% " />
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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
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
          text: '最近考试',
          x: '20',
          bottom: '20',
          textStyle: {
            color: '#19348a',
            fontSize: '14px'
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
          top: '5%',
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
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 25, name: '90~100' },
              { value: 15, name: '80~89' },
              { value: 17, name: '70~79' },
              { value: 13, name: '60~69' },
              { value: 2, name: '<60' }
            ]
          },
        ]
      })
    }
  }
}
</script>
