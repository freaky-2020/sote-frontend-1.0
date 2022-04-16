<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b">{{item.title}}</p>
        <div>
          <dv-digital-flop :config="item.number" style="width:100px;height:50px;" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">试卷提交数</span>
        <dv-scroll-ranking-board :config="ranking" style="height:220px" />
      </div>
      <div class="percent">
        <div class="item  bg-color-black">
          <span>及格率</span>
          <centerChart1 />
        </div>
        <div class="item  bg-color-black">
          <span>优良率</span>
          <centerChart2 />
        </div>
        <div class="water">
          <dv-water-level-pond :config="water" style="height: 120px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import centerChart1 from "./components/echart/center/centerChart1";
import centerChart2 from "./components/echart/center/centerChart2";

export default {
  data() {
    return {
      titleItem: [
        {
          title: "本月累计提交试卷次数",
          number: {
            number: [701],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本日提交试卷次数",
          number: {
            number: [98],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本日自动批阅题数",
          number: {
            number: [1870],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本日手动批阅题数",
          number: {
            number: [21],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本日批阅试卷总数",
          number: {
            number: [35],
            toFixed: 1,
            content: "{nt}"
          }
        },
        // {
        //   title: "今年达标任务个数",
        //   number: {
        //     number: [100],
        //     toFixed: 1,
        //     content: "{nt}"
        //   }
        // }
      ],
      ranking: {
        data: [
          {
            name: "数学与应用数学",
            value: 71
          },
          {
            name: "临床医学",
            value: 36
          },
          {
            name: "智能科学",
            value: 36
          },
          {
            name: "国际经济与贸易",
            value: 25
          },
          {
            name: "新闻学",
            value: 9
          },
          {
            name: "应用物理",
            value: 3
          },
          {
            name: "机械设计及其自动化",
            value: 2
          },
          {
            name: "软件工程",
            value: 2
          }
        ],
        waitTime: 4000,
        carousel: "page",
        unit: "份"
      },
      water: {
        data: [24, 87],
        shape: 'roundRect',
        formatter:'{value}%',
        waveNum:3
      }
    };
  },
  components: {
    centerChart1,
    centerChart2
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 5px;
      padding-top: 1rem;
      margin-top: 0.5rem;
      width: 32%;
      height: 70px;
    }
  }
  .down {
    padding: 4px;
    padding-bottom: 0px;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 7px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
@import "./assets/scss/index.scss";
@import "./assets/scss/style.scss";
</style>
