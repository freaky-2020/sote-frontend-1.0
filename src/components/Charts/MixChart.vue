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
      default: 'mix-chart'
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
      const xData = (function() {
        const data = []
        /////横坐标
        for (let i = 8; i < 20; i++) {
          data.push('4-'+i)
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#ffffff',
        title: {
          text: 'statistics',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '10%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 100,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['参加考试人次', '访问人次']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '100%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '参加考试人次',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#00509d',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            8,4,4,13,10,7,30,22,31,38,12,25
          ]
        },

        //  {
          //   name: 'male',
          //   type: 'bar',
          //   stack: 'total',
          //   itemStyle: {
          //     normal: {
          //       color: 'rgba(0,191,183,1)',
          //       barBorderRadius: 0,
          //       label: {
          //         show: true,
          //         position: 'top',
          //         formatter(p) {
          //           return p.value > 0 ? p.value : ''
          //         }
          //       }
          //     }
          //   },
          //   data: [
          //     327,
          //     1776,
          //     507,
          //     1200,
          //     800,
          //     482,
          //     204,
          //     1390,
          //     1001,
          //     951,
          //     381,
          //     220
          //   ]
          // },
          {
          name: '访问人次',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#efb336',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            40,15,9,7,14,12,12,41,23,45,20,56,30
          ]
        }
        ]
      })
    }
  }
}
</script>
