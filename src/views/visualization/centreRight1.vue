<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">院部完成率排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:270px;height:360px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["部门", "完成率"],
        data: [
          ["数学与统计学院",  "<span  class='colorGrass'>↑99.5%</span>"],
          ["机电学院", "<span  class='colorRed'>↓98.9%</span>"],
          ["文学院", "<span  class='colorGrass'>↑98.4%</span>"],
          ["计算机学院",  "<span  class='colorGrass'>↑98.1%</span>"],
          ["医学院", "<span  class='colorGrass'>↑97.8%</span>"],
          ["国际经管学院", "<span  class='colorGrass'>↑97.7%</span>"],
          ["化学与材料工程",  "<span  class='colorGrass'>↑97.4%</span>"],
          ["国际教育学院",  "<span  class='colorGrass'>↑95.4%</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centreRight1 {
  padding: 1rem;
  height: 410px;
  min-width: 300px;
  border-radius: 5px;
  .bg-color-black {
    height: 385px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
  }

}
@import "./assets/scss/index.scss";
@import "./assets/scss/style.scss";
</style>
