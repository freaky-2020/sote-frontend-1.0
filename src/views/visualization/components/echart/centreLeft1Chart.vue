<template>
  <div>
    <div id="centreLeft1Chart" style="width:260px; height: 220px;"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie(sidebar) {
      // 基于准备好的dom，初始化echarts实例
      let myChartPieLeft = echarts.init(
        document.getElementById("centreLeft1Chart")
      );
      //  ----------------------------------------------------------------

      myChartPieLeft.setOption({
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true
        },
        calculable: true,
        legend: {
          orient: "horizontal",
          icon: "circle",
          bottom: 0,
          x: "center",
          data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6"],
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "科目统计",
            type: "pie",
            radius: [10, 60],
            roseType: "area",
            center: ["50%", "40%"],

            data: [
              { value: 12, name: "高等数学" },
              { value: 10, name: "大学物理" },
              { value: 8, name: "数据结构" },
              { value: 7, name: "操作系统" },
              { value: 9, name: "热力学" },
              { value: 2, name: "工程力学" }
            ]
          }
        ]
      });
      // -----------------------------------------------------------------
      // 响应式变化
      window.addEventListener("resize", () => myChartPieLeft.resize(), false);
      //侧边栏变化
      if (sidebar) {
        myChartPieLeft.resize();
      }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";
@import "../../assets/scss/style.scss";
</style>
