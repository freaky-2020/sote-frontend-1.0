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
      default: 'more-line'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
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
          text: '各科目成绩趋势',
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
        legend: {
          data: ['高等数学', '大学物理', '大学英语', '计算概论'],
          // bottom: '3%',
          top: '7%',
          left: 'center'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: [1, 2,3,4,5,6]
        },
        yAxis: {
          type: 'value',
          min:60
        },
        calculable: true,
        series: [
          {
            name: '高等数学',
            type: 'line',
            // stack: 'Total',
            data: [77,88,95,94,92,95],
            smooth: true
          },
          {
            name: '大学物理',
            type: 'line',
            // stack: 'Total',
            data: [87,73,80,86,90,92],
            smooth: true
          },
          {
            name: '大学英语',
            type: 'line',
            // stack: 'Total',
            data: [83,86,84,81,87,85],
            smooth: true
          },
          {
            name: '计算概论',
            type: 'line',
            // stack: 'Total',
            data: [90,88,86,94,98,86],
            smooth: true
          },

        ]
      })
    }
  }
}
</script>
